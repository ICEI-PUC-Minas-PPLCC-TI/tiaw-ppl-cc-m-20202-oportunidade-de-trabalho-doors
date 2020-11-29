const pageID = window.location.href.split("?id=")[1];
const urlVagas = "https://tiawdoors-api.herokuapp.com/Vagas";
var vagas = [];

function mainText (desc, requis, ben, sal, cat)
{
    let box =`${desc}<br>
    <strong>Requisitos:</strong> ${requis}
    <br><strong>Beneficios:</strong> ${ben}
    <br><strong>Salário:</strong>${sal}
    <br><strong>Categoria:</strong>${cat} `;
    return box;
}

function getData(id) {
    $.ajax({
        url: urlVagas + "?id=" +id,
    })
        .done(function (data) {
            vagas = data;
            console.log(vagas);
            loadVaga();
        });
}

function loadVaga()
{
    $("#title").html(vagas[0].title);
    $(".imgDivul").attr("src", vagas[0].img);
    $("#corpo").html(mainText(vagas[0].desc, vagas[0].requis, vagas[0].ben, vagas[0].sal, vagas[0].cat));
}

window.onload = () => {
    getData(pageID);
}