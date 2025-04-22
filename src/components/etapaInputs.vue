<template>
    <section class="section-inputs">
        <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="grid grid-rows-2 gap-4">
                <div class="p-4 border-solid border-gray-300 border-[0.5px] rounded-lg ">
                    <p class="font-semibold">
                        Bộ lọc
                    </p>
                    <p class="text-muted-foreground text-xs">
                        Lọc theo các nhu cầu chọn quá của bạn
                    </p>
                    <div class="mt-4 flex flex-col gap-2">
                       <div class="flex items-center justify-between gap-8">
                            <p class="font-semibold text-sm w-24">
                                Giá thuê
                            </p>
                            <input 
                                name="price"
                                class="px-2 py-1 w-full placeholder:text-sm border-[0.5px] rounded-lg"
                                placeholder="Nhập giá thuê"
                                v-model="filterParams.price"
                            />
                       </div>
                       <div class="flex items-center justify-between gap-8">
                            <p class="font-semibold text-sm w-24">
                                Diện tích
                            </p>
                            <input 
                                name="area"
                                class="px-2 py-1 w-full placeholder:text-sm border-[0.5px] rounded-lg"
                                placeholder="Nhập diện tích"
                                v-model="filterParams.area"
                            />
                       </div>
                       <div class="flex items-center justify-between gap-8">
                            <p class="font-semibold text-sm w-24">
                                Mức thu nhập trung bình
                            </p>
                            <input 
                                name="income"
                                class="px-2 py-1 w-full placeholder:text-sm border-[0.5px] rounded-lg"
                                placeholder="Nhập mức thu nhập trung bình"
                                v-model="filterParams.income"
                            />
                       </div>
                       <button
                            class="px-2 py-1 mt-4 bg-black text-white font-semibold rounded-lg"
                            @click="handleFilter"
                       >
                          Lọc khu vực
                       </button>
                    </div>
              </div>
              <div class="p-4 border-solid border-gray-300 border-[0.5px] rounded-lg">
                    <div class="flex items-center justify-between mb-4">
                        <p class="font-semibold">
                            Biểu đồ khu vực
                        </p>
                        <select 
                            v-model="selectedChartType"
                            class="px-2 py-1 border-[0.5px] rounded-lg"
                        >
                            <option value="price">Giá thuê</option>
                            <option value="area">Diện tích</option>
                            <option value="income">Thu nhập</option>
                            <option value="density">Mật độ dân cư</option>
                            <option value="customers">Lượng khách/ngày</option>
                            <option value="cafes">Số lượng quán cafe</option>
                        </select>
                    </div>
                    <div v-if="loading" class="flex items-center justify-center h-[300px]">
                        <p>Đang tải dữ liệu...</p>
                    </div>
                    <div v-else-if="error" class="flex items-center justify-center h-[300px]">
                        <p class="text-red-500">{{ error }}</p>
                    </div>
                    <div v-else class="chart-container" style="height: 300px;">
                        <BarChart 
                            :labels="chartData.labels"
                            :values="chartData.values"
                            :title="chartData.title"
                            :yAxisLabel="chartData.yAxisLabel"
                        />
                    </div>
              </div>
              </div>
              <div class="flex flex-col gap-4">
                    <div class="relative p-4 grid grid-cols-5 border-[0.5px] border-solid border-gray-300 rounded-lg">
                        <div class="absolute -top-2 -right-2 px-3 py-1 bg-black text-white font-bold rounded-md flex items-center justify-center">
                            +
                        </div>
                        <img
                            class="col-span-1 rounded-full w-16 h-16"
                            src="https://cdn.thuvienphapluat.vn/uploads/tintuc/2025/04/16/tphcm.jpg"
                         />
                         <div class="col-span-4 flex flex-col gap-2 font-medium">
                            <p>
                                Khu vực TPHCM
                            </p>
                            <p class="text-sm">
                                Đường Nguyễn Trãi - Quận 5
                            </p>
                            <p class="justify-self-end text-xs text-muted-foreground">
                                100m2 12tr/th 50tr/m2
                            </p>
                         </div>
                    </div>
                    <div class="relative p-4 grid grid-cols-5 border-[0.5px] border-solid border-gray-300 rounded-lg">
                        <div class="absolute -top-2 -right-2 px-3 py-1 bg-black text-white font-bold rounded-md flex items-center justify-center">
                            +
                        </div>
                        <img
                            class="col-span-1 rounded-full w-16 h-16"
                            src="https://cdn.thuvienphapluat.vn/uploads/tintuc/2025/04/16/tphcm.jpg"
                         />
                         <div class="col-span-4 flex flex-col gap-2 font-medium">
                            <p>
                                Khu vực TPHCM
                            </p>
                            <p class="text-sm">
                                Đường Nguyễn Trãi - Quận 5
                            </p>
                            <p class="justify-self-end text-xs text-muted-foreground">
                                100m2 12tr/th 50tr/m2
                            </p>
                         </div>
                    </div>
                    <div class="relative p-4 grid grid-cols-5 border-[0.5px] border-solid border-gray-300 rounded-lg">
                        <div class="absolute -top-2 -right-2 px-3 py-1 bg-black text-white font-bold rounded-md flex items-center justify-center">
                            +
                        </div>
                        <img
                            class="col-span-1 rounded-full w-16 h-16"
                            src="https://cdn.thuvienphapluat.vn/uploads/tintuc/2025/04/16/tphcm.jpg"
                         />
                         <div class="col-span-4 flex flex-col gap-2 font-medium">
                            <p>
                                Khu vực TPHCM
                            </p>
                            <p class="text-sm">
                                Đường Nguyễn Trãi - Quận 5
                            </p>
                            <p class="justify-self-end text-xs text-muted-foreground">
                                100m2 12tr/th 50tr/m2
                            </p>
                         </div>
                    </div>
                    <div class="relative p-4 grid grid-cols-5 border-[0.5px] border-solid border-gray-300 rounded-lg">
                        <div class="absolute -top-2 -right-2 px-3 py-1 bg-black text-white font-bold rounded-md flex items-center justify-center">
                            +
                        </div>
                        <img
                            class="col-span-1 rounded-full w-16 h-16"
                            src="https://cdn.thuvienphapluat.vn/uploads/tintuc/2025/04/16/tphcm.jpg"
                         />
                         <div class="col-span-4 flex flex-col gap-2 font-medium">
                            <p>
                                Khu vực TPHCM
                            </p>
                            <p class="text-sm">
                                Đường Nguyễn Trãi - Quận 5
                            </p>
                            <p class="justify-self-end text-xs text-muted-foreground">
                                100m2 12tr/th 50tr/m2
                            </p>
                         </div>
                    </div>
              </div>
        </div>
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
import { PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from "radix-vue"
import BarChart from "./chart/BarChart.vue"
import { fetchLocationData, processChartData, fetchFilteredChartData } from '../services/ChartService.vue'

export default {
    name: "vue-inputs-etapa",
    components: {
        vueButtonProjectControl,
        BarChart
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
            ],
            locationData: [],
            chartData: {
                labels: [],
                values: [],
                title: '',
                yAxisLabel: ''
            },
            selectedChartType: 'price',
            loading: true,
            error: null,
            filterParams: {
                price: '',
                area: '',
                income: ''
            }
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
        this.fetchData()
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
        },
        async fetchData() {
            try {
                this.loading = true;
                this.error = null;
                this.locationData = await fetchLocationData();
                this.updateChartData(this.selectedChartType);
            } catch (error) {
                this.error = 'Không thể tải dữ liệu';
                console.error('Error:', error);
            } finally {
                this.loading = false;
            }
        },
        updateChartData(type) {
            this.chartData = processChartData(this.locationData, type);
        },
        async handleFilter() {
            try {
                this.loading = true;
                this.error = null;
                
                const params = {
                    price: Number(this.filterParams.price) || undefined,
                    area: Number(this.filterParams.area) || undefined,
                    income: Number(this.filterParams.income) || undefined
                };
                
                this.locationData = await fetchFilteredChartData(params);
                this.updateChartData(this.selectedChartType);
            } catch (error) {
                this.error = 'Không thể lọc dữ liệu';
                console.error('Error:', error);
            } finally {
                this.loading = false;
            }
        }
    },
    watch: {
        selectedChartType(newType) {
            this.updateChartData(newType);
        }
    }
}
</script>

<style scoped>
.section-inputs {
    padding: 2rem;
    margin: 0 auto;
    min-height: 600px;
}

.input-container {
    display: flex;
    /* display: grid; */
    gap: 1rem;
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

.chart-container {
    width: 100%;
    height: 300px;
}
</style>
