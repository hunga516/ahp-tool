<template>

    <div class="referencias-container">
        <h2
            class="titulo-inside-pop-up"
        >{{ $t('tituloReferencias') }}</h2>
        <ul>
            <li>
                <a href="http://dx.doi.org/10.1590/0370-44672021760094" target="_blank">{{ $t('referenciaCardozoArtigo') }}</a>
            </li>
            <li>
                <a href="http://hdl.handle.net/10183/262393" target="_blank">{{ $t('referenciaCardozoTese') }}</a>
            </li>
            <li>
                <a href="https://www.researchgate.net/publication/257928973_Mining_method_selection_by_AHP_approach" target="_blank">{{ $t('referenciaAtaei') }}</a>
            </li>
            <li>
                <a href="https://www.researchgate.net/publication/279188649_A_New_Numerical_Method_and_AHP_for_Mining_Method_Selection" target="_blank">{{ $t('referenciaShariar') }}</a>
            </li>
            <li>
                <a href="https://doi.org/10.1080/17509653.2018.1516577" target="_blank">{{ $t('referenciaBanda') }}</a>
            </li>
            <li>
                <a href="https://doi.org/10.13128/Aestimum-7138" target="_blank">{{ $t('referenciaSaaty') }}</a>
            </li>
            <li>
                <a href="https://www.researchgate.net/publication/309685942_Aplicacao_do_metodo_Analytic_Hierarchy_Process_AHP_com_a_mensuracao_absoluta_num_problema_de_selecao_qualitativa" target="_blank">{{ $t('referenciaRibeiro') }}</a>
            </li>

        </ul>
    </div>

</template>

<script>

export default {
    name: "vue-referencias-acessos"
}

</script>

<style scoped>

    .referencias-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: 0;
        padding: 0;
    }

    .referencias-container a {
        color: black;
        font-size: 10pt;
        line-height: 1;
    }

    .titulo-inside-pop-up {
        text-align: center;
        font-weight: bold;
        font-size: 16pt;
        margin: 0;
    }

    ul {
        margin: 0;
        padding: 20px;
        list-style-type: disc;
        text-align: justify;
    }

    li {
        margin-bottom: 10px;
    }

</style>
