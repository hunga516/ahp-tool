
<template>
    <header
        class="header-container"
    >
        <img
            class='mining-symbol'
            src="@\assets\Imagens\mining_symbol.png"
            alt="Simbolo da mineração"
        >
        <h1 class="titulo-pagina">
            {{ $t(`pageTitulo`) }}
        </h1>
        <img
            class='mining-symbol'
            src="@\assets\Imagens\mining_symbol.png"
            alt="Simbolo da mineração"
        >
    </header>
</template>
<script>
export default {
    name: "vue-header"
}
</script>
<style scoped>
.titulo-pagina{
    text-align: center;
}
header{
    display: flex;
    background-color: var(--cor-tema);
    border-radius: 30px;
    width: 98%;
    color: var(--cor-texto-tema);
    justify-content: space-between;
    align-items: center;
    padding-inline: 1%;
    box-sizing: border-box;
    border: var(--borda-simples);
}

@media (max-width:800px) {
    .mining-symbol{
        height: 50px;
        display: none;
    }
    header{
        justify-content: center;
    }
}

@media (min-width:800px) {
    .mining-symbol{
        height: 50px;
    }
}

</style>
