<template>
    <div class="export-container">
        <button @click="exportProject" class="export-button">Xuất dự án</button>
        <div v-if="showSuccess" class="success-message">
            Dự án đã được xuất thành công!
        </div>
        <div v-if="showError" class="error-message">
            {{ errorMessage }}
        </div>
    </div>
</template>

<script>
export default {
    name: "ExportProject",
    data() {
        return {
            showSuccess: false,
            showError: false,
            errorMessage: ""
        }
    },
    methods: {
        async exportProject() {
            try {
                // Lấy dữ liệu từ store
                const projectData = {
                    id: Date.now().toString(),
                    criteriosLabelPrimeira: this.$store.getters.currentCriteriosLabelPrimeira,
                    criteriosLabelSegunda: this.$store.getters.currentCriteriosLabelSegunda,
                    optionsLabelPrimeira: this.$store.getters.currentOptionsLabelPrimeira,
                    optionsLabelSegunda: this.$store.getters.currentOptionsLabelSegunda,
                    matrizPrimeira: this.$store.getters.currentMatrizPrimeira,
                    matrizSegunda: this.$store.getters.currentMatrizSegunda,
                    valueVetor: this.$store.getters.currentValueVetor,
                    timestamp: new Date().toISOString()
                }

                // Tạo file JSON
                const dataStr = JSON.stringify(projectData, null, 2)
                const dataBlob = new Blob([dataStr], { type: 'application/json' })
                const url = window.URL.createObjectURL(dataBlob)
                
                // Tạo link tải xuống
                const link = document.createElement('a')
                link.href = url
                link.download = `project_${projectData.id}.json`
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                window.URL.revokeObjectURL(url)

                // Gửi dữ liệu lên API
                const response = await fetch('https://api-ahp.onrender.com/api/projects', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: dataStr
                })

                if (!response.ok) {
                    throw new Error('Không thể lưu dự án lên server')
                }

                this.showSuccess = true
                setTimeout(() => {
                    this.showSuccess = false
                }, 3000)

            } catch (error) {
                this.showError = true
                this.errorMessage = error.message
                setTimeout(() => {
                    this.showError = false
                }, 3000)
            }
        }
    }
}
</script>

<style scoped>
.export-container {
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.export-button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.export-button:hover {
    background-color: #45a049;
}

.success-message {
    margin-top: 10px;
    color: #4CAF50;
    font-weight: bold;
}

.error-message {
    margin-top: 10px;
    color: #f44336;
    font-weight: bold;
}
</style> 