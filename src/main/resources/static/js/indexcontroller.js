function carregarFilmeAleatorio(){
   //alert("Carregando filme aleatório");
   const filmeSugerido=document.getElementById("filme-sugerido");
   fetch("http://localhost:8080/apis/random-movie")
       .then(response => response.json()
           .then(movie => {
              filmeSugerido.innerHTML=`Assista ainda hoje o filme ${movie.title}, lançado em ${movie.year}`;
       }))
       .catch(error => {filmeSugerido.innerHTML=error;})

   //filmeSugerido.innerHTML="Titanic";
   //fetch api
   //ajax
   //jquery
   //axios
}