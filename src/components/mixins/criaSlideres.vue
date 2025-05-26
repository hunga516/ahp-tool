<script>
export default {
    computed: {
        criteriosPrimeira() {
            return this.$store.getters.currentCriteriosLabelPrimeira
        },
        optionsPrimeira() {
            return this.$store.getters.currentOptionsLabelPrimeira
        },
        criteriosSegunda() {
            return this.$store.getters.currentCriteriosLabelSegunda
        },
        optionsSegunda() {
            return this.$store.getters.currentOptionsLabelSegunda
        },
        currentImportFlag() {
            return this.$store.getters.currentImportFlag
        },
        currentViewProgress() {
            return this.$store.getters.currentViewProgress
        }
    },
    methods: {
        arranjoCriterios() {
            const arranjoCriterios = []
            for (let i = 0; i < this.criteriosSegunda.length; i++) {
                for (let j = 0; j < this.criteriosSegunda.length; j++) {
                    if (i < j) {
                        arranjoCriterios.push(
                            {
                                id: `${i + 1}${j + 1}`,
                                texto: `${this.criteriosSegunda[i]} vs ${this.criteriosSegunda[j]}`,
                                valor: 50
                            }
                        )
                    }
                }
            }
            return arranjoCriterios
        },
        arranjoOptions() {
            const arranjoOptions = []
            const optionLabels = this.$store.getters.currentOptionsLabelPrimeira
            for (let i = 0; i < optionLabels.length; i++) {
                for (let j = 0; j < optionLabels.length; j++) {
                    if (i < j) {
                        arranjoOptions.push(
                            {
                                id: `${i + 1}${j + 1}`,
                                texto: `${optionLabels[i]} vs ${optionLabels[j]}`,
                                valor: 50
                            }
                        )
                    }
                }
            }
            return arranjoOptions
        },
        criaSlideresPrimeira() {
            const slideres = []
            for (let i = 0; i < this.criteriosPrimeira.length; i++) {
                slideres.push(
                    this.arranjoOptions()
                )
            }
            return slideres
        },
        criaSlideresSegunda() {
            const slideres = this.arranjoCriterios()
            return slideres
        },
        mergeSlideresMatrix(oldSlideres, newSlideres) {
            const mergedSlideres = JSON.parse(JSON.stringify(newSlideres))

            for (let i = 0; i < newSlideres.length; i++) {
                for (let j = 0; j < newSlideres[i].length; j++) {

                    if (oldSlideres[i] && oldSlideres[i][j]) {
                        mergedSlideres[i][j].texto = oldSlideres[i][j].texto
                        mergedSlideres[i][j].valor = oldSlideres[i][j].valor
                    }
                }
            }


            return mergedSlideres   
        },
        mergeSlideresVetor(oldSlideres, newSlideres) {
            const mergedSlideres = JSON.parse(JSON.stringify(newSlideres))

            for (let i = 0; i < newSlideres.length; i++) {

                if (oldSlideres[i] && oldSlideres[i]) {
                    mergedSlideres[i].texto = oldSlideres[i].texto
                    mergedSlideres[i].valor = oldSlideres[i].valor
                }
            }

            return mergedSlideres
        },
        criaSlideres() {
            const newSlideresPrimeira = this.criaSlideresPrimeira()
            const newSlideresSegunda = this.criaSlideresSegunda()

            if (!this.currentImportFlag && this.currentViewProgress == 1) {
                console.log(!this.currentImportFlag, this.currentViewProgress == 1)
                console.log("Criando Slideres")
                this.$store.dispatch("changeSlideresPrimeira", newSlideresPrimeira)
                this.$store.dispatch("changeSlideresSegunda", newSlideresSegunda)
            }

            if(this.currentImportFlag || this.currentViewProgress > 1) {
                console.log("Mesclando novos Slideres")
                const oldSlideresPrimeira = this.$store.getters.currentSlideresPrimeira
                const oldSlideresSegunda = this.$store.getters.currentSlideresSegunda
                const mergedSlideresPrimeira = this.mergeSlideresMatrix(oldSlideresPrimeira, newSlideresPrimeira)
                const mergedSlideresSegunda = this.mergeSlideresVetor(oldSlideresSegunda, newSlideresSegunda)
                this.$store.dispatch("changeSlideresPrimeira", mergedSlideresPrimeira)
                this.$store.dispatch("changeSlideresSegunda", mergedSlideresSegunda)

            }
        }
    }
}
</script>