<template>

    <div
        class="reportarErro-container"
    >
        <!-- O uso do atributo "name" em cada input é obrigatório pela API -->
        <form :action="formAtual" method="POST" id="formulario-reportar-bug" name="report-issue">
            <div class="dados" id="div-dados-formulario">
                <span id="span-user-name-formulario">{{ $t('userNameReportarErro') }}</span>
                <input type="text" id="input-name-formulario" name="Nome">
                <span id="span-user-email-formulario">{{ $t('userEmailReportarErro') }}</span>
                <input type="email" id="input-email-formulario" name="E-mail">
            </div>
            <br>
            <div class="message" id="div-message-formulario">
                <span id="span-message-formulario">{{ $t('userMessageReportarErro') }}</span>
                <textarea id='area-message' name="Mensagem"></textarea>
            </div>
            <button type="submit" @click="enviarErro($event)" id="botao-enviar-formulario">
                {{ $t('botaoEnviarReportarErro') }}
            </button>
        </form>

    </div>

</template>

<script>
export default {
    name: "vue-reportar-erro",
    data() {
        return {
            userInputs: null,
            action: {
                metodoAcesso: "https://formspree.io/f/xoqovpge",
                metodoLavra: ""
            }
        }
    },
    computed: {
        formAtual() {
            return this.action[this.$store.getters.currentApplication]
        }
    },
    mounted() {
        // Seleciola todos os inputs da página
        this.userInputs = document.querySelectorAll("input, textarea")
    },
    methods: {
        verificarCampos() {
            let camposVerificados = true
            // Verifica se todos os campos obrigatórios foram preenchidos
            this.userInputs.forEach((element) => {
                if (element.value.trim() === "") {
                    // Adiciona uma borda vermelha aos elementos não preenchidos
                    element.style.border = "1pt solid red"
                    camposVerificados = false
                } else {
                    element.style.border = "1pt solid black"
                }
            })
            return camposVerificados
        },
        enviarErro(event) {
            const camposPrenchidos = this.verificarCampos()
            // Se algum campo obrigatório não foi preenchido, impedir o envio do formulário
            if (!camposPrenchidos) {
                event.preventDefault()
            }
        }
    }
}
</script>

<style scoped>

    .reportarErro-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        width: 98%;
        max-height: 200px;
        padding: 5px;
    }

    form {
        display: block;
    }

    .dados,
    .message {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 2px;
        line-height: 1.2;
    }

    span {
        display: block;
        grid-column: 1/2;
    }

    input {
        display: block;
        grid-column: 2/3;
        border: var(--borda-simples);
    }

    textarea {
        display: block;
        grid-column: 1/3;
        width: 98%;
        height: 200px;
    }

    button {
        width: 100px;
        height: 20px;
        border: var(--borda-simples);
        background-color: var(--cor-tema);
        color: var(--cor-texto-tema);
        border-radius: 20px;
        position: absolute;
        right: 5%;
        bottom: 10%;
        display: block;
        text-align: center;
    }

    button:hover {
        box-shadow: var(--shadow-tema);
        transform: scale(1.05);
        cursor: pointer;
    }

</style>
