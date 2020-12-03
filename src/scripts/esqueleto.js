function prepCabecalho() {
    if (localStorage.getItem("statusLogin") != "1" && localStorage.getItem("statusLogin") != "2" &&
        sessionStorage.getItem("statusLogin") != "1" && sessionStorage.getItem("statusLogin") != "2") {
        document.querySelector(".navConect").innerHTML = 
                `<a class="nav-link responsivo" href="../src/login.html">Conectar</a>`;
        document.querySelector(".login .dropdown").innerHTML = 
                `<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="../src/login.html">Conectar</a>
                </div>`;
    } else {
        document.querySelector(".navConect").innerHTML = 
                `<a class="nav-link responsivo" href="../src/perfil.html">Meu perfil</a>
                <a class="nav-link responsivo" href="#" onclick="Desconect()">Desconectar</a>`;
        document.querySelector(".login .dropdown").innerHTML = 
                `<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="../src/perfil.html">Meu perfil</a>
                    <a class="dropdown-item" href="#" onclick="Desconect()">Desconectar</a>
                </div>`;
    }
}

function Desconect(){
    localStorage.setItem("statusLogin", "0");
    sessionStorage.setItem("statusLogin", "0");
    localStorage.setItem("userId", "0");
    sessionStorage.setItem("userId", "0");
    location = location;
}

const pageID = window.location.href.split("?id=")[1];
const urlVagas = "https://tiawdoors-api.herokuapp.com/Vagas";
const urlEmpre ="https://tiawdoors-api.herokuapp.com/empredata";
var vagas = [];
var owner = [];

function mainText (desc, requis, ben, sal, cat, email, owner, ownerDesc)
{
    let box =`${desc}<br>
    <strong>Requisitos:</strong> ${requis}
    <br><strong>Beneficios:</strong> ${ben}
    <br><strong>Salário:</strong> ${sal}
    <br><strong>Categoria:</strong> ${cat}
    <br><strong>Empresa:</strong> ${owner}  
    <br><strong>Sobre a empresa:</strong> ${ownerDesc} 
    <br><strong>Quer contatar a empresa?</strong> o e-mail deles é ${email}`;
    return box;
}

function getData(id) {
    $.ajax({
        url: urlVagas + "?id=" +id,
    })
        .done(function (data) {
            vagas = data;
            getOwner(vagas[0].ownerID);
        });
}

function getOwner(id)
{
    $.ajax({
        url: urlEmpre + "?userid=" +id,
    })
        .done(function (data) {
            owner = data;
            loadVaga();
        });
}

function loadVaga()
{
    $("#title").html(vagas[0].title);
    $(".imgDivul").attr("src", vagas[0].img);
    $("#corpo").html(mainText(vagas[0].desc, vagas[0].requis, vagas[0].ben, vagas[0].sal, vagas[0].cat, 
        owner[0].email, owner[0].nome, owner[0].desc));
}

window.onload = () => {
    prepCabecalho();
    getData(pageID);
}