function cadastrarFilmePoster(){
    const fuser = document.forms[0];
    fetch("http://localhost:8080/apis/add-movie-poster",
        { method: 'POST', body: new FormData(fuser)})
        .then(response=>response.json())
        .then(json=>{
            alert("filme "+json.title+" cadastrado com sucesso!");
            fuser.reset();
        })
        .catch(error=> alert("Problemas ao cadastrar o filme"))
}
function cadastrarFilme(){
    const formMovie=document.forms[0];
    if(formMovie.titulo.value.length==0){
        alert("Preencha todos os campos");
    }
    else{
        const movie={};//new Object();
        movie.title=formMovie.titulo.value;
        movie.year=formMovie.ano.value;
        movie.category=formMovie.genero.value;
        //alert(JSON.stringify(movie));
        if(enviarFilme(JSON.stringify(movie))) {
            formMovie.reset();
        }
        //formMovie.reset();
    }
}
function enviarFilme(filme){
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: filme
    };
    fetch("http://localhost:8080/apis/add-movie", requestOptions)
    .then(response => response.json())
        .then(json => {
           alert("filme "+json.title+" cadastrado com sucesso!");
           return true;
        })
    .catch(error => {
        alert("Problemas ao cadastrar o filme");
        return false;
    })
}