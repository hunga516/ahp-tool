// translation.js
const translation = {

    // GENERAL
    pageTitulo: "Analytical Hierarchy Process Decision Tool",
    buttonAdicionar:"Add",
    switchLanguage: "Switch to English",
    ptSwitchLanguage: "PT",
    enSwitchLanguage: "EN",
    selectMethod: "SELECT THE METHOD",
    sim: "Yes",
    nao: "No",
    selecione: "Select",
    baixo: "Low",
    medio: "Medium",
    alto: "High",
    tituloFluxograma: "FLOWCHART",
    tituloInputs: "CHOICE PARAMETERS",
    tituloIlustration: "ILLUSTRATION",
    exportProject: "Export Project",
    importProject: "Import Project",
    resetProject: "Reset Project",
    continueProject: "Continue Project",
    step: "STEP",
    resultados: "RESULTS",

    // FOOTER
    universidadeFooter: "Federal University of Rio Grande do Sul",
    laboratorioFooter: "Mineral Processing Laboratory",
    localizacaoUmFooter: "Avenida Bento Gonçalves, 9500, Campus do Vale, Sector 6, Technology Center, LAPROM",
    localizacaoDoisFooter: "Porto Alegre, Rio Grande do Sul, Brazil. ZIP: 91501-970",
    contatoFooter: "Contact: email@ufrgs.com",
    linksFooter: "Links",
    creditosFooter: "Credits",
    referenciasFooter: "References",
    reportarErroFooter: "Report Error",

    // POPUP CREDITS
    creditosTituloPopUp: "CREDITS",
    universidadeCreditos: "FEDERAL UNIVERSITY OF RIO GRANDE DO SUL",
    laboratorioCreditos: "MINERAL PROCESSING LABORATORY",
    versaoCreditos: "VERSION 1.0",
    tituloFerramentaCreditos: "Analytical Hierarchy Process",
    tituloAutoresCreditos: "AUTHORS",
    nomeAutoresCreditos: "HIGOR CAMPOS",
    tituloApoioCreditos: "SUPPORT",
    apoioUmCreditos: "MAFMINE TEAM",
    localizacaoCreditos: "Porto Alegre, Rio Grande do Sul, Brazil",
    dataCreditos: "2023",

    // POPUP REFERENCES
    referenciasTituloPopUp: "REFERENCES",
    maisSobreAhpTituloPopUp: "AHP REFERENCES",
    tituloReferencias: "REFERENCES",
    referenciaCardozoArtigo: "CARDOZO, F. A. C. et al. Choice of access for underground mining for feasibility studies. REM-International Engineering Journal, v. 76, p. 187-193, 2023.",
    referenciaCardozoTese: "CARDOZO, F. A. C. Underground Excavation Modeling: Contributions to the Choice of Mine Accesses. Doctorate—Porto Alegre: Federal University of Rio Grande do Sul, March 3, 2023.",
    referenciaAtaei: "ATAEI, M. et al. Mining Method Selection By AHP Approach. Journal of the Southern African Institute of Mining and Metallurgy, v. 108, n. 12, p. 741–749, 2008.",
    referenciaShariar: "SHAHRIAR, K. et al. A New Numerical Method And AHP For Mining Method Selection. Proc. 4th Int. Symp, on ‘High performance mine production. p. 289–306. 2007.",
    referenciaBanda: "BANDA, W. An integrated framework comprising of AHP, expert questionnaire survey and sensitivity analysis for risk assessment in mining projects. International Journal of Management Science and Engineering Management, v. 14, n. 3, p. 180-192, 2019.",
    referenciaSaaty: "SAATY, T. L. How to make a decision: the analytic hierarchy process. European journal of operational research, 48(1), 9-26. 1996",
    referenciaRibeiro: "RIBEIRO, M. C. D. C. R., & da Silva Alves, A. Application of the Analytic Hierarchy Process (AHP) method with absolute measurement in a qualitative selection problem. Sistemas & Gestão, 11(3), 270-281. 2016. ",

    // POPUP REPORT ERROR
    reportarErroTituloPopUp: "REPORT ERROR",
    userNameReportarErro: "Your name:",
    userEmailReportarErro: "Your email:",
    userMessageReportarErro: "Your message:",
    botaoEnviarReportarErro: "SEND",

    // MCDM INPUTS
    tituloMcdm: "SELECTION OF ACCESS FOR UNDERGROUND MINES: Multicriteria Analysis",
    mcdmTituloCriterios: "CRITERIA",
    mcdmTituloOptions: "OPTIONS",
    inputNomeLabelCriterios: "Enter and name the selection criteria below",
    inputNomeLabelOptions: "Enter and name the options for comparison below",
    inputSimboloLabel: "Symbol",

    // FIRST STEP
    tituloMatrizSegundaEtapaAhp: "Criteria Comparison",

    // RESULTS STAGE
    matrizPrioridadesGlobais: "LOCAL PRIORITIES MATRIX",
    vetorPrioridadeGlobal: "GLOBAL PRIORITIES VECTOR",
    tituloPesoGlobal: "Criterion Weight",

    // AHP RIGHT SIDEBAR MENU
    helpEscalaSaaty: "AHP SCALE",
    helpMaisSobreAhp:"MORE ABOUT AHP",
    helpPrimeiraEtapa:"HELP STEP 1",
    helpSegundaEtapa:"HELP STEP 2",
    helpResultadosEtapa:"HELP RESULTS",

    // POPUP MORE ABOUT AHP
    tituloMaisSobreAhp:"MORE ABOUT AHP",

    // POPUP SAATY SCALE TABLE
    tituloEscalaSaaty: "COMPARISON SCALE",
    verbalEscalaSaaty: "Verbal",
    numericaEscalaSaaty: "Numerical",
    igualImportanciaEscalaSaaty: "Equal importance",
    moderadamenteSuperiorEscalaSaaty: "Moderately superior",
    superiorEscalaSaaty: "Superior",
    muitoSuperiorEscalaSaaty: "Very Superior",
    extremamenteSuperiorEscalaSaaty: "Extremely superior",
    legendaEscalaSaaty: "The values 2,4,6 and 8 are intermediate.",

    // POPUP AHP STEPS
    helpCalculosAhp:"STEP BY STEP",
    passosAhpTituloPopUp:"AHP STEP BY STEP",
    tituloAhpPassos: "AHP STEP BY STEP",
    ahpPassoUm:"1st - CREATION OF THE PAIRWISE COMPARISON MATRIX",
    ahpPassoUmUm:"Use the AHP pairwise comparison scale",
    ahpPassoUmDois:"Evaluate each item in the rows of the matrix relative to the item in the column",
    ahpPassoDois:"2nd - SUM OF THE COLUMNS OF THE JUDGMENT MATRIX",
    ahpPassoDoisUm:"Sum each column individually (one sum value for each criterion).",
    ahpPassoTres:"3rd - NORMALIZE THE JUDGMENT MATRIX",
    ahpPassoTresUm:"Divide each item in the columns of the matrix by the sum of its own column",
    ahpPassoQuatro:"4th - CALCULATE THE WEIGHT VECTOR OF EACH CRITERION (W)",
    ahpPassoQuatroUm:"The weight of each criterion is equal to the arithmetic mean of the corresponding row in the normalized matrix.",
    ahpPassoCinco:"5th - CALCULATE THE WEIGHTED SUM VECTOR (WS)",
    ahpPassoCincoUm:"The WS vector is the result of multiplying the initial judgment matrix by the criteria weight vector",
    ahpPassoSeis:"6th - CALCULATE THE CONSISTENCY VECTOR",
    ahpPassoSeisUm:"The consistency vector is the result of dividing the WS vector by the criteria weight vector (W)",
    ahpPassoSete:"7th - CALCULATE THE MAXIMUM EIGENVALUE OF THE JUDGMENT MATRIX",
    ahpPassoSeteUm:"The maximum eigenvalue (λmax) is equal to the arithmetic mean of the elements of the consistency vector.",
    ahpPassoOito:"8th - CALCULATE THE CONSISTENCY INDEX (CI)",
    ahpPassoOitoUm:"CI = (λmax − n)/(n − 1), where n is the order of the matrix.",
    ahpPassoOitoDois:"Example of inconsistency: A>B, B>C and C>A",
    ahpPassoNove:"9th - OBTAIN THE RANDOM INDEX (RI) FOR THE JUDGMENT MATRIX",
    ahpPassoNoveUm:"The random index is a tabulated value (Saaty, 1991), representing the average consistency index of reciprocal matrices generated by random values.",
    ahpPassoDez:"10th - CALCULATE THE CONSISTENCY RATIO (CR)",
    ahpPassoDezUm:"The CR indicates how consistent the judgment matrix is compared to matrices generated randomly.",
    ahpPassoDezDois:"CR = CI/RI",
    ahpPassoOnze:"11th - ANALYZE THE RESULTS",
    ahpPassoOnzeUm:"If CR < 0.1, the judgment matrix has been successfully constructed and the weights can be used.",
    ahpPassoOnzeDois:"If CR >= 0.1, the judgment matrix is inconsistent and the process must be restarted (return to step 1)"

}

export default translation
