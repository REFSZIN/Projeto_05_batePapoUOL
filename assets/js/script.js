let telaLogin = document.querySelector("nav.login");
let telaAside = document.querySelector("section.aside");
let input = document.querySelector(".inputmsg");
let listaUser = document.querySelector(".menu");
let listaMsg = document.querySelector(".conteiner");
let iconSend = document.querySelector(".iconsendmsg");
let inputLogin = document.querySelector(".input_login input");
let buttonLogin = document.querySelector(".button_login button");
let iconAside = document.querySelector("header ion-icon");
let exitAside = document.querySelector("aside .exit");
let publicoCheck = document.querySelector(".publico ion-icon");
let privadoCheck = document.querySelector(".reservado ion-icon");
let userCheck = document.querySelector(".checkon");
let meuUsuario = {};
let destinatario = "Todos";
let ultimaVisibilidade = "Público";
let participantes = [];
//-------------------------------------------------------------------------
function enterLogin (){
    enter = event.keyCode;
    if (enter === 13 && inputLogin.value.length >= 3){
    login();
    }
}
function login (){
    meuUsuario = inputLogin.value;
    if (meuUsuario.length >= 3)
    telaLogin.classList.add("desativo");
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', meuUsuario).then(sucessoEntrada).catch(erroUsuario);
}
function abrirMenu (){
    telaAside.classList.toggle("ativo")
}
// function sucessoEntrada(){

// }
// function erroUsuario (){

// }
//-------------------------------------------------------------------