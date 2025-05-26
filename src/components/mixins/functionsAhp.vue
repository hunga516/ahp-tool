<script>

export default{
    name: "vue-calculo-ahp-mixin",
    methods:{
        conveterEscala(valorOriginal) {
            let minDesejado
            let maxDesejado
            let minOriginal
            let maxOriginal
            if (valorOriginal > 50) {
                minDesejado = 1
                maxDesejado = 9
                minOriginal = 50
                maxOriginal = 100
            } else {
                minDesejado = -1
                maxDesejado = -9
                minOriginal = 50
                maxOriginal = 0
            }
            let valor = minDesejado + (((valorOriginal - minOriginal) / (maxOriginal - minOriginal)) * (maxDesejado - minDesejado))
            valor = valor < 0 ? Math.abs(1 / valor) : parseInt(valor)
            return (valor)
        },
        changeMatrixColor() {
            const matrizes = document.querySelectorAll(".matriz td")
            matrizes.forEach(element => {
                element.style.backgroundColor = "#2195ff)"
                element.style.color = "black"

            })
            const matriz = document.getElementsByName(`${this.matrizAtual}`)
            matriz.forEach(elementParent => {
                elementParent.querySelectorAll("td").forEach(elementChild => {
                    elementChild.style.backgroundColor = "white"
                    elementChild.style.color = "black"
                })
            })
        },
        tdMatrizCoordenada(numero, numColunas) {
            let contador = 0
            for (let i = 1; i <= numColunas; i++) {
                for (let j = 1; j <= numColunas; j++) {
                    contador = j > i ? contador + 1 : contador
                    if(contador === numero) {
                        return { i: i.toString(), j: j.toString() }
                    }
                }
            }
            return contador
        },
        colorirTd(name, tamanho) {
            const sliderIndex = Number(name.split("-")[2]) - 1
            const matriz = document.getElementsByName(`${this.matrizAtual}`)[0]
            const position = this.tdMatrizCoordenada(sliderIndex, tamanho)
            const td = [
                matriz.querySelector(`#td-${position.i}${position.j}`),
                matriz.querySelector(`#td-${position.j}${position.i}`)
            ]
            td[0].style.boxShadow = "0 0 20px var(--cor-tema)"
            td[0].style.transform = "scale(1.02)"
            td[1].style.boxShadow = "0 0 20px var(--cor-tema)"
            td[1].style.transform = "scale(1.02)"
        },
        descolorirTd(name, tamanho) {
            const sliderIndex = Number(name.split("-")[2]) - 1
            const matriz = document.getElementsByName(`${this.matrizAtual}`)[0]
            const position = this.tdMatrizCoordenada(sliderIndex, tamanho)
            const td = [
                matriz.querySelector(`#td-${position.i}${position.j}`),
                matriz.querySelector(`#td-${position.j}${position.i}`)
            ]
            td[0].style.boxShadow = "none"
            td[1].style.boxShadow = "none"
            td[0].style.transform = "scale(1)"
            td[1].style.transform = "scale(1)"
        },
        hoverSlider(chamada) {
            const tamanho = chamada === "primeira" ? this.optionsPrimeira.length : this.criteriosSegunda.length
            const slideres = document.querySelectorAll("input[type='range']")
            slideres.forEach(element =>{
                element.addEventListener("mouseover", () => {
                    this.colorirTd(element.name, tamanho)
                })
                element.addEventListener("mouseout", () => {this.descolorirTd(element.name, tamanho) })
            })
        },
        mouseDownSlider(value, chamada) {

            const tamanho = chamada === "primeira" ? this.optionsPrimeira.length : this.criteriosSegunda.length
            const sliderIndex = Number(value[3].split("-")[2]) - 1

            const matriz = document.getElementsByName(`${this.matrizAtual}`)[0]

            const position = this.tdMatrizCoordenada(sliderIndex, tamanho)
            const td = [
                matriz.querySelector(`#td-${position.i}${position.j}`),
                matriz.querySelector(`#td-${position.j}${position.i}`)
            ]

            const slider = document.getElementsByName(value[3])[0]

            slider.addEventListener("input", () => {
                td[0].style.boxShadow = "0 0 20px var(--cor-tema)"
                td[0].style.transform = "scale(1.02)"
                td[1].style.boxShadow = "0 0 20px var(--cor-tema)"
                td[1].style.transform = "scale(1.02)"
            })
            slider.addEventListener("mouseup", () => {
                td[0].style.boxShadow = "none"
                td[1].style.boxShadow = "none"
                td[0].style.transform = "scale(1)"
                td[1].style.transform = "scale(1)"

            })

        }

    }
}


</script>
