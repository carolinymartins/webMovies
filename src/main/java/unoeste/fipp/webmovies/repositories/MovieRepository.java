package unoeste.fipp.webmovies.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;
import unoeste.fipp.webmovies.entities.Category;
import unoeste.fipp.webmovies.entities.Movie;

import java.util.ArrayList;
import java.util.List;

@Repository
public class MovieRepository {
    private List<Movie> movies = new ArrayList<>();

    public MovieRepository(CategoryRepository categoryRepository) {

        List<Category> categories = categoryRepository.getcategories();
        movies.add(new Movie("Cidadão Kane", "1941", categories.get(0)));
        movies.add(new Movie("Casablanca", "1942", categories.get(1)));
        movies.add(new Movie("O Poderoso Chefão", "1972", categories.get(2)));
        movies.add(new Movie("Os Sete Samurais", "1954", categories.get(3)));
        movies.add(new Movie("A Noviça Rebelde", "1965", categories.get(4)));
        movies.add(new Movie("Psicose", "1960", categories.get(5)));
        movies.add(new Movie("2001: Uma Odisseia no Espaço", "1968", categories.get(6)));
        movies.add(new Movie("A Felicidade Não Se Compra", "1946", categories.get(0)));
        movies.add(new Movie("O Mágico de Oz", "1939", categories.get(7)));
        movies.add(new Movie("Laranja Mecânica", "1971", categories.get(6)));
        movies.add(new Movie("Taxi Driver", "1976", categories.get(0)));
        movies.add(new Movie("O Exorcista", "1973", categories.get(5)));
        movies.add(new Movie("A Lista de Schindler", "1993", categories.get(0)));
        movies.add(new Movie("O Silêncio dos Inocentes", "1991", categories.get(9)));
        movies.add(new Movie("Doutor Jivago", "1965", categories.get(0)));
        movies.add(new Movie("Sangue Negro", "2007", categories.get(0)));
        movies.add(new Movie("O Grande Lebowski", "1998", categories.get(8)));
        movies.add(new Movie("Forrest Gump", "1994", categories.get(0)));
        movies.add(new Movie("Caminhos Perigosos", "1953", categories.get(2)));
        movies.add(new Movie("Encontros e Desencontros", "2003", categories.get(8)));
    }

    public List<Movie> getMovies() {
        return movies;
    }
}
