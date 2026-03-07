package unoeste.fipp.webmovies.restcontrollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import unoeste.fipp.webmovies.entities.Category;
import unoeste.fipp.webmovies.entities.Erro;
import unoeste.fipp.webmovies.entities.Movie;
import unoeste.fipp.webmovies.repositories.CategoryRepository;
import unoeste.fipp.webmovies.repositories.MovieRepository;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("apis")
public class MovieRestController {

    @Autowired
    private MovieRepository movieRepository;
    private CategoryRepository categoryRepository;

    @GetMapping("test")
    public ResponseEntity<Object> test(){
        return ResponseEntity.ok().build();
    }

    @GetMapping("random-movie")
    public ResponseEntity<Object> randomMovie(){
        Movie aux = movieRepository.getMovies().get((int)(Math.random()* movieRepository.getMovies().size()));
        return ResponseEntity.ok().body(aux);
    }
    @GetMapping("get-movie")
    public ResponseEntity<Object> getMovieTitle(@RequestParam(value = "titulo") String titulo){
        Movie aux=null;
        for(Movie m:movieRepository.getMovies()){
            if(m.getTitle().equalsIgnoreCase(titulo))
                aux=m;
            }
        if(aux!=null)
            return ResponseEntity.ok().body(aux);
        else
            return ResponseEntity.badRequest().body(new Erro("Filme não encontrado",""));
    }
    @GetMapping("get-movie/{titulo}")
    public ResponseEntity<Object> getMovieTitlePath(@PathVariable(value = "titulo") String titulo){
        Movie aux=null;
        for(Movie m:movieRepository.getMovies()){
            if(m.getTitle().equalsIgnoreCase(titulo))
                aux=m;
        }
        if(aux!=null)
            return ResponseEntity.ok().body(aux);
        else
            return ResponseEntity.badRequest().body(new Erro("Filme não encontrado",""));
    }
    @PostMapping("add-movie")
    public ResponseEntity<Object> addMovie(@RequestBody Movie movie){
        if(movie.getTitle()==null || movie.getTitle().isEmpty()) {
            return ResponseEntity.badRequest().body(new Erro("Filme sem título",""));
        }
        else {
            movieRepository.getMovies().add(movie);
            return ResponseEntity.ok().body(movie);
        }
    }
    @PostMapping("add-movie-poster")
    public ResponseEntity<Object> addMoviePoster(String titulo, String ano, Category genero, MultipartFile poster){
        if(titulo==null || titulo.isEmpty()) {
            return ResponseEntity.badRequest().body(new Erro("Filme sem título",""));
        }
        else {
            try {
                final String UPLOAD_FOLDER = "src/main/resources/static/posters/";
                String fileName = poster.getOriginalFilename();
                File uploadFolder = new File(UPLOAD_FOLDER);
                if (!uploadFolder.exists()) uploadFolder.mkdir();
                poster.transferTo(new File(uploadFolder.getAbsolutePath() + "\\" + fileName));
                Movie movie=new Movie(titulo,ano,genero);
                movie.setPoster(fileName);
                movieRepository.getMovies().add(movie);
                return ResponseEntity.ok().body(movie);
            }
            catch (Exception e) {
               return ResponseEntity.badRequest().body(new Erro("erro ao gravar o poster",""));
            }
        }
    }
    @GetMapping("list-keyword")
    public ResponseEntity<Object> getMoviesKeyword(@RequestParam(value = "keyword") String keyword){
        List <Movie> auxList=new ArrayList<>();
        for(Movie m:movieRepository.getMovies()){
            if(m.getTitle().toUpperCase().contains(keyword.toUpperCase()))
                auxList.add(m);
        }
        if(!auxList.isEmpty())
            return ResponseEntity.ok().body(auxList);
        else
            return ResponseEntity.badRequest().body(new Erro("Nenhum filme encontrado",""));
    }

    @GetMapping("list-movies")
    public ResponseEntity<Object> getMovies() {
        List<Movie> movies = movieRepository.getMovies();
        return ResponseEntity.ok().body(movies);
    }

    @GetMapping("list-genre/{genero}")
    public ResponseEntity<Object> getListCategory(@PathVariable(value = "genero") String genero){
        List <Movie> auxlist=new ArrayList<>();
        for(Movie m: movieRepository.getMovies()){
            if(m.getCategory().toUpperCase().contains(genero.toUpperCase()))
                auxlist.add(m);
        }
        if(!auxlist.isEmpty())
            return ResponseEntity.ok().body(auxlist);
        else
            return ResponseEntity.badRequest().body(new Erro("Nenhum filme encontrado com esse genero",""));

    }

    @GetMapping("list-year/{anoinicio}/{anofim}")
    public ResponseEntity<Object> getListYear(@PathVariable(value = "anoinicio") int anoinicio, @PathVariable(value = "anofim") int anofim){
        List <Movie> auxlist =new ArrayList<>();
        for(Movie m: movieRepository.getMovies()){
            if(Integer.parseInt(m.getYear()) >= anoinicio && (Integer.parseInt(m.getYear()) <= anofim))
                auxlist.add(m);
        }
        if(!auxlist.isEmpty())
            return ResponseEntity.ok().body(auxlist);
        else
            return ResponseEntity.badRequest().body(new Erro("Nenhum filme se aplica aos filtros", ""));
    }

    @GetMapping("get-generos")
    public ResponseEntity<Object> getCategory(){
        List<Category> categories = categoryRepository.getcategories();
        return ResponseEntity.ok().body(categories);
    }


}
