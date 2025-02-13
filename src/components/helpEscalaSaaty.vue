<template>


    <div
        class="escala-saaaty-container"
    >

        <table
            class="tabela-escala-saaty"
        >
            <caption class="caption-titulo-escala-saaty">
                {{$t('tituloEscalaSaaty')}}
            </caption>
            <thead>
                <tr>
                    <th>{{$t('verbalEscalaSaaty')}}</th>
                    <th>{{$t('numericaEscalaSaaty')}}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{$t('igualImportanciaEscalaSaaty')}}</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>{{$t('moderadamenteSuperiorEscalaSaaty')}}</td>
                    <td>3</td>
                </tr>
                <tr>
                    <td>{{$t('superiorEscalaSaaty')}}</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>{{$t('muitoSuperiorEscalaSaaty')}}</td>
                    <td>7</td>
                </tr>
                <tr>
                    <td>{{$t('extremamenteSuperiorEscalaSaaty')}}</td>
                    <td>9</td>
                </tr>
            </tbody>
        </table>
        <span
            class="legenda-escala-saaty"
        >
            {{$t('legendaEscalaSaaty')}}
        </span>

    </div>

</template>
<script>
export default{
    name: "vue-escala-saaty",
    data() {
        return{
            mostrarEscala:false
        }
    }
}
</script>
<style scoped>


.escala-saaaty-container{
    position: relative;
    margin: 0;
    margin-top: 1px;
    display: flex;
    align-items: center;
    padding: 3px;
    box-sizing: border-box;
    flex-direction: column;
    background-color: white;
    z-index: 5;
    width: 230px;
    border-radius: 10px;
    border: var(--borda-simples);
}

.caption-titulo-escala-saaty{
    font-size: 11pt;
    text-align: center;
    font-weight: bold;
    width: 100%;
}
.legenda-escala-saaty{
    margin-top: 0;
    font-size: 9pt;
    text-align: center;
    width: 90%;
}
.tabela-escala-saaty {
    border-collapse: collapse;
    text-indent: initial;
    border-spacing: 1px;
    text-align: center;
    font-size: 9pt;
    margin-bottom: 0;
    width: 90%;
    background-color: white;

}
.tabela-escala-saaty thead{
    border-bottom: var(--borda-simples);
    text-align: center;
}
.tabela-escala-saaty tbody{
    border-bottom: var(--borda-simples);
    margin-bottom: 0;
}

</style>