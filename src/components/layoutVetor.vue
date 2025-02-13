<template>

    <div
        class="vetor-container"
    >
        <table
            class="vetor matriz"
            :name="idVetor"
        >
            <tr>
                <th
                    class="th-titulo-vetor"
                >{{ tituloVetor }}</th>
            </tr>
            <tr
                v-for="(item, index) in valueVetor"
                :key="index"
                class="linha-valores"
            >
                <td
                    class="celulas-valores"
                >
                    {{ item.toFixed(4) }}
                </td>

            </tr>

        </table>
    </div>
</template>
<script>
export default {
    name: "vue-vetor",
    props: {
        tituloVetor: {
            type: String,
            default: ""
        },
        idVetor: {
            type: String,
            default: ""
        },
        valueVetor: {
            type: Array, // Define o tipo esperado como um array
            default: () => [1, 1, 1, 1] // Define um valor padrão como um array vazio
        }
    },
    data() {
        return {

        }
    }
}

</script>
<style scoped>

    .vetor-container{
        display: flex;
        flex-direction: row;
    }

    .vetor:hover{
        cursor: pointer;
    }
    .vetor tr{
        justify-content: space-evenly;
    }
    .vetor td{
        min-width: 60px;
        max-width: 60px;
        text-align: center;
        background-color: var(--cor-tema-alt);
        color: var(--cor-texto-tema);
        border: var(--borda-simples);
    }
    .th-titulo-vetor{
        font-size: 12pt;
        font-weight: bold;
        height: 50px;
    }

</style>