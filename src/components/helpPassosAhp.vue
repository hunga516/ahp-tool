<template>
    <div
        class="container-passos-ahp"
    >
        <h2 class="titulo-inside-pop-up">
            {{ $t('tituloAhpPassos') }}
        </h2>
        <ul
            class="ul-passos-ahp"
        >
            <!-- 1 -->
            <li
                class="li-passos-ahp li-um"
            >
                {{ $t('ahpPassoUm') }}
            </li>
            <li
                class="li-passos-ahp li-dois"
            >
                {{ $t('ahpPassoUmUm') }}
            </li>
            <li
                class="li-passos-ahp li-dois"
            >
                {{ $t('ahpPassoUmDois') }}
            </li>
            <!-- 2 -->
            <li
                class="li-passos-ahp li-um"
            >
                {{ $t('ahpPassoDois') }}
            </li>
            <li
                class="li-passos-ahp li-dois"
            >
                {{ $t('ahpPassoDoisUm') }}
            </li>
            <!-- 3 -->
            <li
                class="li-passos-ahp li-um"
            >
                {{ $t('ahpPassoTres') }}
            </li>
            <li
                class="li-passos-ahp li-dois"
            >
                {{ $t('ahpPassoTresUm') }}
            </li>
            <!-- 4 -->
            <li
                class="li-passos-ahp li-um"
            >
                {{ $t('ahpPassoQuatro') }}
            </li>
            <li
                class="li-passos-ahp li-dois"
            >
                {{ $t('ahpPassoQuatroUm') }}
            </li>
            <!-- 5 -->
            <li
                class="li-passos-ahp li-um"
            >
                {{ $t('ahpPassoCinco') }}
            </li>
            <li
                class="li-passos-ahp li-dois"
            >
                {{ $t('ahpPassoCincoUm') }}
            </li>
            <!-- 6 -->
            <li
                class="li-passos-ahp li-um"
            >
                {{ $t('ahpPassoSeis') }}
            </li>
            <li
                class="li-passos-ahp li-dois"
            >
                {{ $t('ahpPassoSeisUm') }}
            </li>
            <!-- 7 -->
            <li
                class="li-passos-ahp li-um"
            >
                {{ $t('ahpPassoSete') }}
            </li>
            <li
                class="li-passos-ahp li-dois"
            >
                {{ $t('ahpPassoSeteUm') }}
            </li>
            <!-- 8 -->
            <li
                class="li-passos-ahp li-um"
            >
                {{ $t('ahpPassoOito') }}
            </li>
            <li
                class="li-passos-ahp li-dois"
            >
                {{ $t('ahpPassoOitoUm') }}
            </li>
            <li
                class="li-passos-ahp li-dois"
            >
                {{ $t('ahpPassoOitoDois') }}
            </li>
            <!-- 9 -->
            <li
                class="li-passos-ahp li-um"
            >
                {{ $t('ahpPassoNove') }}
            </li>
            <li
                class="li-passos-ahp li-dois"
            >
                {{ $t('ahpPassoNoveUm') }}
            </li>
            <!-- 10 -->
            <li
                class="li-passos-ahp li-um"
            >
                {{ $t('ahpPassoDez') }}
            </li>
            <li
                class="li-passos-ahp li-dois"
            >
                {{ $t('ahpPassoDezUm') }}
            </li>
            <li
                class="li-passos-ahp li-dois"
            >
                {{ $t('ahpPassoDezDois') }}
            </li>
            <!-- 11 -->
            <li
                class="li-passos-ahp li-um"
            >
                {{ $t('ahpPassoOnze') }}
            </li>
            <li
                class="li-passos-ahp li-dois"
            >
                {{ $t('ahpPassoOnzeUm') }}
            </li>
            <li
                class="li-passos-ahp li-dois"
            >
                {{ $t('ahpPassoOnzeDois') }}
            </li>


        </ul>
    </div>

</template>
<script>
export default{
    name: "vue-passo-a-passo-ahp"
}
</script>
<style>
  .container-passos-ahp{
        position: relative;
        margin: 1px;
        display: flex;
        padding: 3px;
        box-sizing: border-box;
        flex-direction: column;
        background-color: white;
        z-index: 5;
        width: 100%;
        padding: 2%;
    }
    .titulo-inside-pop-up {
        text-align: center;
        font-weight: bold;
        font-size: 16pt;
        margin: 0;
    }

    .li-um{
        margin-left: 0px;
        margin-top: 10px;
        font-weight: bold;
        list-style: none;
    }
    .li-dois{
        margin-left: 40px;
        list-style: circle;

    }

    ul{
        /* text-align: justify; */
        padding: 1%;
    }
</style>