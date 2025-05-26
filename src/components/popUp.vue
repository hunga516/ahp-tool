<template>

    <div
        v-if="aberto!==null"
        class='pop-up-container'
        id="pop-up-container"
    >
        <div
            class='barra-pop-up'
            id="barra-pop-up"
        >
            <h4 class="titulo-pop-up">
                {{ $t(`${aberto}TituloPopUp`) }}
            </h4>
            <button
                class="close-pop-up"
                @click="closePopUp()"
            >
                &times;
            </button>

        </div>

        <div
            class="container-conteudo-pop-up"
        >
            <vueCreditos v-if="aberto === 'creditos'"/>
            <vueReferencias v-if="aberto === 'referencias'"/>
            <vueReportarErro v-if="aberto === 'reportarErro'"/>
            <vueMaisSobreAhp v-if="aberto === 'maisSobreAhp'"/>
            <vueHelpPassosAhp v-if="aberto === 'passosAhp'"/>
        </div>

    </div>

</template>

<script>
import vueCreditos from "@/components/popUpCreditos.vue"
import vueReportarErro from "@/components/popUpReportarErro.vue"
import vueReferencias from "@/components/popUpReferencias.vue"
import vueMaisSobreAhp from "@/components/popUpReferencias.vue"
import vueHelpPassosAhp from "@/components/helpPassosAhp.vue"
export default {
    components: {
        vueCreditos,
        vueReferencias,
        vueReportarErro,
        vueMaisSobreAhp,
        vueHelpPassosAhp
    },
    data() {
        return {
            popUpContainer: null,
            popUpBarra: null,
            limite: {
                right: 0,
                left: 0,
                top: 0,
                bottom: 0
            },
            position: {
                x: 0,
                y: 0
            }
        }
    },
    computed: {
        aberto() {
            return this.$store.getters.currentPopUp
        }
    },
    updated() {
        this.popUpContainer = document.querySelector("#pop-up-container")
        this.popUpBarra = document.querySelector("#barra-pop-up")
        this.prepararMovimento()
    },
    methods: {
        interromperMovimento() {
            document.removeEventListener("mousemove", this.moverPopUp)
        },
        moverPopUp(event) {
            let x = event.clientX - this.position.x
            let y = event.clientY - this.position.y
            x = x < this.limite.left ? this.limite.left : x
            x = x > this.limite.right ? this.limite.right : x
            y = y < this.limite.top ? this.limite.top : y
            y = y > this.limite.bottom ? this.limite.bottom : y
            this.popUpContainer.style.left = `${x}px`
            this.popUpContainer.style.top = `${y}px`
        },
        prepararMovimento() {
            document.addEventListener("mouseup", this.interromperMovimento)
            document.addEventListener("scroll", this.interromperMovimento)
            document.addEventListener("keydown", this.interromperMovimento)
            document.addEventListener("click", this.interromperMovimento)
            if (this.popUpBarra) {
                this.popUpBarra.addEventListener("mousedown", (event) => {
                    document.body.style.userSelect = "none"
                    const bodyHeight = document.getElementById("body").clientHeight
                    const bodyWidth = document.getElementById("body").clientWidth
                    this.position.x = event.clientX - this.popUpContainer.offsetLeft
                    this.position.y = event.clientY - this.popUpContainer.offsetTop
                    this.limite.right = bodyWidth - this.popUpContainer.clientWidth
                    this.limite.bottom = bodyHeight - this.popUpContainer.clientHeight
                    document.addEventListener("mousemove", this.moverPopUp)
                })
            }
        },
        closePopUp() {
            document.body.style.userSelect = "auto"
            document.removeEventListener("scroll", this.interromperMovimento)
            document.removeEventListener("keydown", this.interromperMovimento)
            document.removeEventListener("click", this.interromperMovimento)
            this.$store.dispatch("changePopUp", null)
        }
    }
}

</script>

<style scoped>
    .pop-up-container {
        height: 100%;
        width: 500px;
        position: absolute;
        top: 5%;
        left: 45%;
        box-shadow: 0 0 10px var(--cor-tema);
        background-color: white;
        border: 1px solid black;
        z-index: 100;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        max-height: 400px;
    }
    .container-conteudo-pop-up{
        overflow: auto;
        overflow-x: hidden;
        width: 100%;
        height: 100%;
    }
    .barra-pop-up {
        width: 100%;
        background-color: var(--cor-tema);
        height: 25px;
        z-index: 100;
        position: relative;
        margin-bottom: 2px;
    }
    .barra-pop-up:hover {
        cursor: move;
    }
    .titulo-pop-up {
        color: white;
        font-size: 12pt;
        margin: 0;
        margin-left: 10px;
    }
    .titulo-pop-up:hover {
        cursor: move;
    }
    .close-pop-up {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 24px;
        box-sizing: border-box;
        width: 20px;
        right: 0%;
        top: 0%;
        color: white;
        background-color: transparent;
        border: none;
        font-size: 15pt;
    }
    .close-pop-up:hover {
        color: red;
        cursor: default;
    }
</style>
