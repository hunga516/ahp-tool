import { createStore } from "vuex"

export default createStore({
    state: {
        language: "pt",
        popUp: null,
        balao: "",
        matrizInputAtual: "",
        slideresPrimeira: [],
        slideresSegunda: [],
        matrizPrimeira: [],
        matrizSegunda: [],
        viewProgress: 1,
        tabViewAtual: null,

        criteriosLabelPrimeira: [],
        criteriosLabelSegunda: [],
        optionsLabelPrimeira: [],
        optionsLabelSegunda: [],

        criteriosSimboloPrimeira: [],
        criteriosSimboloSegunda: [],
        optionsSimboloPrimeira: [],
        optionsSimboloSegunda: [],

        tema: {},
        color: {},
        fontColor: {},
        ilustrations: {},

        importFlag: false,
        continueFlag: false
    },
    mutations: {
        setLanguage(state, data) {
            state.language = data
        },
        setColor(state, data) {
            state.color = data
        },
        setFontColor(state, data) {
            state.fontColor = data
        },
        setBalao(state, data) {
            state.balao = data
        },
        setPopUp(state, data) {
            state.popUp = data
        },

        setCriteriosLabelPrimeira(state, data) {
            state.criteriosLabelPrimeira = data
        },
        setOptionsLabelPrimeira(state, data) {
            state.optionsLabelPrimeira = data
        },
        setCriteriosLabelSegunda(state, data) {
            state.criteriosLabelSegunda = data
        },
        setOptionsLabelSegunda(state, data) {
            state.optionsLabelSegunda = data
        },

        setCriteriosSimboloPrimeira(state, data) {
            state.criteriosSimboloPrimeira = data
        },
        setOptionsSimboloPrimeira(state, data) {
            state.optionsSimboloPrimeira = data
        },
        setCriteriosSimboloSegunda(state, data) {
            state.criteriosSimboloSegunda = data
        },
        setOptionsSimboloSegunda(state, data) {
            state.optionsSimboloSegunda = data
        },

        setMatrizInputAtual(state, data) {
            state.matrizInputAtual = data
        },
        setSlideresPrimeira(state, data) {
            state.slideresPrimeira = data
        },
        setMatrizPrimeira(state, data) {
            state.matrizPrimeira = data
        },
        setSlideresSegunda(state, data) {
            state.slideresSegunda = data
        },
        setMatrizSegunda(state, data) {
            state.matrizSegunda = data
        },
        setViewProgress(state, data) {
            state.viewProgress = data
        },
        setTabViewAtual(state, data) {
            state.tabViewAtual = data
        },

        setImportFlag(state, data) {
            state.importFlag = data
        },
        setContinueFlag(state, data) {
            state.continueFlag = data
        }
    },
    getters: {
        currentLanguage(state) {
            return state.language
        },
        currentColor(state) {
            return state.color
        },
        currentFontColor(state) {
            return state.fontColor
        },
        currentBalao(state) {
            return state.balao
        },
        currentPopUp(state) {
            return state.popUp
        },

        currentCriteriosLabelPrimeira(state) {
            return state.criteriosLabelPrimeira
        },
        currentOptionsLabelPrimeira(state) {
            return state.optionsLabelPrimeira
        },
        currentCriteriosLabelSegunda(state) {
            return state.criteriosLabelSegunda
        },
        currentOptionsLabelSegunda(state) {
            return state.optionsLabelSegunda
        },

        currentCriteriosSimboloPrimeira(state) {
            return state.criteriosSimboloPrimeira
        },
        currentOptionsSimboloPrimeira(state) {
            return state.optionsSimboloPrimeira
        },
        currentCriteriosSimboloSegunda(state) {
            return state.criteriosSimboloSegunda
        },
        currentOptionsSimboloSegunda(state) {
            return state.optionsSimboloSegunda
        },

        currentMatrizInputAtual(state) {
            return state.matrizInputAtual
        },
        currentSlideresPrimeira(state) {
            return state.slideresPrimeira
        },
        currentSlideresSegunda(state) {
            return state.slideresSegunda
        },
        currentMatrizPrimeira(state) {
            return state.matrizPrimeira
        },
        currentMatrizSegunda(state) {
            return state.matrizSegunda
        },
        currentViewProgress(state) {
            return state.viewProgress
        },
        currentTabViewAtual(state) {
            return state.tabViewAtual
        },
        currentImportFlag(state) {
            return state.importFlag
        },
        currentContinueFlag(state) {
            return state.continueFlag
        }
    },
    actions: {
        changeLanguage(context, data) {
            context.commit("setLanguage", data)
        },
        changeColor(context, data) {
            context.commit("setColor", data)
        },
        changeFontColor(context, data) {
            context.commit("setFontColor", data)
        },
        changeBalao(context, data) {
            context.commit("setBalao", data)
        },
        changePopUp(context, data) {
            context.commit("setPopUp", data)
        },

        changeCriteriosLabelPrimeira(context, data) {
            context.commit("setCriteriosLabelPrimeira", data)
        },
        changeOptionsLabelPrimeira(context, data) {
            context.commit("setOptionsLabelPrimeira", data)
        },
        changeCriteriosLabelSegunda(context, data) {
            context.commit("setCriteriosLabelSegunda", data)
        },
        changeOptionsLabelSegunda(context, data) {
            context.commit("setOptionsLabelSegunda", data)
        },

        changeCriteriosSimboloPrimeira(context, data) {
            context.commit("setCriteriosSimboloPrimeira", data)
        },
        changeOptionsSimboloPrimeira(context, data) {
            context.commit("setOptionsSimboloPrimeira", data)
        },
        changeCriteriosSimboloSegunda(context, data) {
            context.commit("setCriteriosSimboloSegunda", data)
        },
        changeOptionsSimboloSegunda(context, data) {
            context.commit("setOptionsSimboloSegunda", data)
        },

        changeMatrizInputAtual(context, data) {
            context.commit("setMatrizInputAtual", data)
        },
        changeSlideresPrimeira(context, data) {
            context.commit("setSlideresPrimeira", data)
        },
        changeSlideresSegunda(context, data) {
            context.commit("setSlideresSegunda", data)
        },
        changeMatrizPrimeira(context, data) {
            context.commit("setMatrizPrimeira", data)
        },
        changeMatrizSegunda(context, data) {
            context.commit("setMatrizSegunda", data)
        },
        changeViewProgress(context, data) {
            context.commit("setViewProgress", data)
        },
        changeTabViewAtual(context, data) {
            context.commit("setTabViewAtual", data)
        },

        changeImportFlag(context, data) {
            context.commit("setImportFlag", data)
        },
        changeContinueFlag(context, data) {
            context.commit("setContinueFlag", data)
        }
    }
})