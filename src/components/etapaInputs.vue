<template>
    <section class="section-inputs">
        <div class="flex justify-end mb-4">
            <button 
                class="flex items-center gap-2 px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                @click="toggleHistory"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                </svg>
                <span>Lịch sử tính toán</span>
            </button>
        </div>

        <div v-if="showHistory" class="p-4 mb-8 border-solid border-gray-300 border-[0.5px] rounded-lg">
            <div class="flex items-center justify-between mb-4">
                <p class="font-semibold">
                    Lịch sử tính toán
                </p>
                <button 
                    class="px-2 py-1 bg-black text-white font-semibold rounded-lg"
                    @click="fetchHistory"
                >
                    Tải lại
                </button>
            </div>
            <div v-if="historyLoading" class="flex items-center justify-center h-[200px]">
                <p>Đang tải dữ liệu...</p>
            </div>
            <div v-else-if="historyError" class="flex items-center justify-center h-[200px]">
                <p class="text-red-500">{{ historyError }}</p>
            </div>
            <div v-else class="history-list max-h-[300px] overflow-y-auto">
                <div
                    v-for="project in historyProjects"
                    :key="project._id"
                    class="p-3 mb-2 border-[0.5px] border-solid border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
                    @click="loadProjectFromHistory(project)"
                >
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="font-medium">{{ project.criteriosLabelPrimeira.join(', ') }}</p>
                            <p class="text-sm text-gray-500">
                                {{ new Date(project.timestamp).toLocaleString() }}
                            </p>
                        </div>
                        <button 
                            class="px-2 py-1 bg-blue-500 text-white rounded-lg text-sm"
                            @click.stop="loadProjectFromHistory(project)"
                        >
                            Nhập dữ liệu
                        </button>
                    </div>
                </div>
            </div>
        </div>
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
              <div class="flex flex-col gap-4 max-h-[800px] overflow-y-scroll relative">
                    <div
                        v-for="item in locationData"
                        :key="item._id"
                        class="relative p-4 grid grid-cols-5 border-[0.5px] border-solid border-gray-300 rounded-lg cursor-pointer"
                        :class="selectedLocations.includes(item._id) ? 'bg-gray-200 border-black' : ''"
                        @click="toggleSelectLocation(item._id)"
                    >
                        <img
                            class="col-span-1 rounded-full w-16 h-16"
                            :src="'https://api-ahp.onrender.com/images/' + item.imageURL"
                            alt="Ảnh khu vực"
                        />
                        <div class="col-span-4 flex flex-col gap-2 font-medium">
                            <p>
                                {{ item.khu_vuc }}
                            </p>
                            <p class="text-sm">
                                {{ item.quan }}
                            </p>
                            <p class="justify-self-end text-xs text-muted-foreground">
                                {{ item.dien_tich_tb }}m2 
                                {{ (item.chi_phi_thue / 1000000).toLocaleString() }}tr/th 
                                {{ (item.chi_phi_thue / item.dien_tich_tb / 1000000).toLocaleString(undefined, {maximumFractionDigits: 2}) }}tr/m2
                            </p>
                        </div>
                    </div>
                    <button
                      v-if="selectedLocations.length > 0"
                      class="sticky bottom-0 left-0 right-0 z-10 px-4 py-2 bg-green-600 text-white rounded shadow-lg mt-2"
                      @click="applySelectedLocations"
                    >
                      Áp dụng các khu vực đã chọn
                    </button>
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
            },
            selectedLocations: [],
            historyProjects: [],
            historyLoading: false,
            historyError: null,
            showHistory: false,
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
        },
        selectedLocationObjects() {
            return this.locationData.filter(item => this.selectedLocations.includes(item._id));
        }
    },
    updated() {
        this.saveProject()
    },
    mounted() {
        this.updateFromStore()
        this.criaSlideres()
        this.fetchData()
        this.fetchHistory()
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
            let data = this.locationData;
            if (this.selectedLocations.length > 0) {
                data = this.locationData.filter(item => this.selectedLocations.includes(item._id));
            }
            this.chartData = processChartData(data, type);
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
                this.selectedLocations = [];
                this.updateChartData(this.selectedChartType);
            } catch (error) {
                this.error = 'Không thể lọc dữ liệu';
                console.error('Error:', error);
            } finally {
                this.loading = false;
            }
        },
        toggleSelectLocation(id) {
            const idx = this.selectedLocations.indexOf(id);
            if (idx === -1) {
                this.selectedLocations.push(id);
            } else {
                this.selectedLocations.splice(idx, 1);
            }
            this.updateChartData(this.selectedChartType);
        },
        async fetchHistory() {
            try {
                this.historyLoading = true;
                this.historyError = null;
                const response = await fetch('https://api-ahp.onrender.com/api/projects');
                if (!response.ok) {
                    throw new Error('Không thể tải lịch sử');
                }
                const data = await response.json();
                this.historyProjects = data.projects;
            } catch (error) {
                this.historyError = error.message;
                console.error('Error fetching history:', error);
            } finally {
                this.historyLoading = false;
            }
        },
        async loadProjectFromHistory(project) {
            try {
                this.$store.dispatch("changeImportFlag", true);
                
                // Cập nhật dữ liệu từ project
                Object.keys(project).forEach(key => {
                    if (key !== '_id' && key !== 'timestamp') {
                        this.$store.dispatch(`change${key.charAt(0).toUpperCase() + key.slice(1)}`, project[key]);
                    }
                });

                // Cập nhật local state
                this.optionsLabelPrimeira = project.optionsLabelPrimeira;
                this.optionsSimboloPrimeira = project.optionsSimboloPrimeira;
                this.criteriosLabelPrimeira = project.criteriosLabelPrimeira;
                this.criteriosSimboloPrimeira = project.criteriosSimboloPrimeira;

                // Emit sự kiện cập nhật view
                this.$emit("update-view");
                
                alert('Dữ liệu đã được nhập thành công!');
            } catch (error) {
                console.error('Error loading project:', error);
                alert('Có lỗi xảy ra khi nhập dữ liệu: ' + error.message);
            }
        },
        toggleHistory() {
            this.showHistory = !this.showHistory;
            if (this.showHistory) {
                this.fetchHistory();
            }
        },
        applySelectedLocations() {
            // Lấy tên các khu vực đã chọn
            const names = this.selectedLocationObjects.map(item => item.khu_vuc);
            // Gán cho phương án, nếu ít hơn 4 thì bổ sung tên mặc định
            this.optionsLabelPrimeira = [
                ...names,
                ...Array(4 - names.length).fill('').map((_, i) => `Phương án ${names.length + i + 1}`)
            ].slice(0, 4);
            this.optionsSimboloPrimeira = this.optionsLabelPrimeira.map((_, idx) => `O${idx + 1}`);
        },
    },
    watch: {
        selectedChartType(newType) {
            this.updateChartData(newType);
        },
        selectedLocations(newVal) {
            if (newVal.length > 0) {
                this.optionsLabelPrimeira = [...this.selectedLocationObjects.map(item => item.khu_vuc)];
                this.optionsSimboloPrimeira = this.selectedLocationObjects.map((item, idx) => `O${idx + 1}`);
            } else {
                this.optionsLabelPrimeira = [
                    "Phương án 1",
                    "Phương án 2",
                    "Phương án 3",
                    "Phương án 4"
                ];
                this.optionsSimboloPrimeira = [
                    "O1",
                    "O2",
                    "O3",
                    "O4"
                ];
            }
        },
        locationData() {
            if (this.selectedLocations.length === 0) {
                this.optionsLabelPrimeira = [
                    "Phương án 1",
                    "Phương án 2",
                    "Phương án 3",
                    "Phương án 4"
                ];
                this.optionsSimboloPrimeira = [
                    "O1",
                    "O2",
                    "O3",
                    "O4"
                ];
            }
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

.history-list {
    scrollbar-width: thin;
    scrollbar-color: #888 #f1f1f1;
}

.history-list::-webkit-scrollbar {
    width: 6px;
}

.history-list::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.history-list::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
}

.history-list::-webkit-scrollbar-thumb:hover {
    background: #555;
}

.flex.flex-col.gap-4.max-h-[800px].overflow-y-scroll.relative {
    position: relative;
}
</style>
