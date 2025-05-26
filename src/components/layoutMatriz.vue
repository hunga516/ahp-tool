<template>

    <div>
        <table class="matriz" :name="idMatriz" :ref="idMatriz">
            <tbody>
                <tr class="linha-titulo">
                    <th></th>
                    <th class="th-titulo-linha" v-for="(item, optionIndex) in optionMatriz" :key="optionIndex">
                        {{ item }}
                    </th>

                </tr>
                <tr v-for="(item, optionIndex) in optionMatriz" :key="optionIndex" class="linha-valores">
                    <th class="th-titulo-coluna">
                        {{ item }}
                    </th>
                    <td v-for="(item, valueIndex) in valueMatriz[optionIndex]" :key="valueIndex" class="celulas-valores"
                        :ref="`${optionIndex + 1}${valueIndex + 1}`" :id="`td-${optionIndex + 1}${valueIndex + 1}`">
                        {{ valueMatriz[optionIndex][valueIndex] >= 1 ? valueMatriz[optionIndex][valueIndex].toFixed(0) :
                            `1/${(1 / valueMatriz[optionIndex][valueIndex]).toFixed(0)}` }}
                    </td>

                </tr>

            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    name: "vue-matriz",
    props: {
        idMatriz: {
            type: String,
            default: ""
        },
        optionMatriz: {
            type: Array,
            default: () => []
        },
        valueMatriz: {
            type: Array,
            default: () => [
                [1, 1, 1, 1],
                [1, 1, 1, 1],
                [1, 1, 1, 1],
                [1, 1, 1, 1]
            ]  
        }
    }
}

</script>
<style scoped>
.matriz {
    width: 100%;
    height: 100%;
}

.matriz tr {
    justify-content: space-evenly;
}

.matriz td {
    min-width: 60px;
    max-width: 100px;
    text-align: center;
    background-color: #000000;
    color: white;
}

.th-titulo-coluna {
    min-width: 60px;
    max-width: 150px;
    font-size: 12pt;
    font-weight: bold;
    text-align: left;
}

.th-titulo-linha {
    font-size: 12pt;
    font-weight: bold;
    height: 50px;
}

.celulas-valores {
    background-color: #000000;
}
</style>
