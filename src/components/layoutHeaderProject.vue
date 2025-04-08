<template>

    <div class="etapas-container">
        <span class="buttons-etapas" ref="span-inputs">
            <a class="link" @click.prevent="handleLink(0,'/inputs')">INPUTS</a>
        </span>

        <span class="buttons-etapas" ref="span-primeira">
            <a class="link" @click.prevent="handleLink(1,'/primeira')">{{ $t("step") }} 1</a>
        </span>

        <span class="buttons-etapas" ref="span-segunda">
            <a class="link" @click.prevent="handleLink(2,'/segunda')">{{$t("step")}} 2</a>
        </span>

        <span class="buttons-etapas" ref="span-resultados">
            <a class="link" @click.prevent="handleLink(3,'/resultados')">{{$t("resultados")}}</a>
        </span>
    </div>

</template>
<script>
export default {
    name: "vue-mcdm-header",
    computed:{
        viewProgress() {
            return this.$store.getters.currentViewProgress
        }
    },
    mounted() {
        this.changeTabOpacity()
        this.changeAtualTab("/inputs")
        this.$router.replace({ path: "/inputs" })
    },
    created() {
        this.$store.dispatch("changeViewProgress", 1)
    },
    methods: {
        handleTemplate() {
            this.changeTabOpacity()
            this.changeAtualTab("/inputs")
        },
        changeTabOpacity() {
            document.querySelectorAll(".buttons-etapas").forEach((element) => {
                element.style.opacity = 0.6
            })
            const span = document.querySelector(".etapas-container").querySelectorAll("span")
            for(let i = 0; (i <= this.viewProgress && i < 4); i++) {
                span[i].style.opacity = 0.85
            }
        },
        changeAtualTab(atual) {
            this.$store.dispatch("changeTabViewAtual", atual)
            atual = "span-" + atual.split("/")[1]
            this.$refs[atual].style.opacity = 1
        },
        handleLink(index, route) {
            if(this.viewProgress > index) {
                this.changeTabOpacity()
                this.changeAtualTab(route)
                this.$router.replace({ path: `${route}` })
            }else if(this.viewProgress === index) {
                this.$store.dispatch("changeViewProgress", this.viewProgress + 1)
                this.changeTabOpacity()
                this.changeAtualTab(route)
                this.$router.replace({ path: `${route}` })
            }
            // console.log(this.viewProgress)
            // console.log(route)

        }
    }
}

</script>

<style scoped>
    .etapas-container{
        display: flex;
        align-items: center;
        position: relative;
        width: 100%;
        max-width: 100%;
        height: 100%;
        max-height: 305px;
        border-bottom: var(--borda-simples);
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        box-sizing: border-box;
        overflow: hidden !important;
        user-select: none;
    }

    .buttons-etapas{
        user-select: none;
        height: 100%;
        width: calc(100%/3);
        background-color: #3d88fc;
        font-weight: 600;
        opacity: 0.9;
        z-index: 2;
        overflow: hidden !important;
    }
    .buttons-etapas:hover{
        opacity: 1;
        overflow: hidden !important;

    }

    #first-etapa{
        border-right: 2pt solid white;
    }
    #secound-etapa{
        border-right: 2pt solid white;
    }
    .link{
        color: var(--cor-texto-tema);
        z-index: 1;
        text-decoration: none;
        user-select: none;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden !important;

    }
    .link:hover{
        cursor: pointer;
    }

</style>
