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
import * as XLSX from 'xlsx'

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
                        description: "Arquivos JSON",
                        accept: { "application/json": [".json"] }
                    }],
                    multiple: false,
                    excludeAcceptAllOption: true // Força seleção apenas de JSON
                })

                const file = await fileHandle.getFile()

                // Verificação básica de tamanho (exemplo: 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    throw new Error("Arquivo muito grande (máximo 5MB)")
                }

                const fileContent = await file.text()

                // Validação da estrutura básica
                const parsed = JSON.parse(fileContent)
                if (!parsed || typeof parsed !== "object") {
                    throw new Error("Formato JSON inválido")
                }

                // Verificação de propriedades essenciais (personalize conforme seu projeto)
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

                // Map field names to Vietnamese
                const fieldMap = {
                    slideresPrimeira: "Thanh trượt lần 1",
                    slideresSegunda: "Thanh trượt lần 2",
                    criteriosLabelPrimeira: "Tiêu chí lần 1",
                    criteriosLabelSegunda: "Tiêu chí lần 2",
                    optionsLabelPrimeira: "Tùy chọn lần 1",
                    optionsLabelSegunda: "Tùy chọn lần 2",
                    criteriosSimboloPrimeira: "Ký hiệu tiêu chí lần 1",
                    criteriosSimboloSegunda: "Ký hiệu tiêu chí lần 2",
                    optionsSimboloPrimeira: "Ký hiệu tùy chọn lần 1",
                    optionsSimboloSegunda: "Ký hiệu tùy chọn lần 2"
                }

                // Chuyển đổi dữ liệu sang key tiếng Việt
                let row = {}
                if (projectData && typeof projectData === 'object') {
                    Object.keys(fieldMap).forEach(key => {
                        row[fieldMap[key]] = projectData[key] !== undefined ? projectData[key] : ''
                    })
                } else {
                    // Nếu không có dữ liệu, tạo dòng mẫu rỗng
                    Object.values(fieldMap).forEach(vnKey => {
                        row[vnKey] = ''
                    })
                }

                const worksheet = XLSX.utils.json_to_sheet([row])
                const workbook = XLSX.utils.book_new()
                XLSX.utils.book_append_sheet(workbook, worksheet, "Dữ liệu dự án")

                const fileName = `du-an-${Date.now()}.xlsx`
                const fileHandle = await window.showSaveFilePicker({
                    suggestedName: fileName,
                    types: [{
                        description: "Tệp Excel",
                        accept: { "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"] }
                    }]
                })
                const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
                const writable = await fileHandle.createWritable()
                await writable.write(new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }))
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
                console.log("Xuất file Excel thành công:", fileName)
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
