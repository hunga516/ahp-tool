<template>
    <vueMenuAhp />

    <section class="min-h-[600px] w-full bg-gray-50 p-8" ref="pdfContent">
        <div class="no-print flex gap-2 mb-4">
            <vueButtonProjectControl @export-pdf="exportToPDF" />
        </div>
        <div class="container-card max-w-7xl mx-auto mb-8 animate-fade-in mt-20">
            
            <h3 class="text-xl font-semibold text-black text-center mb-6">
                {{ $t('matrizPrioridadesGlobais') }}
            </h3>
            
            <table class="table-custom">
                <tr>
                    <th class="table-header text-left"> </th>
                    <th v-for="(itemCriterio, indexCriterio) in criteriosSegunda" 
                        :key="indexCriterio" 
                        class="table-header">
                        {{ itemCriterio }}
                    </th>
                </tr>
                
                <tr>
                    <th class="table-header text-left">
                        {{ $t('tituloPesoGlobal') }}
                    </th>
                    <td v-for="(pesoGlobal, indexPesoGlobal) in matrizSegunda[matrizSegunda.length - 1]['pesos']"
                        :key="indexPesoGlobal"
                        class="table-cell">
                        {{ pesoGlobal.toFixed(4) }}
                    </td>
                </tr>

                <tr v-for="(itemOption, indexOption) in optionsSegunda" :key="indexOption">
                    <th class="table-header text-left">
                        {{ itemOption }}
                    </th>
                    <td v-for="(pesoCriterio, indexPesoCriterio) in matrizPrimeira" 
                        :key="indexPesoCriterio"
                        class="table-cell">
                        {{ pesoCriterio[pesoCriterio.length - 1]['pesos'][indexOption].toFixed(4) }}
                    </td>
                </tr>
            </table>
        </div>

        <div class="container-card max-w-4xl mx-auto mb-8 animate-fade-in">
            <h3 class="text-lg font-semibold text-black text-center mb-4">
                Biểu đồ trọng số các tiêu chí
            </h3>
            <BarChart
                :labels="criteriosSegunda"
                :values="matrizSegunda[matrizSegunda.length - 1]['pesos']"
                :title="'Trọng số các tiêu chí'"
                :yAxisLabel="'Trọng số'"
            />
        </div>

        <div class="container-card max-w-4xl mx-auto mb-8 animate-fade-in">
            <h3 class="text-lg font-semibold text-black text-center mb-4">
                Tỷ lệ phần trăm các tiêu chí (100%)
            </h3>
            <PieChart
                v-if="hasPieChart"
                :labels="criteriosSegunda"
                :values="matrizSegunda[matrizSegunda.length - 1]['pesos']"
                :title="'Tỷ lệ phần trăm các tiêu chí'"
            />
            <BarChart
                v-else
                :labels="criteriosSegunda"
                :values="matrizSegunda[matrizSegunda.length - 1]['pesos']"
                :title="'Tỷ lệ phần trăm các tiêu chí'"
                :yAxisLabel="'Tỷ lệ'"
            />
        </div>

        <div class="container-card max-w-4xl mx-auto mb-8 animate-fade-in">
            <h3 class="text-lg font-semibold text-black text-center mb-4">
                So sánh tổng điểm các phương án
            </h3>
            <BarChart
                :labels="optionsSegunda"
                :values="resultadoFinal()"
                :title="'So sánh tổng điểm các phương án'"
                :yAxisLabel="'Tổng điểm'"
            />
        </div>

        <div class="container-card max-w-7xl mx-auto animate-fade-in">
            <h3 class="text-xl font-semibold text-black text-center mb-6">
                {{ $t('vetorPrioridadeGlobal') }}
            </h3>
            
            <table class="table-custom">
                <tr>
                    <th v-for="(itemOption, indexOption) in optionsSegunda" 
                        :key="indexOption"
                        class="table-header">
                        {{ itemOption }}
                    </th>
                </tr>
                <tr>
                    <td v-for="(itemOption, indexOption) in resultadoFinal()" 
                        :key="indexOption"
                        class="table-cell">
                        {{ itemOption.toFixed(4) }}
                    </td>
                </tr>
            </table>
        </div>
    </section>
</template>
<script>
import vueMenuAhp from "@/components/helpButton.vue"
import vueButtonProjectControl from "@/components/buttonProjectControl.vue"
import BarChart from "./chart/BarChart.vue"
import PieChart from "./chart/PieChart.vue"
import html2pdf from 'html2pdf.js'
export default {
    name: "vue-resultados-etapa",
    components: {
        vueMenuAhp,
        vueButtonProjectControl,
        BarChart,
        PieChart
    },
    computed: {
        matrizPrimeira() {
            return this.$store.getters.currentMatrizPrimeira
        },
        matrizSegunda() {
            return this.$store.getters.currentMatrizSegunda
        },
        criteriosSegunda() {
            return this.$store.getters.currentCriteriosLabelSegunda
        },
        optionsSegunda() {
            return this.$store.getters.currentOptionsLabelSegunda
        },
        hasPieChart() {
            return !!this.$options.components.PieChart
        }
    },
    methods: {
        resultadoFinal() {
            const primeira = this.matrizPrimeira
            const segunda = this.matrizSegunda
            const multiplicaPeso = (index) => {
                const vetor = []
                for (let j = 0; j < segunda[index].length; j++) {
                    vetor.push(
                        segunda[segunda.length - 1]["pesos"][index] * primeira[index][primeira[index].length - 1]["pesos"][j]
                    )
                }
                return vetor
            }
            const pesos = []
            for (let i = 0; i < primeira.length; i++) {
                pesos.push(multiplicaPeso(i))
            }
            const resultado = []
            const somaColuna = (index) => {
                let soma = 0
                for (let lin = 0; lin < pesos.length; lin++) {
                    soma += pesos[lin][index]
                }
                return soma
            }
            for (let index = 0; index < pesos[0].length; index++) {
                resultado.push(somaColuna(index))
            }
            resultado.splice(this.optionsSegunda.length)

            return resultado
        },
        exportToPDF() {
            // Sử dụng html2pdf để xuất toàn bộ section kết quả
            const element = this.$refs.pdfContent;
            const opt = {
                filename: 'AHP_KetQua.pdf',
                image: { type: 'jpeg', quality: 1 },
                html2canvas: {
                    scale: 1.5,
                    ignoreElements: (el) => el.classList && el.classList.contains('no-print')
                },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            };
            html2pdf().set(opt).from(element).save();
        }
    }
}

</script>
<style>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.5s ease-out;
}

.container-card {
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.07);
    padding: 2.5rem 2rem 2rem 2rem;
    margin-bottom: 2.5rem;
    border: 1px solid #e5e7eb;
}

.table-custom {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background: #fafbfc;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    margin-bottom: 2rem;
}

.table-header {
    padding: 1rem 1.5rem;
    background: #f3f4f6;
    color: #222;
    font-weight: 600;
    border-bottom: 1px solid #e5e7eb;
    font-size: 1rem;
}

.table-cell {
    padding: 0.85rem 1.5rem;
    background: #fff;
    border-bottom: 1px solid #f1f1f1;
    font-size: 1rem;
    color: #333;
}

.table-custom tr:last-child .table-cell {
    border-bottom: none;
}

@media (max-width: 900px) {
    .container-card {
        padding: 1.2rem 0.5rem 1.2rem 0.5rem;
    }
    .table-header, .table-cell {
        padding: 0.6rem 0.5rem;
        font-size: 0.95rem;
    }
}

@media (max-width: 600px) {
    .container-card {
        padding: 0.5rem 0.2rem 0.5rem 0.2rem;
    }
    .table-header, .table-cell {
        padding: 0.4rem 0.2rem;
        font-size: 0.9rem;
    }
}

@media print {
    .no-print {
        display: none !important;
    }
    body, .container-card, .table-custom {
        background: #fff !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        margin: 0 !important;
        max-width: 100% !important;
        color: #111 !important;
    }
    .container-card, .table-custom {
        border: 2px solid #222 !important;
    }
    .table-header, .table-cell {
        color: #111 !important;
        background: #fff !important;
        border-bottom: 2px solid #222 !important;
        font-weight: 700 !important;
        font-size: 1.15rem !important;
        padding: 0.7rem 0.7rem !important;
    }
    .table-header {
        background: #f2f2f2 !important;
    }
}
</style>
