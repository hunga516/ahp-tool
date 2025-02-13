<template>
    <div
        class="container-pop-up"
    >
        <div class="creditos-">
            <span v-for="item in credits" :key="item.texto" :class="item.class" v-html="`${$t(item.texto)}`"></span>
        </div>
    </div>
</template>

<script>
export default {
    name: "vue-creditos-acessos",
    data() {
        return {
            credits: [
                {
                    class: "universidade",
                    texto: "universidadeCreditos"
                },
                {
                    class: "laboratorio",
                    texto: "laboratorioCreditos"
                },
                {
                    class: "versao",
                    texto: "versaoCreditos"
                },
                {
                    class: "titulo-ferramenta",
                    texto: "tituloFerramentaCreditos"
                },
                {
                    class: "titulo-autores",
                    texto: "tituloAutoresCreditos"
                },
                {
                    class: "nome-autores",
                    texto: "nomeAutoresCreditos"
                },
                {
                    class: "titulo-apoio",
                    texto: "tituloApoioCreditos"
                },
                {
                    class: "nome-apoio",
                    texto: "apoioUmCreditos"
                },
                {
                    class: "localizacao",
                    texto: "localizacaoCreditos"
                },
                {
                    class: "data",
                    texto: "dataCreditos"
                }
            ]
        }
    }
}
</script>
<style scoped>
  .container-pop-up {
    display: block;
    position: relative;
    padding: 5px;
    width: 100%;
    border: var(--borda-simples);
    border-radius: 20px;
    box-sizing: border-box;
    background-color: white;
  }

  .creditos- {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  span {
    width: 100%;
    text-align: center;
    line-height: 1.5;
  }

  .universidade,
  .laboratorio {
    font-size: 12pt;
    font-weight: bold;
  }

  .data,
  .localizacao {
    font-size: 10pt;
  }

  .versao {
    font-size: 9pt;
    margin-top: 20px;
  }

  .titulo-autores, .titulo-apoio {
    font-size: 12pt;
    margin-bottom: 5px;
  }
  .nome-autores {
    font-size: 12pt;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .nome-apoio{
    font-size: 12pt;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .titulo-ferramenta {
    font-size: 22pt;
    margin-bottom: 20px;
    line-height: 30px;
    text-align: center;
  }

</style>
