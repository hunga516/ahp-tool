<template>
    <vueMenuAhp />

    <section class="min-h-[600px] w-full bg-gray-50 p-8">
        <div class="container-card max-w-7xl mx-auto mb-8 animate-fade-in">
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

        <vueButtonProjectControl />
    </section>
</template>
<script>
import vueMenuAhp from "@/components/helpButton.vue"
import vueButtonProjectControl from "@/components/buttonProjectControl.vue"
export default {
    name: "vue-resultados-etapa",
    components: {
        vueMenuAhp,
        vueButtonProjectControl
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
        }
    },
    methods: {
        resultadoFinal() {
            const primeira = this.matrizPrimeira
            const segunda = this.matrizSegunda
            // console.log(segunda)
            const multiplicaPeso = (index) => {
                const vetor = []
                for (let j = 0; j < segunda[index].length; j++) {
                    // console.log(segunda[segunda.length - 1]["pesos"][i])
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
            // A linha de código abaixo é explicitamente uma gambiarra
            resultado.splice(this.optionsSegunda.length)

            return resultado
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
</style>
