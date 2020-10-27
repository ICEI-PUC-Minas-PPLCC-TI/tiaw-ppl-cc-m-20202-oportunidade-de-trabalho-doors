function newsFeedBox(img, title, desc, ben, requis, sal) {
    this.img = img;
    this.title = title;
    this.desc = desc;
    this.ben = ben;
    this.requis = requis;
    this.sal = sal;
}

let vagas = [];

//Garantir que hajam vagas ficticias postadas 
if (localStorage.getItem('Vagas') === null) {
    localStorage.setItem('Vagas', `[{"img":"https://picsum.photos/id/1/200","title":"Procura-se estagiário de desenvolvimento","desc":"Procura-se estagiário URGENTEMENTE, que tenha experiência com HTML5, CSS3, Javascript e, que preferencialmente.","ben":"Vaga de estacionamento na empresa, auxílio transporte.","requis":"Preferencialmente já esteja no terceiro período ou períodos subsequentes","sal":"A discutir"},{"img":"https://picsum.photos/id/348/200","title":"Estágio em recurso humanos","desc":"Precisamos de um estagiário para aumentar o controle interno do shopping. Com as mudanças de logística trazidas pela pandemia tivemos que atualizar nosso sistema, portanto o quão antes o candidato puder começar melhor","ben":"Vale transporte, vale alimentação e plano de saúde Unimed","requis":"Estar cursando adminsitração","sal":"R$1000,00"},{"img":"https://picsum.photos/id/297/200","title":"Estágio em engenharia de produção","desc":"Somos uma empresa consolidada na área de produção de calçados. Estamos interessado em um estagiário que esteja disponível para começar no próximo mês e que tenha interesse na área de otimização da linha de produção.","ben":"Refeições cobertas pela empresa. Auxílio transporte. Desconto em abastecimento no posto perto da fábrica.","requis":"Estar entre o 4° e 8° período do curso de engenharia de produção, automação ou mecânica.","sal":"R$800,00"}]`);
} else {
    console.log("local storage preenchido");
}

vagas = JSON.parse(localStorage.getItem("Vagas"));

window.onload = () => {

    for (x = vagas.length - 1; x >= 0; x--) {
        let newsFeed = document.getElementById('newsFeed');

        let box = `<div class="card mb-3 col-12">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img src="${vagas[x].img}" class="card-img" alt="Imagem da Vaga">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">${vagas[x].title}</h5>
                                        <p class="card-text">${vagas[x].desc}
                                        <br><strong>Requisitos:</strong> ${vagas[x].requis}
                                        <br><strong>Beneficios:</strong> ${vagas[x].ben}
                                        <br><strong>Salário:</strong> ${vagas[x].sal}
                                        </p>
                                        <a href="">Ver mais</a>
                                    </div>
                                </div>
                            </div>
                        </div>`;

        newsFeed.innerHTML += box;
    }

    register.onsubmit = (e) => {

        if (imgForm.value.length == 0 ||
            titleForm.value.length == 0 ||
            descForm.value.length == 0 ||
            requisForm.value.length == 0 ||
            benForm.value.length == 0 ||
            salForm.value.length == 0) {

            instrucoes.classList.add("erro");
            instrucoes.innerHTML = "Prença todos os campos";
            console.log("erro");
        } else {

            let info = new newsFeedBox(imgForm.value, titleForm.value, descForm.value, benForm.value,
                requisForm.value, salForm.value);

            vagas[vagas.length] = info;
            instrucoes.innerHTML = "";
            instrucoes.classList.remove("erro");

            localStorage.setItem('Vagas', JSON.stringify(vagas));

            newsFeed = document.getElementById('newsFeed');

            box = `<div class="card mb-3 col-12">
                                <div class="row no-gutters">
                                    <div class="col-md-4">
                                        <img src="${vagas[vagas.length - 1].img}" class="card-img" alt="Imagem da Vaga">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title">${vagas[vagas.length - 1].title}</h5>
                                            <p class="card-text">${vagas[vagas.length - 1].desc}
                                            <br><strong>Requisitos:</strong> ${vagas[vagas.length - 1].requis}
                                            <br><strong>Beneficios:</strong> ${vagas[vagas.length - 1].ben}
                                            <br><strong>Salário:</strong> ${vagas[vagas.length - 1].sal}
                                            </p>
                                            <a href="">Ver mais</a></div>
                                    </div>
                                </div>
                            </div>`;

            newsFeed.innerHTML += box;

            imgForm.value = "";
            titleForm.value = "";
            descForm.value = "";
            requisForm.value = "";
            benForm.value = "";
            salForm.value = "";
        }
        e.preventDefault();
    }

}