const urlUser = "https://tiawdoors-api.herokuapp.com/user";

function perfil(id, username, n, email, desc, t) {
    this.userid = id;
    this.username = username;
    this.nome = n;
    this.email = email;
    this.desc = desc;
    this.tipo = t;
}

function getUser(userName, senha) {
    $.ajax({
        url: urlUser + "?username=" + userName,
    })
        .done(function (data) {
            if (data.length == 0) {
                $("#instrucoes").addClass("erro");
                $("#instrucoes").text("Usuário não encontrado");
            } else {
                if (data[0].password == senha) {
                    if (document.getElementById('inputRemember').checked) {
                        localStorage.setItem("statusLogin", data[0].type);
                        localStorage.setItem("userId", data[0].id);
                    } else {
                        sessionStorage.setItem("statusLogin", data[0].type);
                        sessionStorage.setItem("userId", data[0].id);
                    }

                    window.location.replace("../src/feed.html");
                } else {
                    $("#instrucoes").addClass("erro");
                    $("#instrucoes").text("Senha ou usuário errados");
                }
            }
        });
}

function registerUser(userName, senha, empresarial) {
    let type = empresarial ? "2" : "1";
    let userType = empresarial ? "empredata" : "userdata";
    console.log(userType);

    let content = `{"username": "${userName}",
                    "password": "${senha}",
                    "type": "${type}"}`;

    $.ajax({
        url: urlUser + "?username=" + userName,
    }).done(function (data) {
        if (data.length != 0) {
            $("#instrucoes").addClass("erro");
            $("#instrucoes").text("Nome de usuário já utilizado");
        } else {
            $.ajax({
                type: "POST",
                url: urlUser,
                data: JSON.parse(content)
            }).done( function (data)
            {
                if (document.getElementById('inputRemember').checked) {
                    localStorage.setItem("statusLogin", data.type);
                    localStorage.setItem("userId", data.id);
                } else {
                    sessionStorage.setItem("statusLogin", data.type);
                    sessionStorage.setItem("userId", data.id);
                }
                let conta = new perfil (data.id, userName, "Nome não definido",
                "Email não definido", "Descrição não definida", data.type);
                $.ajax({
                    type: "POST",
                    url: "https://tiawdoors-api.herokuapp.com/" + userType ,
                    data: conta
                }).done((data) => {
                    console.log(data);
                });
                window.location.replace("../src/feed.html")
            });
        }
    });

}

function loginForm()
{
    box = ` <div class="card-header">
                <h3>Logar</h3>
            </div>
            <div class="card-body">
                <span id="instrucoes"></span>
                <div class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                    </div>
                    <input type="text" class="form-control" placeholder="Usuário" id="inputUser" >
                </div>
                <div class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-key"></i></span>
                    </div>
                    <input type="password" class="form-control" placeholder="Senha" id="inputPassword">
                </div>
                <div class="row align-items-center remember">
                    <input type="checkbox" id="inputRemember">Lembrar de mim
                </div>
                <div class="form-group">
                    <button id="btnLogin" class="btn float-right login_btn">Login</button>
                </div>
            </div>
            <div class="card-footer">
                <div class="d-flex justify-content-center links">
                    Não tem uma conta?<a onclick="register()">Criar conta</a>
                </div>
            </div>`;

    $("#logArea").html(box);
    $("#btnLogin").click(() => {
        if ($("#inputUser").val() == "") {
            $("#instrucoes").addClass("erro");
            $("#instrucoes").text("Preencha o campo de usuário");
        }
        else if ($("#inputPassword").val() == "") {
            $("#instrucoes").addClass("erro");
            $("#instrucoes").text("Preencha o campo de senha");
        }
        else {
            $("#instrucoes").removeClass("erro");
            $("#instrucoes").text("");
            getUser($("#inputUser").val(), $("#inputPassword").val());
        }

    });
}

function register() {
    box = `   <div class="card-header">
            <h3><i class="fas fa-chevron-left" onclick="loginForm()"></i>Registrar</h3>
        </div>
        <div class="card-body">
            <span id="instrucoes"></span>
            <div class="input-group form-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                </div>
                <input type="text" class="form-control" placeholder="Usuário" id="inputUser" >
            </div>
            <div class="input-group form-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-key"></i></span>
                </div>
                <input type="password" class="form-control" placeholder="Senha" id="inputPassword">
            </div>
            <div class="input-group form-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-key"></i></span>
                </div>
                <input type="password" class="form-control" placeholder="Confirmar a senha" id="inputConfPass">
            </div>
            <div class="row align-items-center remember">
                <input type="checkbox" id="inputEmp">Sou empresarial
            </div>
            <div class="row align-items-center remember">
                <input type="checkbox" id="inputRemember">Lembrar de mim
            </div>
            <div class="form-group">
                <button id="btnRegistrar" class="btn float-right login_btn">Registrar</button>
            </div>
        </div>`;

    $("#logArea").html(box);

    $("#btnRegistrar").click(() => {
        if ($("#inputUser").val() == "") {
            $("#instrucoes").addClass("erro");
            $("#instrucoes").text("Preencha o campo de usuário");
        }
        else if ($("#inputPassword").val() == "") {
            $("#instrucoes").addClass("erro");
            $("#instrucoes").text("Preencha o campo de senha");
        } else if ($("#inputConfPass").val() == "") {
            $("#instrucoes").addClass("erro");
            $("#instrucoes").text("Confirme a senha");
        } else if ($("#inputPassword").val() != $("#inputConfPass").val()) {
            $("#instrucoes").addClass("erro");
            $("#instrucoes").text("Senhas não compatíveis");
        }
        else {
            $("#instrucoes").removeClass("erro");
            $("#instrucoes").text("");
            registerUser($("#inputUser").val(), $("#inputPassword").val(), document.getElementById('inputEmp').checked);
        }
    });
}

window.onload = () => {
    //localStorage.setItem("statusLogin", "0");
    if (localStorage.getItem("statusLogin") == 1 ||
        localStorage.getItem("statusLogin") == 2) 
    {
        window.location.replace("../src/feed.html");
    } else if(sessionStorage.getItem("statusLogin") == 1 ||
                sessionStorage.getItem("statusLogin") == 2){
        window.location.replace("../src/feed.html");
    }
    else {
        $("#btnLogin").click(() => {
            if ($("#inputUser").val() == "") {
                $("#instrucoes").addClass("erro");
                $("#instrucoes").text("Preencha o campo de usuário");
            }
            else if ($("#inputPassword").val() == "") {
                $("#instrucoes").addClass("erro");
                $("#instrucoes").text("Preencha o campo de senha");
            }
            else {
                $("#instrucoes").removeClass("erro");
                $("#instrucoes").text("");
                getUser($("#inputUser").val(), $("#inputPassword").val());
            }

        });
    }
}