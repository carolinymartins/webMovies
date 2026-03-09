function filtrarFilmes() {
    const filtro = document.getElementById('filtros').value;

    document.getElementById('secao-titulo').style.display = 'none';
    document.getElementById('secao-genero').style.display = 'none';
    document.getElementById('secao-ano').style.display = 'none';

    if (filtro === 'titulo') document.getElementById('secao-titulo').style.display = 'block';
    if (filtro === 'genero') {
        document.getElementById('secao-genero').style.display = 'block';
        carregaGenero();
    }
    if (filtro === 'ano') document.getElementById('secao-ano').style.display = 'block';
}

function carregaGenero() {
    fetch("http://localhost:8080/apis/get-generos")
        .then(response => response.json())
        .then(json => {
            const select = document.getElementById('genero');
            select.innerHTML = '<option value="">Selecione um gênero</option>';
            for (let cat of json) {
                select.innerHTML += `<option value="${cat.id}">${cat.nome}</option>`;
            }
        });
}
