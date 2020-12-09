if (localStorage.getItem("statusLogin") != 1 && localStorage.getItem("statusLogin") != 2) {
    var statusLogin = sessionStorage.getItem("statusLogin");
    var accountId = sessionStorage.getItem("userId");
}
else {
    var statusLogin = localStorage.getItem("statusLogin");
    var accountId = localStorage.getItem("userId");
}

function newsFeedBox(img, title, desc, id) {

    let dados = JSON.parse(localStorage.getItem("Favoritos"));
    let pos = 0;

    for (j = 0; j < dados.length; j++) {
        if (dados[j].userId == accountId) {
            pos = j;
            break;
        }else if (j == dados.length - 1) {
            pos = dados.length;
            dados.push(new fav(accountId, []));
        }
    }

    let icone = (dados[pos].favs.indexOf(id.toString(10)) < 0) ? "far" : "fas";
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

function fav(i, fav) {
    this.userId = i;
    this.favs = fav
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
    if (statusLogin != "1" && statusLogin != "2") {
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

function Desconect() {
    localStorage.setItem("statusLogin", "0");
    sessionStorage.setItem("statusLogin", "0");
    localStorage.setItem("userId", "0");
    sessionStorage.setItem("userId", "0");
    location = location;
}

if (localStorage.getItem("Favoritos") == null) {
    localStorage.setItem("Favoritos", JSON.stringify([new fav(accountId, [])]));
}

const urlVagas = "https://tiawdoors-api.herokuapp.com/Vagas";
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
    let encontrado = false;
    let y = 0;

    let dados = JSON.parse(localStorage.getItem("Favoritos"));
    let pos = 0;

    for (j = 0; j < dados.length; j++) {
        if (dados[j].userId == accountId) {
            pos = j;
            break;
        } else if (j == dados.length - 1) {
            pos = dados.length;
            dados.push(new fav(accountId, []));
        }
    }

    let box = `<h5>Oportunidades Favoritas</h5>`;

    for (i = 0; i < dados[pos].favs.length; i++) {
        y = 0;
        encontrado = false;
        while (!encontrado && y < vagas.length) {
            if (vagas[y].id ==  dados[pos].favs[i]) {
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
                i.classList.toggle("fas");
                i.classList.toggle("far");

                id = i.parentElement.firstChild.nextSibling.innerText;

                let dados = JSON.parse(localStorage.getItem("Favoritos"));
                let pos = 0;

                for (j = 0; j < dados.length; j++) {
                    if (dados[j].userId == accountId) {
                        pos = j;
                        break;
                    } else if (j == dados.length - 1) {
                        pos = dados.length;
                        dados.push(new fav(accountId, []));
                    }
                }
                
                if (i.classList.contains("fas")) {
                    dados[pos].favs.push(id);
                    localStorage.setItem("Favoritos", JSON.stringify(dados));
                }
                else {
                    dados[pos].favs.splice(dados[pos].favs.indexOf(id), 1);
                    localStorage.setItem("Favoritos", JSON.stringify(dados));
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

    if (statusLogin != "1" && statusLogin != "2") {
        $(".main").html(`<div class="col-sm-12">
                            <p class="loginMsg">Parece que você não está logado. <br>Tente <a href="../src/login.html">logar</a>
                            </p>
                        </div>`);
    } else {
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