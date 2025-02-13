
import { TEMAS } from "@/assets/javascript/globalConstants.js"

// ARMAZENA VALORES NA LOCAL STORAGE
function armazenarLocal(key, state) {
    // Verifica se o armazenamento local é suportado
    if (typeof (Storage) !== "undefined") {
        // Armazena o valor do input no armazenamento local
        localStorage.setItem(key, state)
    }
}

// ARMAZENA VALORES NA SESSION STORAGE
function armazenarSession(key, state) {
    // Verifica se o armazenamento local é suportado
    if (typeof (Storage) !== "undefined") {
        // Armazena o valor do input no armazenamento local
        sessionStorage.setItem(key, state)
    }
}

// VERIFICA O VALOR ASSOCIADO A key  NA LOCAL STORAGE
function verificarLocal(key) {
    // Verifica se o armazenamento local é suportado no navegador
    if (typeof Storage !== "undefined") {
        // Tenta recuperar o valor armazenado para a chave especificada
        const valor = localStorage.getItem(key)
        // Verifica se há um valor armazenado
        if (valor !== null) {
            // Converte string para booleano, se necessário
            return valor === "true" ? true : valor === "false" ? false : valor
        }
    }
    // Se o armazenamento local não for suportado ou não houver valor, retorna null
    return null
}

// VERIFICA O VALOR ASSOCIADO A key NA SESSION STORAGE
function verificarSession(key) {
    // Verifica se o armazenamento local é suportado no navegador
    if (typeof Storage !== "undefined") {
        // Tenta recuperar o valor armazenado para a chave especificada
        const valor = sessionStorage.getItem(key)
        // Verifica se há um valor armazenado
        if (valor !== null) {
            // Converte string para booleano, se necessário
            return valor === "true" ? true : valor === "false" ? false : valor
        }
    }
    // Se o armazenamento local não for suportado ou não houver valor, retorna null
    return null
}

// CONFIGURA AS VARIÁVEIS CSS QUE DEFINEM AS CORES DO TEMA
function aplicarTema(tema) {
    document.documentElement.style.setProperty("--cor-tema", TEMAS[tema]["mainColor"])
    document.documentElement.style.setProperty("--cor-tema-alt", TEMAS[tema]["altColor"])
    document.documentElement.style.setProperty("--cor-hover", TEMAS[tema]["HoverColor"])
    document.documentElement.style.setProperty("--shadow-hover", TEMAS[tema]["shadowHover"])
    document.documentElement.style.setProperty("--shadow-input", TEMAS[tema]["shadowInput"])
    document.documentElement.style.setProperty("--cor-texto-tema", TEMAS[tema]["textColor"])
}

export {
    armazenarLocal,
    armazenarSession,
    verificarLocal,
    verificarSession,
    aplicarTema
}
