<template>
    <section class="section-inputs">
        <div class="input-container">
            <!-- Phần Tiêu chí -->
            <div class="criteria-section">
                <h2 class="section-title">Tiêu chí đánh giá</h2>
                <div class="header-labels">
                    <label class="label-short">Viết tắt</label>
                    <label class="label-long">Tên tiêu chí</label>
                </div>

                <div class="input-list">
                    <div v-for="(item, index) in criteriosLabelPrimeira" :key="index" class="input-row">
                        <input class="input-short" v-model="criteriosSimboloPrimeira[index]" maxlength="5"
                            @blur="checkBlankText('criteriosSimboloPrimeira', index, 'C')">
                        <input class="input-long" v-model="criteriosLabelPrimeira[index]" maxlength="20"
                            @blur="checkBlankText('criteriosLabelPrimeira', index, 'Criterion-')">
                        <div class="button-group">
                            <button @click="removeCriterio(index)" class="action-button remove-btn" tabindex="-1">
                                <span>-</span>
                            </button>
                            <button v-if="index === criteriosLabelPrimeira.length - 1" @click="addCriterio()"
                                class="action-button add-btn" tabindex="-1">
                                <span>+</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Phần Phương án -->
            <div class="options-section">
                <h2 class="section-title">Phương án lựa chọn</h2>
                <div class="header-labels">
                    <label class="label-short">Viết tắt</label>
                    <label class="label-long">Tên phương án</label>
                </div>

                <div class="input-list">
                    <div v-for="(item, index) in optionsLabelPrimeira" :key="index" class="input-row">
                        <input class="input-short" v-model="optionsSimboloPrimeira[index]" maxlength="5"
                            @blur="checkBlankText('optionsSimboloPrimeira', index, 'O')">
                        <input class="input-long" v-model="optionsLabelPrimeira[index]" maxlength="20"
                            @blur="checkBlankText('optionsLabelPrimeira', index, 'Option-')">
                        <div class="button-group">
                            <button @click="removeOption(index)" class="action-button remove-btn" tabindex="-1">
                                <span>-</span>
                            </button>
                            <button v-if="index === optionsLabelPrimeira.length - 1" @click="addOption()"
                                class="action-button add-btn" tabindex="-1">
                                <span>+</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <vueButtonProjectControl @update-view="importHandler()" />
    </section>
</template>

<script>

import vueButtonProjectControl from "./buttonProjectControl.vue"
import criaSlideresMixin from "@/components/mixins/criaSlideres.vue"
import saveProjectMixin from "./mixins/saveProject.vue"

export default {
    name: "vue-inputs-etapa",
    components: {
        vueButtonProjectControl
    },
    mixins: [
        criaSlideresMixin,
        saveProjectMixin
    ],
    data() {
        return {
            optionsLabelPrimeira: [
                "Phương án 1",
                "Phương án 2",
                "Phương án 3",
                "Phương án 4"
            ],
            optionsSimboloPrimeira: [
                "O1",
                "O2",
                "O3",
                "O4"
            ],
            criteriosLabelPrimeira: [
                "Tiêu chí 1",
                "Tiêu chí 2",
                "Tiêu chí 3",
                "Tiêu chí 4"
            ],
            criteriosSimboloPrimeira: [
                "TC1",
                "TC2",
                "TC3",
                "TC4"
            ]
        }
    },
    computed: {
        currentOptionsLabelPrimeira() {
            return this.$store.getters.currentOptionsLabelPrimeira
        },
        currentOptionsSimboloPrimeira() {
            return this.$store.getters.currentOptionsSimboloPrimeira
        },
        currentCriteriosLabelPrimeira() {
            return this.$store.getters.currentCriteriosLabelPrimeira
        },
        currentCriteriosSimboloPrimeira() {
            return this.$store.getters.currentCriteriosSimboloPrimeira
        }
    },
    updated() {
        this.saveProject()
    },
    mounted() {
        this.updateFromStore()
        this.criaSlideres()
    },
    beforeUnmount() {
        this.updateFromStore()
        this.criaSlideres()
    },
    methods: {
        importHandler() {
            this.$store.dispatch("changeImportFlag", true)
            this.updateFromStore()
        },
        updateFromStore() {
            if (this.currentOptionsLabelPrimeira.length > 0) {
                this.optionsLabelPrimeira = this.currentOptionsLabelPrimeira
            }
            if (this.currentCriteriosLabelPrimeira.length > 0) {
                this.criteriosLabelPrimeira = this.currentCriteriosLabelPrimeira
            }
            if (this.currentOptionsSimboloPrimeira.length > 0) {
                this.optionsSimboloPrimeira = this.currentOptionsSimboloPrimeira
            }
            if (this.currentCriteriosSimboloPrimeira.length > 0) {
                this.criteriosSimboloPrimeira = this.currentCriteriosSimboloPrimeira
            }
            try {
                // Labels
                this.$store.dispatch("changeCriteriosLabelPrimeira", this.criteriosLabelPrimeira)
                this.$store.dispatch("changeCriteriosLabelSegunda", this.criteriosLabelPrimeira)
                this.$store.dispatch("changeOptionsLabelPrimeira", this.optionsLabelPrimeira)
                this.$store.dispatch("changeOptionsLabelSegunda", this.optionsLabelPrimeira)
                // Simbolos
                this.$store.dispatch("changeCriteriosSimboloPrimeira", this.criteriosSimboloPrimeira)
                this.$store.dispatch("changeCriteriosSimboloSegunda", this.criteriosSimboloPrimeira)
                this.$store.dispatch("changeOptionsSimboloPrimeira", this.optionsSimboloPrimeira)
                this.$store.dispatch("changeOptionsSimboloSegunda", this.optionsSimboloPrimeira)
            } catch (error) {
                console.log("falha no armazenamento", error)
            }
        },
        // IMPEDE QUE O TEXTO DO LABEL DAS OPÇÕES OU CRITÉRIOS SEJAM BRANCOS
        checkBlankText(arrayName, index, prefix) {
            if (this[arrayName][index].trim() === "") {
                this[arrayName][index] = prefix + (index + 1)
            }
        },
        addCriterio() {
            if (this.criteriosLabelPrimeira.length < 9) {
                this.criteriosLabelPrimeira.push(`Criterion-${this.criteriosLabelPrimeira.length + 1}`)
                this.criteriosSimboloPrimeira.push(`C${this.criteriosSimboloPrimeira.length + 1}`)
            } else {
                window.alert("Bạn đã đạt đến giới hạn số lượng tiêu chí cho phép!")
            }
        },
        removeCriterio(index) {
            if (this.criteriosLabelPrimeira.length > 3) {
                this.criteriosLabelPrimeira.splice(index, 1)
                this.criteriosSimboloPrimeira.splice(index, 1)
            } else {
                window.alert("Bạn phải có ít nhất 3 tiêu chí để phân tích!")
            }
        },
        addOption() {
            if (this.optionsLabelPrimeira.length < 5) {
                this.optionsLabelPrimeira.push(`Option-${this.optionsLabelPrimeira.length + 1}`)
                this.optionsSimboloPrimeira.push(`O${this.optionsSimboloPrimeira.length + 1}`)
            } else {
                window.alert("Bạn đã đạt đến giới hạn số lượng phương án cho phép!")
            }
        },
        removeOption(index) {
            if (this.optionsLabelPrimeira.length > 3) {
                this.optionsLabelPrimeira.splice(index, 1)
                this.optionsSimboloPrimeira.splice(index, 1)
            } else {
                window.alert("Bạn phải có ít nhất 3 phương án để phân tích!")
            }
        }
    }
}
</script>

<style scoped>
.section-inputs {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    min-height: 600px;
}

.input-container {
    display: grid;
    gap: 2rem;
    margin-bottom: 2rem;
}

.criteria-section,
.options-section {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.section-title {
    font-size: 1.25rem;
    color: #2c3e50;
    margin-bottom: 1.5rem;
    font-weight: 600;
}

.header-labels {
    display: grid;
    grid-template-columns: 150px 1fr 100px;
    gap: 1rem;
    margin-bottom: 1rem;
    padding: 0 0.5rem;
}

.label-short,
.label-long {
    color: #666;
    font-size: 0.9rem;
    font-weight: 500;
}

.input-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.input-row {
    display: grid;
    grid-template-columns: 150px 1fr 100px;
    gap: 1rem;
    align-items: center;
}

.input-short,
.input-long {
    padding: 0.75rem 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 0.95rem;
    transition: all 0.3s ease;
}

.input-short:focus,
.input-long:focus {
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
    outline: none;
}

.input-short {
    text-align: center;
}

.button-group {
    display: flex;
    gap: 0.5rem;
}

.action-button {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
}

.remove-btn {
    background-color: white;
    color: #080808;
    border: 1px solid #000000;
}

.add-btn {
    background-color: #000000;
    color: white;
}

.remove-btn:hover {
    background-color: #fff5f5;
    border-color: #ff6b6b;
}

.add-btn:hover {
    background-color: #333333;
}

.action-button:active {
    transform: translateY(0);
}

@media (max-width: 768px) {
    .section-inputs {
        padding: 1rem;
    }

    .input-row {
        grid-template-columns: 100px 1fr 80px;
    }

    .header-labels {
        grid-template-columns: 100px 1fr 80px;
    }
}
</style>
