const UOLAPI = "https://mock-api.driven.com.br/api/v6/uol";
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
let meuUsuario = null;
let participantes = [];
//-------------------------------------------------------------------------
function abrirMenu (){
    telaAside.classList.toggle("ativo")
};
function enterLogin (){
    enter = event.keyCode;
    if (enter === 13 && inputLogin.value.length >= 3){
    login();
    };
};
function login (){
    meuUsuario = inputLogin.value;
    const promise = axios.post(`${UOLAPI}/participants`, { name: meuUsuario});
    promise.then(function (){
        telaLogin.classList.add("desativo");
        sucessoEntrada();
        setInterval(sucessoEntrada, 100000000000);
        setInterval(usuarioConectado, 5000);
    });
    promise.catch(function (){
        alert(`Nome: ${meuUsuario} já cadrastado!`)
    });
};
function sucessoEntrada (){
    const promise= axios.get(`${UOLAPI}/messages`)
    promise.then(function(mensagens){
    console.log(mensagens.data);
    aplicarMsgs(mensagens.data);
    });
    promise.catch(function(){
    })
};
function usuarioConectado (){
    const promise = axios.post(`${UOLAPI}/status`, { name: meuUsuario});
    promise.then(function (){
        console.log("Conectado")
    });
    promise.catch(function (){
        alert(`${meuUsuario} voçe foi desconectado!`)
        window.location.reload();
    });
};
function aplicarMsgs (mensagens){
    listaMsg.scrollIntoView();
    mensagens.forEach( mensagem => {
        const type = mensagem.type;
        const rementente = mensagem.from;
        const destino = mensagem.to;
        const time = mensagem.time;
        const texto= mensagem.text;

        if(type === "status") {
            listaMsg.innerHTML += 
            `<article class="log">
            <span class="horario">${time}</span>
            <h2 class="nome">${rementente}:</h2>
            <h3 class="msg">${texto}</h3>
            </article>`
        };
        if  (type === "message") {
            listaMsg.innerHTML +=
            `<article class="global">
            <span class="horario">${time}</span>
            <h2 class="nome">${rementente}:</h2>
            <h3 class="msg">${texto}</h3>
            </article>`
        };
        if(type === "private_message") {
            listaMsg.innerHTML +=
            `<article class="msgprive">
            <span class="horario">${time}</span>
            <h2 class="nome">${rementente}:</h2>
            <h2 class="nomeremetente"> para ${destino}:</h2>
            <h3 class="msg">${texto}</h3>
            </article>`
        };
    });
};