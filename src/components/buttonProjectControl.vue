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
        <button v-if="tabView == '/resultados'" @click="$emit('export-pdf')" class="project-button">
            Xuất PDF
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
    emits: ["update-view", "export-pdf"],
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
                    throw new Error("Tệp quá lớn (tối đa 5MB)")
                }
                const fileContent = await file.text()
                let parsed

                if (file.name.endsWith('.csv')) {
                    const lines = fileContent.split(/\r?\n/)
                    let result = {}
                    let currentKey = null
                    let headers = []
                    let rows = []
                    let isJsonField = false
                    for (let i = 0; i < lines.length; i++) {
                        const line = lines[i].trim()
                        if (line.startsWith('# ')) {
                            if (currentKey && headers.length > 0 && !isJsonField) {
                                if (headers.length === 1 && headers[0] === 'value') {
                                    result[currentKey] = rows.map(r => r[0])
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
                            currentKey = line.slice(2).trim()
                            headers = []
                            rows = []
                            isJsonField = false
                            // Nếu dòng tiếp theo là 'json', đánh dấu trường này là json
                            if (lines[i+1] && lines[i+1].trim() === 'json') {
                                isJsonField = true
                                // Lấy dòng sau 'json' làm dữ liệu
                                const jsonLine = lines[i+2] ? lines[i+2].trim() : ''
                                try {
                                    result[currentKey] = JSON.parse(jsonLine)
                                } catch (e) {
                                    result[currentKey] = []
                                }
                                i += 2 // Bỏ qua dòng 'json' và dòng dữ liệu
                            }
                        } else if (!isJsonField && line && !headers.length) {
                            headers = line.split(',')
                        } else if (!isJsonField && line && headers.length) {
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
                    if (currentKey && headers.length > 0 && !isJsonField) {
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
                    parsed = JSON.parse(fileContent)
                }

                const requiredProps = [
                    "slideresPrimeira", "slideresSegunda",
                    "criteriosLabelPrimeira", "criteriosLabelSegunda",
                    "optionsLabelPrimeira", "optionsLabelSegunda",
                    "criteriosSimboloPrimeira", "criteriosSimboloSegunda",
                    "optionsSimboloPrimeira", "optionsSimboloSegunda",
                    "matrizPrimeira", "matrizSegunda"
                ]
                for (const prop of requiredProps) {
                    if (!(prop in parsed)) {
                        alert(`Thiếu trường dữ liệu bắt buộc: ${prop}`)
                        throw new Error(`Thiếu trường dữ liệu bắt buộc: ${prop}`)
                    }
                }

                const numCriterios = Array.isArray(parsed.criteriosLabelPrimeira) ? parsed.criteriosLabelPrimeira.length : 0;
                const numOptions = Array.isArray(parsed.optionsLabelPrimeira) ? parsed.optionsLabelPrimeira.length : 0;
                if (numCriterios < 4 || numCriterios > 9) {
                    alert('Số lượng tiêu chí phải từ 4 đến 9!');
                    throw new Error('Số lượng tiêu chí phải từ 4 đến 9!');
                }
                if (numOptions < 4 || numOptions > 5) {
                    alert('Số lượng phương án phải từ 4 đến 5!');
                    throw new Error('Số lượng phương án phải từ 4 đến 5!');
                }

                console.log("Importação bem-sucedida:", parsed)
                // Parse lại các trường nếu là JSON string, hoặc nếu là mảng string thì map về số
                const jsonFields = [
                    'slideresPrimeira', 'slideresSegunda',
                    'matrizPrimeira', 'matrizSegunda'
                ]
                for (const field of jsonFields) {
                    if (typeof parsed[field] === 'string' && (parsed[field].startsWith('[') || parsed[field].startsWith('{'))) {
                        try {
                            parsed[field] = JSON.parse(parsed[field])
                        } catch (e) {}
                    }
                    // Nếu là mảng string, map về số
                    if (Array.isArray(parsed[field]) && parsed[field].every(x => typeof x === 'string' && !isNaN(x))) {
                        parsed[field] = parsed[field].map(Number)
                    }
                }
                // Làm sạch dấu ngoặc kép cho các trường text
                const cleanTextFields = [
                    'criteriosLabelPrimeira', 'criteriosLabelSegunda',
                    'optionsLabelPrimeira', 'optionsLabelSegunda',
                    'criteriosSimboloPrimeira', 'criteriosSimboloSegunda',
                    'optionsSimboloPrimeira', 'optionsSimboloSegunda'
                ]
                for (const field of cleanTextFields) {
                    if (Array.isArray(parsed[field])) {
                        parsed[field] = parsed[field].map(x =>
                            typeof x === 'string'
                                ? x.replace(/^"+|"+$/g, '').replace(/""/g, '"')
                                : x
                        )
                    }
                }
                // Đồng bộ Simbolo nếu rỗng hoặc thiếu
                const labelSimboloPairs = [
                  ['criteriosLabelPrimeira', 'criteriosSimboloPrimeira'],
                  ['criteriosLabelSegunda', 'criteriosSimboloSegunda'],
                  ['optionsLabelPrimeira', 'optionsSimboloPrimeira'],
                  ['optionsLabelSegunda', 'optionsSimboloSegunda']
                ];
                for (const [labelField, simboloField] of labelSimboloPairs) {
                  if (!Array.isArray(parsed[simboloField]) || parsed[simboloField].length === 0) {
                    parsed[simboloField] = [...parsed[labelField]];
                  }
                }
                return parsed

            } catch (error) {
                this.resetProject()
                if (error.name === "AbortError") {
                    console.log("Import bị hủy bởi người dùng")
                } else {
                    alert(`Lỗi khi nhập dự án: ${error.message}`)
                }
                return null
            }
        },
        async exportObjectAsJSON() {
            try {
                const projectData = {
                    slideresPrimeira: this.$store.getters.currentSlideresPrimeira,
                    slideresSegunda: this.$store.getters.currentSlideresSegunda,
                    criteriosLabelPrimeira: this.$store.getters.currentCriteriosLabelPrimeira,
                    criteriosLabelSegunda: this.$store.getters.currentCriteriosLabelSegunda,
                    optionsLabelPrimeira: this.$store.getters.currentOptionsLabelPrimeira,
                    optionsLabelSegunda: this.$store.getters.currentOptionsLabelSegunda,
                    criteriosSimboloPrimeira: this.$store.getters.currentCriteriosSimboloPrimeira,
                    criteriosSimboloSegunda: this.$store.getters.currentCriteriosSimboloSegunda,
                    optionsSimboloPrimeira: this.$store.getters.currentOptionsSimboloPrimeira,
                    optionsSimboloSegunda: this.$store.getters.currentOptionsSimboloSegunda,
                    matrizPrimeira: this.$store.getters.currentMatrizPrimeira,
                    matrizSegunda: this.$store.getters.currentMatrizSegunda
                }

                for (const [key, value] of Object.entries(projectData)) {
                    if (!value) {
                        alert(`Thiếu dữ liệu: ${key}`)
                        throw new Error(`Thiếu dữ liệu: ${key}`)
                    }
                }

                await this.saveProject()
                let csvSections = []
                for (const [key, value] of Object.entries(projectData)) {
                    // Nếu là trường phức tạp (matrizPrimeira, matrizSegunda, slideresPrimeira, slideresSegunda), stringify
                    if (key === 'matrizPrimeira' || key === 'matrizSegunda' || key === 'slideresPrimeira' || key === 'slideresSegunda') {
                        csvSections.push(`# ${key}`)
                        csvSections.push('json')
                        csvSections.push(JSON.stringify(value))
                        csvSections.push('')
                        continue
                    }
                    if (Array.isArray(value)) {
                        csvSections.push(`# ${key}`)
                        if (value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
                            let rows = []
                            if (Array.isArray(value[0])) {
                                let allKeys = new Set()
                                value.forEach(arr => arr.forEach(obj => Object.keys(obj).forEach(k => allKeys.add(k))))
                                allKeys = Array.from(allKeys)
                                rows.push(allKeys.join(','))
                                value.forEach(arr => {
                                    arr.forEach(obj => {
                                        rows.push(allKeys.map(k => obj[k] !== undefined ? `"${String(obj[k]).replace(/"/g, '""')}"` : '').join(','))
                                    })
                                })
                            } else {
                                const allKeys = Object.keys(value[0])
                                rows.push(allKeys.join(','))
                                value.forEach(obj => {
                                    rows.push(allKeys.map(k => obj[k] !== undefined ? `"${String(obj[k]).replace(/"/g, '""')}"` : '').join(','))
                                })
                            }
                            csvSections.push(rows.join('\n'))
                        } else {
                            csvSections.push('value')
                            value.forEach(v => {
                                csvSections.push(`"${String(v).replace(/"/g, '""')}"`)
                            })
                        }
                        csvSections.push('')
                    }
                }
                const criterios = this.$store.getters.currentCriteriosLabelSegunda || [];
                const pesosCriterios = (this.$store.getters.currentMatrizSegunda?.length > 0)
                  ? this.$store.getters.currentMatrizSegunda[this.$store.getters.currentMatrizSegunda.length-1].pesos
                  : [];
                if (criterios.length && pesosCriterios.length) {
                  csvSections.push('# KET QUA MA TRAN TIEU CHI (THONG KE)');
                  csvSections.push(criterios.join(','));
                  csvSections.push(pesosCriterios.map(x => x.toFixed(6)).join(','));
                  csvSections.push('');
                }
                const options = this.$store.getters.currentOptionsLabelSegunda || [];
                let tongDiem = [];
                try {
                  const matrizPrimeira = this.$store.getters.currentMatrizPrimeira;
                  const matrizSegunda = this.$store.getters.currentMatrizSegunda;
                  if (matrizPrimeira && matrizSegunda && matrizPrimeira.length && matrizSegunda.length) {
                    const multiplicaPeso = (index) => {
                      const vetor = [];
                      for (let j = 0; j < matrizSegunda[index].length; j++) {
                        vetor.push(
                          matrizSegunda[matrizSegunda.length - 1]["pesos"][index] * matrizPrimeira[index][matrizPrimeira[index].length - 1]["pesos"][j]
                        );
                      }
                      return vetor;
                    };
                    const pesos = [];
                    for (let i = 0; i < matrizPrimeira.length; i++) {
                      pesos.push(multiplicaPeso(i));
                    }
                    const somaColuna = (index) => {
                      let soma = 0;
                      for (let lin = 0; lin < pesos.length; lin++) {
                        soma += pesos[lin][index];
                      }
                      return soma;
                    };
                    for (let index = 0; index < pesos[0].length; index++) {
                      tongDiem.push(somaColuna(index));
                    }
                    tongDiem = tongDiem.slice(0, options.length);
                  }
                } catch (e) {}
                if (options.length && tongDiem.length) {
                  csvSections.push('# KET QUA PHUONG AN (THONG KE)');
                  csvSections.push(options.join(','));
                  csvSections.push(tongDiem.map(x => x.toFixed(6)).join(','));
                  csvSections.push('');
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
                    alert(`Lỗi khi xuất dự án: ${error.message}`)
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