function newsFeedBox(img, title, desc, id) {
    let favs = [];
    favs = JSON.parse(localStorage.getItem("Favoritos"));

    let icone = (favs.indexOf(id.toString(10)) < 0) ? "far" : "fas";
    let box = `<div class="card mb-3 col-12">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="${img}" class="card-img" alt="Imagem da Vaga">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <p style="display:none;">${id}</p>
                                <h5 class="card-title">${title}</h5>
                                <p class="card-text">${desc}</p>
                                <a href="../src/esqueleto.html?id=${id}">Ver mais</a>
                                <i class="${icone} fa-heart favIcon"></i>
                            </div>
                        </div>
                    </div>
                </div>`
    return box;
}

function favoritesBox(img, title, id) {
    let box = `<a href="esqueleto.html?id=${id}">
                <div class="card mb-3 cardFav">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="${img}" class="card-img" alt="Imagem divulgação">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                            <p class="card-title">${title}</p>
                            </div>
                        </div>
                    </div>
                </div></a>`
    return box;
}

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

if (localStorage.getItem("Favoritos") == null) {
    localStorage.setItem("Favoritos", "[]");
}
const urlVagas = "https://tiawdoors-api.herokuapp.com/Vagas";
let xhr = new XMLHttpRequest();
var vagas = [];

function getData() {
    $.ajax({
        url: urlVagas,
    })
        .done(function (data) {
            vagas = data;
            refreshFeed();
            refreshFavs();
        });
}

function postData(data) {
    $.ajax({
        type: "POST",
        url: urlVagas,
        data: data,
        dataType: "json"
    })
        .done(function () {
            getData();
        });
}

function refreshFeed() {
    let box = ``;
    for (x = vagas.length - 1; x >= 0; x--) {
        let newsFeed = document.getElementById('newsFeed');
        box += newsFeedBox(vagas[x].img, vagas[x].title, vagas[x].desc, vagas[x].id);
        newsFeed.innerHTML = box;
    }
    addEventFav();
}

function refreshFavs() {
    let favs = [];
    let encontrado = false;
    let y = 0;
    favs = JSON.parse(localStorage.getItem("Favoritos"));//vagas.indexOf(favs[0].toString(10))
    console.log('dentro ref ', vagas);
    let box = `<h5>Oportunidades Favoritas</h5>`;
    for (i = 0; i < favs.length; i++) {
        y = 0;
        encontrado = false;
        while (!encontrado && y < vagas.length) {
            if (vagas[y].id == favs[i]) {
                encontrado = true;
                box += favoritesBox(vagas[y].img, vagas[y].title, vagas[y].id);
            }
            y++;
        }
    }

    favorites.innerHTML = box;
}

function addEventFav() {
    document.querySelectorAll(".favIcon").forEach((i) => {
        i.addEventListener("click",
            () => {
                let favs = [];
                i.classList.toggle("fas");
                i.classList.toggle("far");
                id = i.parentElement.firstChild.nextSibling.innerText;
                favs = JSON.parse(localStorage.getItem("Favoritos"));

                if (i.classList.contains("fas")) {
                    favs.push(id);
                    localStorage.setItem("Favoritos", JSON.stringify(favs));
                }
                else {
                    favs.splice(favs.indexOf(id), 1);
                    localStorage.setItem("Favoritos", JSON.stringify(favs));
                }
                refreshFavs();
            }, false);
    });
}

function searchResult() {
    let shownCards = document.querySelectorAll("#newsFeed > div");
    let shownTitles = document.querySelectorAll("#newsFeed > div .card-title");
    let nomeFiltro = search.value.toLowerCase();
    let valid;
    for (let i = 0; i < shownTitles.length; i++) {
        let titulo = shownTitles[i].innerText.toLowerCase();
        valid = (titulo.indexOf(nomeFiltro) >= 0);
        shownCards[i].style.display = valid ? '' : 'none';
    }
}

window.onload = () => {

    prepCabecalho();

    if (localStorage.getItem("statusLogin") != "1" && localStorage.getItem("statusLogin") != "2" &&
        sessionStorage.getItem("statusLogin") != "1" && sessionStorage.getItem("statusLogin") != "2") {
        $(".main").html(`<div class="col-sm-12">
                            <p class="loginMsg">Parece que você não está logado. <br>Tente <a href="../src/login.html">logar</a>
                            </p>
                        </div>`);
    }else {
        getData();
        $("#filtro").change(function () {
            let box = ``;
            if (filtro.value == "") {
                //iniciar repetição
                for (x = 0; x <= vagas.length - 1; x++) {
                    box += newsFeedBox(vagas[x].img, vagas[x].title, vagas[x].desc, vagas[x].id);
                    newsFeed.innerHTML = box;
                }//fim do for

            }//fim do if
            else {
                //iniciar repetição
                let box = ``;
                for (x = 0; x <= vagas.length - 1; x++) {
                    if (filtro.value == vagas[x].cat) {
                        box += newsFeedBox(vagas[x].img, vagas[x].title, vagas[x].desc, vagas[x].id);
                        newsFeed.innerHTML = box;
                    }//fim do if
                }//fim  do for
            }
        });

        $("#search").change(() => {
            searchResult()
        }
        );
    }
}