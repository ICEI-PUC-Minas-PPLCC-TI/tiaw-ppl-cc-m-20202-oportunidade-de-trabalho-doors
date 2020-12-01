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

window.onload = () => {
    prepCabecalho();
}