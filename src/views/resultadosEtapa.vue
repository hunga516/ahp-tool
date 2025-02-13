<template>

    <section class="container-tabview">
        <vueEtapaResultados/>
    </section>

</template>

<script>
import vueEtapaResultados from "@/components/etapaResultados.vue"

export default {
    name: "vue-view-resultados-etapa",
    components: {
        vueEtapaResultados
    }
}
</script>
