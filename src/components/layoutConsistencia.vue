<template>

    <table
        class="consistencia"
    >
        <tr>
            <td id="td-oculto">
                -
            </td>
        </tr>
        <tr>
            <td>

                &lambda; = {{ lambda.toFixed(2) }}
            </td>
        </tr>
        <tr>
            <td>
                CI = {{ CI.toFixed(2) }}
            </td>
        </tr>
        <tr>
            <td>
                RI = {{ RI.toFixed(2) }}
            </td>
        </tr>
        <tr>
            <td ref="td-cr" id="td-cr">
                CR = {{ CR.toFixed(2) }} <div id="icon"></div>
            </td>
        </tr>
    </table>


</template>
<script>
export default {
    name: "vue-consistencia",
    props: {
        lambda: {
            type: Number,
            default: 99
        },
        RI: {
            type: Number,
            default: 99
        },
        CI: {
            type: Number,
            default: 99
        },
        CR: {
            type: Number,
            default: 99
        }
    },
    computed: {
        resultado() {
            return this.CR < 0.1
        }
    },
    watch: {
        CR() {
            this.crColor()
        }
    },
    mounted() {
        this.crColor()
    },
    methods: {
        crColor() {
            this.resultado ? this.$refs["td-cr"].style.color = "green" : this.$refs["td-cr"].style.color = "red"
        }
    }
}

</script>
<style scoped>

    .consistencia tr{
        justify-content: space-evenly;
    }
    .consistencia td{
        min-width: 80px;
        max-width: 80px;
        height: 100%;
        text-align: right;
    }
    #td-oculto{
        color: white;
    }
    .consistencia th{
        text-align: center;
        font-size: 10pt;
    }
    #td-cr{
        font-weight: bold;
    }
</style>
