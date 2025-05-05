<template>
    <div class="project-list-container">
        <h2>Danh sách dự án</h2>
        <div v-if="loading" class="loading">Đang tải...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else class="projects">
            <div v-for="project in projects" :key="project.id" class="project-card">
                <div class="project-info">
                    <h3>Dự án #{{ project.id }}</h3>
                    <p>Thời gian: {{ new Date(project.timestamp).toLocaleString() }}</p>
                </div>
                <button @click="loadProject(project)" class="load-button">Nhập dữ liệu</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProjectList",
    data() {
        return {
            projects: [],
            loading: false,
            error: null
        }
    },
    methods: {
        async fetchProjects() {
            this.loading = true
            this.error = null
            try {
                const response = await fetch('http://localhost:5000/api/projects')
                if (!response.ok) {
                    throw new Error('Không thể tải danh sách dự án')
                }
                const data = await response.json()
                this.projects = data.projects
            } catch (error) {
                this.error = error.message
            } finally {
                this.loading = false
            }
        },
        async loadProject(project) {
            try {
                // Cập nhật store với dữ liệu của dự án
                this.$store.dispatch('changeCriteriosLabelPrimeira', project.criteriosLabelPrimeira)
                this.$store.dispatch('changeCriteriosLabelSegunda', project.criteriosLabelSegunda)
                this.$store.dispatch('changeOptionsLabelPrimeira', project.optionsLabelPrimeira)
                this.$store.dispatch('changeOptionsLabelSegunda', project.optionsLabelSegunda)
                this.$store.dispatch('changeMatrizPrimeira', project.matrizPrimeira)
                this.$store.dispatch('changeMatrizSegunda', project.matrizSegunda)
                this.$store.dispatch('changeValueVetor', project.valueVetor)

                // Hiển thị thông báo thành công
                alert('Dữ liệu đã được nhập thành công!')
            } catch (error) {
                alert('Có lỗi xảy ra khi nhập dữ liệu: ' + error.message)
            }
        }
    },
    mounted() {
        this.fetchProjects()
    }
}
</script>

<style scoped>
.project-list-container {
    padding: 20px;
}

.projects {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.project-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.project-info h3 {
    margin: 0;
    color: #333;
}

.project-info p {
    margin: 5px 0 0 0;
    color: #666;
    font-size: 0.9em;
}

.load-button {
    padding: 8px 16px;
    background-color: #2196F3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.load-button:hover {
    background-color: #1976D2;
}

.loading {
    text-align: center;
    padding: 20px;
    color: #666;
}

.error {
    text-align: center;
    padding: 20px;
    color: #f44336;
}
</style> 