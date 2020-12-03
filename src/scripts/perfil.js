var accountType;
var accountId;
const url = "https://tiawdoors-api.herokuapp.com/";
var personalInfo = [];
var myVagas = [];

function perfil(id, username, n, email, desc, t) {
    this.userid = id;
    this.username = username;
    this.nome = n;
    this.email = email;
    this.desc = desc;
    this.tipo = t;
}

function newsFeedBox(img, title, desc, ben, requis, sal, cat, ownerId) {
    this.img = img;
    this.title = title;
    this.desc = desc;
    this.ben = ben;
    this.requis = requis;
    this.sal = sal;
    this.cat = cat;
    this.ownerID = ownerId;
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

function Desconect() {
    localStorage.setItem("statusLogin", "0");
    sessionStorage.setItem("statusLogin", "0");
    localStorage.setItem("userId", "0");
    sessionStorage.setItem("userId", "0");
    location = location;
}

function getData() {
    $.ajax({
        url: url + accountType + '?userid=' + accountId,
    })
        .done(function (data) {
            personalInfo = data;
            montarPerfil();
            (accountType == "userdata") ? opcoesComun() : opcoesEmpr();
        });
}

function opcoesEmpr() {
    $("#opcoes").html(` <span onclick="infoUser()">Editar informações</span><br>
                        <span onclick="addVaga()">Adicionar vagas</span><br>
                        <span onclick="getVaga()">Minhas vagas</span><br>
                        <span onclick="editLog()">Editar login</span>`);
}

function opcoesComun() {
    $("#opcoes").html(` <span onclick="infoUser()">Editar informações</span><br>
                        <span onclick="editLog()">Editar login</span>`);
}

function addVaga() {
    $("#profile").html(`<form id="register" method="post" class="formulario col-12">
    <div class="row">
        <h1>Formulário de Vagas</h1>
        <div class="col-12">
        <span id="instrucoes"></span>
            <p>
                <label for="titleForm">Titulo:</label>
                <input type="text" id="titleForm" name="titleForm" autocomplete="off"
                    placeholder="Breve descrição..." />
            </p>
        </div>
        <div class="col-12">
            <p>
                <label for="descForm">Descrição:</label>
                <textarea id="descForm" name="descForm" placeholder="Descrição detalhada da vaga..."></textarea>
            </p>
        </div>
        <div class="col-12 col-lg-6">
            <p>
                <label for="benForm">Benefícios:</label>
                <textarea id="benForm" name="benForm" placeholder="Benefícios ofertados.."></textarea>
            </p>
        </div>
        <div class="col-12 col-lg-6">
            <p>
                <label for="requisForm">Requisitos:</label>
                <textarea id="requisForm" name="requisForm" placeholder="Requisitos mínimos.."></textarea>
            </p>
        </div>
        <div class="col-12 col-lg-6">
            <p>
                <label for="imgForm">Imagem:</label>
                <input type="text" id="imgForm" name="imgForm" autocomplete="off"
                    placeholder="Link para foto..." />
            </p>
        </div>
        <div class="col-12 col-lg-6">
            <p>
                <label for="salForm">Salário ofertado:</label>
                <input type="text" id="salForm" name="salForm" autocomplete="off" />
            </p>
        </div>
        <div class="col-12 col-lg-6">
            <p>
                <label for="catForm">Categorias:</label>
                <select id="catForm" name="filtro">
                    <option value=""></option>
                    <option value="Engenharia de produção">Engenharia de produção</option>
                    <option value="Jornalismo">Jornalismo</option>
                    <option value="Direito">Direito</option>
                    <option value="Letras">Letras</option>
                    <option value="Ciência da Computação">Ciência da Computação</option>
                    <option value="Administração">Administração</option>
                </select>
            </p>
        </div>
    </div>

    <button type="button" class="btn btn-success" onclick="postVaga()">Salvar</button>
</form>`);
}

function getVaga() {
    $.ajax({
        url: url + "Vagas?ownerID=" + accountId,
    })
        .done(function (data) {
            myVagas = data;
            let box = `<div class= "col-12">`;
            for (i = 0; i < myVagas.length; i++) {
                box += `<li><span>${myVagas[i].title}</span>
                <i class="fas fa-edit" onclick="editVaga(${i})"></i>
                <i class="fas fa-trash" onclick="deleteVaga(${myVagas[i].id})"></i>
                </li>`;
            }
            box += `</div>`;
            $("#profile").html(box);
        });
}

function editVaga(index) {
    $("#profile").html(`<form id="register" method="post" class="formulario col-12">
    <div class="row">
        <h3>Editar a vaga</h3>
        <div class="col-12">
        <span id="instrucoes"></span>
            <p>
                <label for="titleForm">Titulo:</label>
                <input type="text" id="titleForm" name="titleForm" autocomplete="off"
                    placeholder="${myVagas[index].title}" />
            </p>
        </div>
        <div class="col-12">
            <p>
                <label for="descForm">Descrição:</label>
                <textarea id="descForm" name="descForm">${myVagas[index].desc}</textarea>
            </p>
        </div>
        <div class="col-12 col-lg-6">
            <p>
                <label for="benForm">Benefícios:</label>
                <textarea id="benForm" name="benForm"> ${myVagas[index].ben}</textarea>
            </p>
        </div>
        <div class="col-12 col-lg-6">
            <p>
                <label for="requisForm">Requisitos:</label>
                <textarea id="requisForm" name="requisForm" > ${myVagas[index].requis}</textarea>
            </p>
        </div>
        <div class="col-12 col-lg-6">
            <p>
                <label for="imgForm">Imagem:</label>
                <input type="text" id="imgForm" name="imgForm" autocomplete="off"
                    placeholder=" ${myVagas[index].img}" />
            </p>
        </div>
        <div class="col-12 col-lg-6">
            <p>
                <label for="salForm">Salário ofertado:</label>
                <input type="text" id="salForm" name="salForm" autocomplete="off"
                placeholder=" ${myVagas[index].sal}" />
            </p>
        </div>
        <div class="col-12 col-lg-6">
            <p>
                <label for="catForm">Categorias:</label>
                <select id="catForm" name="filtro">
                    <option value=""></option>
                    <option value="Engenharia de produção">Engenharia de produção</option>
                    <option value="Jornalismo">Jornalismo</option>
                    <option value="Direito">Direito</option>
                    <option value="Letras">Letras</option>
                    <option value="Ciência da Computação">Ciência da Computação</option>
                    <option value="Administração">Administração</option>
                </select>
            </p>
        </div>
    </div>

    <button type="button" class="btn btn-success" onclick="putVaga(${myVagas[index].id}, ${index})">Salvar</button>
</form>`);
}

function putVaga(id, index) {
    let info = new newsFeedBox(imgForm.value, titleForm.value, descForm.value, benForm.value,
        requisForm.value, salForm.value, catForm.value, personalInfo[0].userid);
    
    if(info.cat.length <= 0)
        info.cat = myVagas[index].cat;
    if(info.img.length <= 0)
        info.img = myVagas[index].img;
    if(info.sal.length <= 0)
        info.sal = myVagas[index].sal;
    if(info.title.length <= 0)
        info.title = myVagas[index].title;

    instrucoes.innerHTML = "";
    instrucoes.classList.remove("erro");
    console.log(info);

    $.ajax({
        url: url + "Vagas/" +id,
        type: 'put',
        data: info
    }).done(() => {
        location = location;
    });

}

function deleteVaga(id){
    $.ajax({
        url: url + "Vagas/" +id,
        type: 'DELETE',
    }).done(() => {
        location = location;
    });
}

function postVaga() {
    if (imgForm.value.length == 0 ||
        titleForm.value.length == 0 ||
        descForm.value.length == 0 ||
        requisForm.value.length == 0 ||
        benForm.value.length == 0 ||
        salForm.value.length == 0 ||
        catForm.value.length == 0) {

        instrucoes.classList.add("erro");
        instrucoes.innerHTML = "Prença todos os campos";
        console.log("erro");
    } else {

        let info = new newsFeedBox(imgForm.value, titleForm.value, descForm.value, benForm.value,
            requisForm.value, salForm.value, catForm.value, personalInfo[0].userid);
        instrucoes.innerHTML = "";
        instrucoes.classList.remove("erro");

        $.ajax({
            url: url + "Vagas",
            type: 'POST',
            data: info
        }).done(() => {
            location = location;
        });
    }
}

function infoUser() {
    $("#profile").html(`<div class="col-12 col-md-6">
                                <label for="nomeUser">Nome:</label>
                                <input type="text" id="nomeUser" name="titleForm" autocomplete="off"
                                    placeholder="${personalInfo[0].nome}" />
                        </div>
                        <div class="col-12 col-md-6">
                                <label for="emailUser">E-mail:</label>
                                <input type="text" id="emailUser" name="titleForm" autocomplete="off"
                                    placeholder="${personalInfo[0].email}" />
                        </div>
                        <div class="col-12">
                                <label for="descUser">${(accountType == "userdata") ? "Curriculo" : "Sobre a empresa"}:</label>
                                <textarea id="descUser" name="requisForm" placeholder="">${personalInfo[0].desc}</textarea>
                        </div>
                        <button type="button" class="btn btn-success" onclick="postUserdata()">Salvar</button>`
    );
}

function postUserdata() {
    if ($("#nomeUser").val().length > 0) {
        personalInfo[0].nome = $("#nomeUser").val();
    }
    if ($("#emailUser").val().length > 0) {
        personalInfo[0].email = $("#emailUser").val();
    }

    personalInfo[0].desc = $("#descUser").val();

    let content = new perfil(personalInfo[0].userid, personalInfo[0].username, personalInfo[0].nome, personalInfo[0].email,
        personalInfo[0].desc, personalInfo[0].tipo);

    $.ajax({
        url: url + accountType + "/" + personalInfo[0].id,
        type: 'PUT',
        data: content
    }).done(() => {
        location = location;
    });

}

function editLog() {
    $("#profile").html(`<span id="instrucoes"></span>
                        <div class="col-12">
                            <label for="username">Username:</label>
                            <input type="text" id="username" name="titleForm" autocomplete="off"
                                placeholder="${personalInfo[0].username}" />
                        </div>
                        <div class="col-12">
                            <label for="password">Senha:</label>
                            <input type="password" id="password" name="titleForm"/>
                        </div>
                        <div class="col-12">
                            <label for="passConf">Confirmar senha:</label>
                            <input type="password" id="passConf" name="titleForm" />
                        </div>
                        <button type="button" class="btn btn-success" onclick="postUsername()">Salvar</button>`
    );
}

function postUsername() {
    if ($("#username").val() == "") {
        $("#instrucoes").addClass("erro");
        $("#instrucoes").text("Preencha o campo de usuário");
    }
    else if ($("#password").val() == "") {
        $("#instrucoes").addClass("erro");
        $("#instrucoes").text("Preencha o campo de senha");
    } else if ($("#passConf").val() == "") {
        $("#instrucoes").addClass("erro");
        $("#instrucoes").text("Confirme a senha");
    } else if ($("#password").val() != $("#passConf").val()) {
        $("#instrucoes").addClass("erro");
        $("#instrucoes").text("Senhas não compatíveis");
    }
    else {
        $("#instrucoes").removeClass("erro");
        $("#instrucoes").text("");

        personalInfo[0].username = $("#username").val();

        $.ajax({
            url: url + "user?username=" + personalInfo[0].username,
        }).done(function (data) {
            if (data.length != 0) {
                $("#instrucoes").addClass("erro");
                $("#instrucoes").text("Nome de usuário já utilizado");
            } else {
                let content = `{"username": "${personalInfo[0].username}",
                    "password": "${$("#password").val()}",
                    "type": "${personalInfo[0].tipo}"}`;
                $.ajax({
                    type: "PUT",
                    url: url + "user/" + personalInfo[0].userid,
                    data: JSON.parse(content)
                }).done(() => {
                    content = new perfil(personalInfo[0].userid, personalInfo[0].username, personalInfo[0].nome, personalInfo[0].email,
                        personalInfo[0].desc, personalInfo[0].tipo);
                    $.ajax({
                        url: url + accountType + "/" + personalInfo[0].id,
                        type: 'PUT',
                        data: content
                    }).done(() => {
                        location = location;
                    });
                });
            }
        });
    }
}

function montarPerfil() {
    let tipo = "Usuário ";
    if (accountType == "userdata") {
        tipo += "Comum";
    } else { tipo += "Empresarial"; }

    $("#nome").html(personalInfo[0].nome);
    $("#profile").html(personalInfo[0].desc);
    $("#type").html(tipo);
}

window.onload = () => {
    let valid = true;
    prepCabecalho();
    if (localStorage.getItem("statusLogin") != 1 && localStorage.getItem("statusLogin") != 2) {
        if (sessionStorage.getItem("statusLogin") != 1 && sessionStorage.getItem("statusLogin") != 2) {
            $(".profile").html(`<div class="col-sm-12">
            <p class="loginMsg">Parece que você não está logado. <br>Tente <a href="../src/login.html">logar</a>
            </p>
            </div>`);
            valid = false;
        } else {
            accountType = sessionStorage.getItem("statusLogin");
            accountId = sessionStorage.getItem("userId");
        }
    } else {
        accountType = localStorage.getItem("statusLogin");
        accountId = localStorage.getItem("userId");
    }

    if (valid) {
        if (accountType == 2) {
            accountType = "empredata";
        } else { accountType = "userdata"; }

        getData();
    }

}