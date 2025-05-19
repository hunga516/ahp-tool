<template>

    <div class="buttons-container">
        <button class="project-button" v-if="!continueFlag && !importFlag && tabView == '/inputs'"
            @click="importProject('local')">
            {{ $t("continueProject") }}
        </button>
        <button v-if="tabView == '/inputs'" class="project-button" @click="importProject('json')">
            {{ $t("importProject") }}
        </button>
        <button v-if="tabView == '/inputs'" class="project-button" @click="resetProject()">
            {{ $t("resetProject") }}
        </button>
        <button v-if="tabView == '/resultados'" @click="exportObjectAsJSON()" class="project-button">
            {{ $t("exportProject") }}
        </button>
    </div>


</template>

<script>
import { verificarLocal } from "../assets/javascript/globalFunctions"
import saveProjectMixin from "./mixins/saveProject.vue"

export default {
    name: "vue-project-buttons",
    mixins: [
        saveProjectMixin
    ],
    emits: ["update-view"],
    data() {
        return {
            project: {}
        }
    },
    computed: {
        importFlag() {
            return this.$store.getters.currentImportFlag
        },
        continueFlag() {
            return this.$store.getters.currentContinueFlag
        },
        tabView() {
            return this.$store.getters.currentTabViewAtual
        }
    },
    methods: {
        async importJSONAsObject() {
            try {
                const [fileHandle] = await window.showOpenFilePicker({
                    types: [{
                        description: "Arquivos JSON/CSV",
                        accept: { "application/json": [".json"], "text/csv": [".csv"] }
                    }],
                    multiple: false,
                    excludeAcceptAllOption: true
                })

                const file = await fileHandle.getFile()
                if (file.size > 5 * 1024 * 1024) {
                    throw new Error("Arquivo muito grande (máximo 5MB)")
                }
                const fileContent = await file.text()
                let parsed

                if (file.name.endsWith('.csv')) {
                    // Parse multi-table CSV
                    const lines = fileContent.split(/\r?\n/)
                    let result = {}
                    let currentKey = null
                    let headers = []
                    let rows = []
                    for (let i = 0; i < lines.length; i++) {
                        const line = lines[i].trim()
                        if (line.startsWith('# ')) {
                            // Save previous table
                            if (currentKey && headers.length > 0) {
                                // Xác định là mảng object hay mảng giá trị đơn
                                if (headers.length === 1 && headers[0] === 'value') {
                                    result[currentKey] = rows.map(r => r[0])
                                } else {
                                    result[currentKey] = rows.map(r => {
                                        let obj = {}
                                        headers.forEach((h, idx) => {
                                            // Loại bỏ dấu nháy kép nếu có
                                            let val = r[idx]
                                            if (val && val.startsWith('"') && val.endsWith('"')) {
                                                val = val.slice(1, -1).replace(/""/g, '"')
                                            }
                                            // Nếu là số, convert sang số
                                            if (!isNaN(val) && val !== '') val = Number(val)
                                            obj[h] = val
                                        })
                                        return obj
                                    })
                                }
                            }
                            // Bắt đầu bảng mới
                            currentKey = line.slice(2).trim()
                            headers = []
                            rows = []
                        } else if (line && !headers.length) {
                            // Header
                            headers = line.split(',')
                        } else if (line && headers.length) {
                            // Data row
                            // Tách theo dấu phẩy, xử lý giá trị có nháy kép
                            let row = []
                            let inQuotes = false
                            let cell = ''
                            for (let c = 0; c < line.length; c++) {
                                const char = line[c]
                                if (char === '"') {
                                    inQuotes = !inQuotes
                                    cell += char
                                } else if (char === ',' && !inQuotes) {
                                    row.push(cell)
                                    cell = ''
                                } else {
                                    cell += char
                                }
                            }
                            row.push(cell)
                            rows.push(row)
                        }
                    }
                    // Save last table
                    if (currentKey && headers.length > 0) {
                        if (headers.length === 1 && headers[0] === 'value') {
                            result[currentKey] = rows.map(r => r[0].replace(/^"|"$/g, '').replace(/""/g, '"'))
                        } else {
                            result[currentKey] = rows.map(r => {
                                let obj = {}
                                headers.forEach((h, idx) => {
                                    let val = r[idx]
                                    if (val && val.startsWith('"') && val.endsWith('"')) {
                                        val = val.slice(1, -1).replace(/""/g, '"')
                                    }
                                    if (!isNaN(val) && val !== '') val = Number(val)
                                    obj[h] = val
                                })
                                return obj
                            })
                        }
                    }
                    parsed = result
                } else {
                    // Xử lý file JSON
                    parsed = JSON.parse(fileContent)
                }

                if (!parsed || typeof parsed !== "object") {
                    throw new Error("Formato inválido")
                }

                // Verificação de propriedades essenciais
                const requiredProps = ["slideresPrimeira", "criteriosLabelPrimeira"]
                requiredProps.forEach(prop => {
                    if (!(prop in parsed)) {
                        throw new Error(`Propriedade obrigatória ausente: ${prop}`)
                    }
                })

                console.log("Importação bem-sucedida:", parsed)
                return parsed

            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Importação cancelada pelo usuário")
                } else {
                    console.error("Falha na importação:", error)
                    alert(`Erro: ${error.message}`)
                }
                return null
            }
        },
        async exportObjectAsJSON() {
            try {
                await this.saveProject()
                const projectData = JSON.parse(verificarLocal("last_project"))
                if (!projectData) throw new Error("Không có dữ liệu để xuất")

                let csvSections = []
                for (const [key, value] of Object.entries(projectData)) {
                    if (Array.isArray(value)) {
                        // Thêm tiêu đề bảng
                        csvSections.push(`# ${key}`)
                        if (value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
                            // Mảng object hoặc mảng mảng object
                            let rows = []
                            // Nếu là mảng 2 chiều (ví dụ slideresPrimeira)
                            if (Array.isArray(value[0])) {
                                // Tìm tất cả các key có thể có
                                let allKeys = new Set()
                                value.forEach(arr => arr.forEach(obj => Object.keys(obj).forEach(k => allKeys.add(k))))
                                allKeys = Array.from(allKeys)
                                // Header
                                rows.push(allKeys.join(','))
                                // Dữ liệu
                                value.forEach(arr => {
                                    arr.forEach(obj => {
                                        rows.push(allKeys.map(k => obj[k] !== undefined ? `"${String(obj[k]).replace(/"/g, '""')}"` : '').join(','))
                                    })
                                })
                            } else {
                                // Mảng object 1 chiều
                                const allKeys = Object.keys(value[0])
                                rows.push(allKeys.join(','))
                                value.forEach(obj => {
                                    rows.push(allKeys.map(k => obj[k] !== undefined ? `"${String(obj[k]).replace(/"/g, '""')}"` : '').join(','))
                                })
                            }
                            csvSections.push(rows.join('\n'))
                        } else {
                            // Mảng giá trị đơn giản
                            csvSections.push('value')
                            value.forEach(v => {
                                csvSections.push(`"${String(v).replace(/"/g, '""')}"`)
                            })
                        }
                        // Thêm dòng trống sau mỗi bảng
                        csvSections.push('')
                    }
                }
                const csvContent = csvSections.join('\n')
                const fileName = `du-an-${Date.now()}.csv`
                const fileHandle = await window.showSaveFilePicker({
                    suggestedName: fileName,
                    types: [{
                        description: "Tệp CSV",
                        accept: { "text/csv": [".csv"] }
                    }]
                })
                const writable = await fileHandle.createWritable()
                await writable.write(new Blob([csvContent], { type: 'text/csv' }))
                await writable.close()
                // Lưu lên API như cũ
                try {
                    const response = await fetch('https://api-ahp.onrender.com/api/projects', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            ...projectData,
                            id: Date.now().toString(),
                            timestamp: new Date().toISOString()
                        })
                    })
                    if (!response.ok) {
                        throw new Error('Không thể lưu dự án lên server')
                    }
                    console.log("Dự án đã được lưu lên server thành công")
                } catch (apiError) {
                    console.error("Lỗi khi lưu lên server:", apiError)
                }
                console.log("Xuất file CSV thành công:", fileName)
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Erro na exportação:", error)
                    alert(`Erro ao exportar projeto: ${error.message}`)
                }
            }
        },
        async importProject(store) {

            if (store == "json") {
                console.log("Importing from json file...")
                this.project = await this.importJSONAsObject()
            }

            if (store == "local") {
                console.log("Importing from local store")
                this.project = JSON.parse(verificarLocal("last_project"))
            }

            try {
                this.$store.dispatch("changeImportFlag", true)
                Object.keys(this.project).forEach(key => {
                    this.$store.dispatch(`change${key.charAt(0).toUpperCase() + key.slice(1)}`, this.project[key])

                })
                this.$emit("update-view")
            } catch {
                console.log("Projeto importado está vazio ou contém erros")
            }

        },
        resetProject() {
            try {
                Object.keys(this.project).forEach(key => {
                    this.$store.dispatch(`change${key.charAt(0).toUpperCase() + key.slice(1)}`, [])

                })
                window.location.reload()
            } catch {
                console.log("O projeto já foi resetado")
            }
        }
    }

}
</script>
<style>
.buttons-container {
    position: absolute;
    top: 2rem;
    left: 2rem;
    display: flex;
    gap: 1rem;
    z-index: 10;
}

.project-button {
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    border: 1px solid #000;
    background: white;
    color: #000;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

/* Style cho nút Continue Project */
.project-button:nth-child(1) {
    background: #000;
    color: white;
}

.project-button:nth-child(1):hover {
    background: #333;
    transform: translateY(-1px);
}

/* Style cho nút Import Project */
.project-button:nth-child(2) {
    background: white;
}

.project-button:nth-child(2):hover {
    background: #f8f8f8;
    transform: translateY(-1px);
}

/* Style cho nút Reset Project */
.project-button:nth-child(3) {
    border-color: #ff4757;
    color: #ff4757;
    background: white;
}

.project-button:nth-child(3):hover {
    background: #fff5f5;
    transform: translateY(-1px);
}

/* Style cho nút Export Project */
.project-button:nth-child(4) {
    background: white;
    border-color: #000;
}

.project-button:nth-child(4):hover {
    background: #f8f8f8;
    transform: translateY(-1px);
}

/* Active state cho tất cả các nút */
.project-button:active {
    transform: translateY(0);
}

/* Responsive */
@media (max-width: 768px) {
    .buttons-container {
        position: static;
        padding: 1rem;
        flex-wrap: wrap;
        justify-content: center;
    }

    .project-button {
        padding: 0.6rem 1rem;
        font-size: 0.85rem;
    }
}
</style>