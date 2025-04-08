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
            type: Array,
            default: () => [1, 1, 1, 1]
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
        background-color: #2195ff;
        color: white;
    }
    .th-titulo-vetor{
        font-size: 12pt;
        font-weight: bold;
        height: 50px;
    }

    .celulas-valores{
        background-color: #2195ff;
    }

</style>
