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
    let dados="";
    for(let movie of jsonList){
        dados += `<tr><td>${movie.title}</td><td>${movie.year}</td><td>${movie.category.nome}</td><td><a href="http://localhost:8080/posters/${movie.poster}">ver poster</a></td></tr>`
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