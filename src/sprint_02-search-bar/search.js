onload = function() {

    let filtro = document.getElementById('filter');
    let tabela = document.getElementById('list');

    filtro.onkeyup = function() {

        let nomeFiltro = filtro.value;

        for (let g = 1; g < tabela.rows.length; g++) {
            let conteudoCelula = tabela.rows[g].cells[0].innerText;
            let corresponde = conteudoCelula.toLowerCase().indexOf(nomeFiltro) >= 0;
            tabela.rows[g].style.display = corresponde ? '' : 'none';
        }
    };

}