<template>
    <vueMenuAhp/>

    <section class="section-resultados">

        <div
            class="container-centro"
        >
            <h3>
                {{ $t('matrizPrioridadesGlobais') }}
            </h3>
            <table
                class="matriz-resultados"
            >
                <tr>
                    <th
                        class="th-titulo-coluna"
                    > </th>
                    <th
                        class="th-titulo-linha"
                        v-for="(itemCriterio, indexCriterio) in criteriosSegunda"
                        :key="indexCriterio"
                    >
                        {{ itemCriterio }}
                    </th>
                </tr>
                <tr>
                    <th
                        class="th-titulo-coluna"
                    >
                        {{ $t('tituloPesoGlobal') }}
                    </th>
                    <td
                        v-for="(pesoGlobal, indexPesoGlobal) in matrizSegunda[matrizSegunda.length-1]['pesos']"
                        :key="indexPesoGlobal"
                    >
                        {{ pesoGlobal.toFixed(4) }}
                    </td>
                </tr>

                <tr
                    v-for="(itemOption,indexOption) in optionsSegunda"
                    :key="indexOption"
                >
                    <th
                        class="th-titulo-coluna"
                    >
                        {{ itemOption }}
                    </th>
                    <td
                        v-for="(pesoCriterio,indexPesoCriterio) in matrizPrimeira"
                        :key="indexPesoCriterio"
                    >
                        {{ pesoCriterio[pesoCriterio.length-1]['pesos'][indexOption].toFixed(4) }}
                    </td>
                </tr>

            </table>
        </div>
        <div
            class="container-vetor-resultado"
        >

            <h3>{{$t('vetorPrioridadeGlobal')}}</h3>
            <table
                class="vetor-resultado"
            >
                <tr>
                    <th
                        class="th-titulo-linha"
                        v-for="(itemOption, indexOption) in optionsSegunda"
                        :key="indexOption"
                    >
                        {{itemOption}}
                    </th>
                </tr>
                <tr>
                    <td
                        v-for="(itemOption, indexOption) in resultadoFinal()"
                        :key="indexOption"
                    >
                        {{itemOption.toFixed(4)}}
                    </td>
                </tr>

            </table>
        </div>

        <vueButtonProjectControl/>

    </section>
</template>
<script>
import vueMenuAhp from "@/components/helpButton.vue"
import vueButtonProjectControl from "@/components/buttonProjectControl.vue"
export default {
    name: "vue-resultados-etapa",
    components:{
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
            const  somaColuna = (index)=> {
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
.section-resultados{
    width: 100%;
    min-height: 600px;
    max-height: 600px;
}
.container-centro{
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-top: 2%;
    margin-left: 100px;
    width: 70%;
    height: 50%;
}
.titulo-matriz-pesos{
    text-align: center;
    margin-bottom: 10px;
    margin-top: 10px;
    font-size: 14pt;
}
.container-vetor-resultado{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 100px;
    width: 70%;
    height: 50%;
    user-select: none;
}
.titulo-prioridade-final{
    text-align: center;
    margin-bottom: 10px;
    margin-top: 10px;
    font-size: 12pt;
}
.matriz-resultados, .vetor-resultado{
    width: 100%;
}
.matriz-resultados td, .vetor-resultado td{
    width: 90px;
    text-align: center;
    background-color: #2195ff;
    color: white;
}
.th-titulo-coluna{
    width: 10%;
    font-size: 12pt;
    font-weight: bold;
    text-align: left;
}
.th-titulo-linha{
    width: 10%;
    font-size: 12pt;
    font-weight: bold;
    height: 50px;
}
</style>
