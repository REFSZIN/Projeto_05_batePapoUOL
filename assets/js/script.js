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
let destino;
let participantes = [];
//-------------------------------------------------------------------------
getParticipantes();
function abrirMenu (){
    telaAside.classList.toggle("ativo")
};
function scrollAtomatico() {
    window.scrollTo(0, 1000);
}
function exitchat(){
    telaLogin.classList.add("ativo");
    location.reload();
}
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
        setInterval(usuarioConectado, 5000);
        setInterval(sucessoEntrada, 3000);
    });
    promise.catch(function (){
        alert(`Nome: ${meuUsuario} já cadrastado!`)
    });
};
function sucessoEntrada (){
    const promise= axios.get(`${UOLAPI}/messages`)
    promise.then(function(mensagens){
    listaMsg.innerHTML = "";
    aplicarMsgs(mensagens.data);
    scrollAtomatico()
    });
    promise.catch(function(){
        alert(`${meuUsuario} erro em carregar as mesagens!`)
    })
};
function usuarioConectado (){
    const promise = axios.post(`${UOLAPI}/status`, { name: meuUsuario});
    promise.then(function (){
        console.log("Conectado")
    });
    promise.catch(function (){
        alert(`${meuUsuario} você foi desconectado!`)
        window.location.reload();
    });
};
function enviarMensagem(){
    let env = event.keyCode;
    if(env === 13 && input.value.length > 0){
        let dataMsg = 
        {
            from: meuUsuario,
            to: "Todos",
            text: document.querySelector(".inputmsg").value,
            type: "message",
        };
        console.log(dataMsg)
    
        const promise = axios.post(`${UOLAPI}/messages`, dataMsg)
    
        promise.then(function(){
            sucessoEntrada()
            input.value ="";
        }
        )
        promise.catch(function(){
            alert("Não foi possível enviar sua mensasgem");
            exitchat();
        })
    }
}

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
            <h3 class="msg"> ${texto}</h3>
            </article>`
        };
        if  (type === "message") {
            listaMsg.innerHTML +=
            `<article class="global">
            <span class="horario">${time}</span>
            <h2 class="nome">${rementente}:</h2>
            <h3 class="msg"> ${texto}</h3>
            </article>`
        };
        if(type === "private_message" && destino ===  meuUsuario) {
            listaMsg.innerHTML +=
            `<article class="msgprive">
            <span class="horario">${time}</span>
            <h2 class="nome">${rementente}</h2>
            <h2 class="nomeremetente">para ${destino}: </h2>
            <h3 class="msg"> ${texto}</h3>
            </article>`
        };
    });
};

function getParticipantes() {
    const promise = axios.get(`${UOLAPI}/participants`);
    promise.then(function(response) {
        participantes = response.data;
        participantes.forEach(participante => {
            listaUser.innerHTML +=`
                <div class="contatos">
                    <ion-icon name="person-circle"></ion-icon>
                    <span>${participante.name}</span>
                    <ion-icon class="checkon" name="checkmark-outline"></ion-icon>
                </div>
            `
        })
    }).catch( function(response){
        console.log(response.error)
    })
}