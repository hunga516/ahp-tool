
<template>
    <header
        class="header-container"
    >
        <h1 class="titulo-pagina">
            Nhóm 2 CNPM2 AHP TOOL
        </h1>
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
    padding-left: 10px;
    padding-right: 10px;
    background-color: #3d88fc;
    border-radius: 15px;
    width: 98%;
    color: white;
    justify-content: space-between;
    align-items: center;
    padding-inline: 1%;
    box-sizing: border-box;
}

h1{
    margin: auto;
    padding: 10px;
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
