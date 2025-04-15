<template>
    <vueMenuAhp />

    <section class="section-resultados">

        <div class="container-centro">
            <h3>
                {{ $t('matrizPrioridadesGlobais') }}
            </h3>
            <table class="matriz-resultados">
                <tr>
                    <th class="th-titulo-coluna"> </th>
                    <th class="th-titulo-linha" v-for="(itemCriterio, indexCriterio) in criteriosSegunda"
                        :key="indexCriterio">
                        {{ itemCriterio }}
                    </th>
                </tr>
                <tr>
                    <th class="th-titulo-coluna">
                        {{ $t('tituloPesoGlobal') }}
                    </th>
                    <td v-for="(pesoGlobal, indexPesoGlobal) in matrizSegunda[matrizSegunda.length - 1]['pesos']"
                        :key="indexPesoGlobal">
                        {{ pesoGlobal.toFixed(4) }}
                    </td>
                </tr>

                <tr v-for="(itemOption, indexOption) in optionsSegunda" :key="indexOption">
                    <th class="th-titulo-coluna">
                        {{ itemOption }}
                    </th>
                    <td v-for="(pesoCriterio, indexPesoCriterio) in matrizPrimeira" :key="indexPesoCriterio">
                        {{ pesoCriterio[pesoCriterio.length - 1]['pesos'][indexOption].toFixed(4) }}
                    </td>
                </tr>

            </table>
        </div>
        <div class="container-vetor-resultado">

            <h3>{{ $t('vetorPrioridadeGlobal') }}</h3>
            <table class="vetor-resultado">
                <tr>
                    <th class="th-titulo-linha" v-for="(itemOption, indexOption) in optionsSegunda" :key="indexOption">
                        {{ itemOption }}
                    </th>
                </tr>
                <tr>
                    <td v-for="(itemOption, indexOption) in resultadoFinal()" :key="indexOption">
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
<style scoped>
.section-resultados {
    width: 100%;
    min-height: 600px;
    padding: 2rem;
    background: #fafafa;
}

.container-centro {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 90%;
    max-width: 1200px;
    background: white;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.container-centro h3,
.container-vetor-resultado h3 {
    font-size: 1.25rem;
    color: #2c3e50;
    margin-bottom: 1.5rem;
    font-weight: 600;
    text-align: center;
}

.container-vetor-resultado {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem auto;
    width: 90%;
    max-width: 1200px;
    background: white;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    user-select: none;
}

/* Bảng kết quả */
.matriz-resultados,
.vetor-resultado {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    border-radius: 8px;
    overflow: hidden;
}

.matriz-resultados td,
.vetor-resultado td {
    padding: 1rem;
    text-align: center;
    background-color: #000000;
    color: white;
    font-size: 0.95rem;
    transition: all 0.2s ease;
}

.matriz-resultados td:hover,
.vetor-resultado td:hover {
    background-color: #333333;
}

.th-titulo-coluna {
    padding: 1rem;
    font-size: 0.95rem;
    font-weight: 600;
    text-align: left;
    color: #2c3e50;
    background: #f8f9fa;
    border-bottom: 2px solid #eaeaea;
}

.th-titulo-linha {
    padding: 1rem;
    font-size: 0.95rem;
    font-weight: 600;
    color: #2c3e50;
    background: #f8f9fa;
    border-bottom: 2px solid #eaeaea;
}

/* Responsive */
@media (max-width: 768px) {
    .section-resultados {
        padding: 1rem;
    }

    .container-centro,
    .container-vetor-resultado {
        width: 100%;
        padding: 1rem;
    }

    .matriz-resultados td,
    .vetor-resultado td,
    .th-titulo-coluna,
    .th-titulo-linha {
        padding: 0.75rem;
        font-size: 0.85rem;
    }

    .container-centro h3,
    .container-vetor-resultado h3 {
        font-size: 1.1rem;
    }
}

/* Animation */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.container-centro,
.container-vetor-resultado {
    animation: fadeIn 0.5s ease-out;
}
</style>
