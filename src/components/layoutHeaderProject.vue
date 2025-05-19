<template>
    <div class="stepper-container">
        <div class="stepper">
            <div class="step" v-for="(step, index) in steps" :key="index" :class="{
                'active': index <= viewProgress,
                'completed': index < viewProgress
            }">
                <div class="step-connector" v-if="index > 0"></div>
                <div class="step-content" @click="handleLink(index, step.route)">
                    <div class="step-circle">
                        <span v-if="index < viewProgress" class="check-icon">✓</span>
                        <span v-else>{{ index + 1 }}</span>
                    </div>
                    <div class="step-label">{{ step.label }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "vue-mcdm-header",
    data() {
        return {
            steps: [
                { label: 'INPUTS', route: '/inputs' },
                { label: this.$t("step") + ' ma trận tiêu chí', route: '/segunda' },
                { label: this.$t("step") + ' ma trận phương án', route: '/primeira' },
                { label: this.$t("resultados"), route: '/resultados' }
            ]
        }
    },
    computed: {
        viewProgress() {
            return this.$store.getters.currentViewProgress - 1 // Để index bắt đầu từ 0
        }
    },
    mounted() {
        this.$router.replace({ path: "/inputs" })
    },
    created() {
        this.$store.dispatch("changeViewProgress", 1)
    },
    methods: {
        handleLink(index, route) {
            let crList = [];
            if (route === '/segunda' || route === '/primeira') {
                crList = (this.$store.getters.currentMatrizSegunda || [])
                    .filter(m => Array.isArray(m) && m.length > 0 && m[m.length - 1] && typeof m[m.length - 1] === 'object')
                    .map(m => m[m.length - 1].cr)
                    .filter(cr => cr !== undefined);
            } else if (route === '/resultados') {
                const crListSegunda = (this.$store.getters.currentMatrizSegunda || [])
                    .filter(m => Array.isArray(m) && m.length > 0 && m[m.length - 1] && typeof m[m.length - 1] === 'object')
                    .map(m => m[m.length - 1].cr)
                    .filter(cr => cr !== undefined);
                const crListPrimeira = (this.$store.getters.currentMatrizPrimeira || [])
                    .filter(m => Array.isArray(m) && m.length > 0 && m[m.length - 1] && typeof m[m.length - 1] === 'object')
                    .map(m => m[m.length - 1].cr)
                    .filter(cr => cr !== undefined);
                crList = [...crListSegunda, ...crListPrimeira];
            }
            if (crList.some(cr => cr > 0.1)) {
                alert('Chỉ số nhất quán CR của tất cả các ma trận phải nhỏ hơn hoặc bằng 0.1 để tiếp tục!');
                return;
            }
            if (this.viewProgress >= index) {
                this.$store.dispatch("changeTabViewAtual", route)
                this.$router.replace({ path: route })
            } else if (this.viewProgress + 1 === index) {
                this.$store.dispatch("changeViewProgress", index + 1)
                this.$store.dispatch("changeTabViewAtual", route)
                this.$router.replace({ path: route })
            }
        }
    }
}
</script>

<style scoped>
.stepper-container {
    padding: 2rem;
    background: white;
    border-bottom: 1px solid #eee;
}

.stepper {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    position: relative;
}

.step {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.step-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    position: relative;
    z-index: 2;
}

.step-circle {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: white;
    border: 2px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: #666;
    transition: all 0.3s ease;
}

.step-label {
    font-size: 0.9rem;
    color: #666;
    font-weight: 500;
    transition: all 0.3s ease;
}

.step-connector {
    position: absolute;
    left: calc(-50% + 17.5px);
    right: calc(50% - 17.5px);
    height: 2px;
    background: #ddd;
    z-index: 1;
    transition: all 0.3s ease;
    top: 17.5px;
}

/* Active state */
.step.active .step-circle {
    border-color: #000;
    color: #000;
}

.step.active .step-label {
    color: #000;
}

/* Completed state */
.step.completed .step-circle {
    background: #000;
    border-color: #000;
    color: white;
}

.step.completed .step-connector {
    background: #000;
}

/* Hover effects */
.step:not(.completed):hover .step-circle {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.check-icon {
    font-size: 1rem;
}

/* Disabled state */
.step:not(.active) {
    opacity: 0.6;
    cursor: not-allowed;
}

@media (max-width: 768px) {
    .stepper-container {
        padding: 1rem;
    }

    .step-label {
        font-size: 0.8rem;
    }

    .step-circle {
        width: 30px;
        height: 30px;
    }

    .step-connector {
        left: calc(-50% + 15px);
        right: calc(50% - 15px);
        top: 15px;
    }
}
</style>
