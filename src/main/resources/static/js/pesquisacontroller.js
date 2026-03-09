function pesquisarFilmesKW(){
    const keyword=document.getElementById('keyword').value;
    const resultado=document.getElementById('resultado');
    fetch("http://localhost:8080/apis/list-keyword?keyword="+keyword)
        .then(response => {
            if(response.status===200) {
                return response.json()
                    .then(json => {
                        resultado.innerHTML = gerarLinhas(json);
                    });
            }
            else{alert("Não há resultados");}
        })
        .catch(error => {resultado.innerHTML=error})
}
function gerarLinhas(jsonList) {
    if (!jsonList || jsonList.length === 0) {
        return '<tr><td colspan="4">Nenhum filme encontrado</td></tr>';
    }

    let dados = "";
    for (let movie of jsonList) {
        const tdImagem = movie.thumb
            ? `<td>
                 <a href="/posters/${movie.poster}" target="_blank">
                   <img src="/thumbs/${movie.thumb}" style="width:50px; height:auto; border-radius:4px; border: 1px solid #ddd;">
                 </a>
               </td>`
            : `<td>Sem imagem</td>`;

        dados += `<tr>
                    <td>${movie.title}</td>
                    <td>${movie.year}</td>
                    <td>${movie.category?.nome}</td>
                    ${tdImagem}
                  </tr>`;
    }
    return dados;
}

function pesquisarFilmesGenero(){
    const genero=document.getElementById('genero').value;
    const resultado =document.getElementById('resultado');
    fetch("http://localhost:8080/apis/list-genre/"+genero)
        .then(response =>{
            if(response.status ===200){
                return response.json()
                    .then(json =>{
                        resultado.innerHTML=gerarLinhas(json);
                    });
            }
            else{alert("Não há resultados");}
    })
        .catch(error =>{resultado.innerHTML=error})

}

function pesquisarFilmesAno(){
    const anoInicio=document.getElementById('anoInicio').value;
    const anoFim=document.getElementById('anoFim').value;
    const resultado =document.getElementById('resultado');
    fetch(`http://localhost:8080/apis/list-year/${anoInicio}/${anoFim}`)
        .then(response =>{
            if(response.status ===200){
                return response.json()
                    .then(json =>{
                        resultado.innerHTML=gerarLinhas(json);
                    });
            }
            else{alert("Não há resultados");}
        })
        .catch(error =>{resultado.innerHTML=error})

}