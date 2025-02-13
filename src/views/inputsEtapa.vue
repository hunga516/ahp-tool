<template>

    <section class="container-tabview">
        <vueEtapaInputs/>
    </section>

</template>

<script>
import vueEtapaInputs from "@/components/etapaInputs.vue"

export default {
    name: "vue-view-inputs-etapa",
    components: {
        vueEtapaInputs
    }
}
</script>
<style scoped>
.switch-language{
    position: absolute;
    margin-top: -14%;
    opacity: 1;
}

</style>