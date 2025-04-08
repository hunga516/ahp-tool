
const CORES = {
    fluxoVerde: "rgba(14, 224, 49, 0.8)",
    fluxoAzul: "rgba(31, 191, 219, 0.493)",
    fluxoVermelho: "rgba(227, 22, 22, 0.742)",
    defaultColor: {
        start: "var(--cor-tema-alt)",
        logistica: "var(--cor-tema-alt)",
        rockMass: "white",
        surfaceMaterial: "white",
        openPit: "white",
        prodCenter: "white",
        prodLeft: "white",
        depthCenter: "white",
        depthLeft: "white",
        correia: "var(--cor-tema-alt)",
        rampa: "var(--cor-tema-alt)",
        shaft: "var(--cor-tema-alt)"
    },
    defaultFontColor: {
        start: "white",
        logistica: "white",
        rockMass: "black",
        surfaceMaterial: "black",
        openPit: "black",
        prodCenter: "black",
        prodLeft: "black",
        depthCenter: "black",
        depthLeft: "black",
        correia: "white",
        rampa: "white",
        shaft: "white"
    }
}

const TEMAS = {
    temaVermelho: {
        HoverColor: "#2195ff",
        mainColor: "#2195ff",
        altColor: "#A72525",
        shadowInput: "-5px 0 5px  rgb(0 0 0 / 95%",
        shadowHover: "0 0 10px #2195ff",
        textColor: "white"
    },
    temaAzulClassico: {
        HoverColor: "#112536",
        mainColor: "#304454",
        shadowInput: "-5px 0 5px  rgb(0 0 0 / 95%",
        shadowHover: "0 0 10px #304454",
        textColor: "white"
    },
    temaAzulEscuro: {
        HoverColor: "#09131c",
        mainColor: "#112536",
        shadowInput: "-5px 0 5px  rgb(0 0 0 / 95%",
        shadowHover: "0 0 10px #304454",
        textColor: "white"
    },
    temaVerde: {
        HoverColor: "#14361e",
        mainColor: "#0d3313",
        altColor: "rgba(3, 49, 3, 0.8)",
        shadowInput: "-5px 0 5px  rgb(0 0 0 / 95%",
        shadowHover: "0 0 10px #58ed82",
        textColor: "white"
    }
}

const RI = [
    0,      //0
    0,      //1
    0,      //2
    0.58,   //3
    0.58,   //4
    0.9,    //5
    1.12,   //6
    1.24,   //7
    1.32,   //8
    1.41,   //9
    1.45,   //10
    1.49    //11
]

export {
    CORES,
    TEMAS,
    RI
}
