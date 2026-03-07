package unoeste.fipp.webmovies.repositories;

import org.springframework.stereotype.Repository;
import unoeste.fipp.webmovies.entities.Category;
import unoeste.fipp.webmovies.entities.Movie;

import java.util.ArrayList;
import java.util.List;

@Repository
public class CategoryRepository {
        private List<Category> categories = new ArrayList<>();

        public CategoryRepository() {
            categories.add(new Category("1", "Drama"));
            categories.add(new Category("2", "Ação"));
            categories.add(new Category("3", "Comédia"));
            categories.add(new Category("4", "Terror"));
            categories.add(new Category("5", "Romance"));
            categories.add(new Category("6", "Ficção Científica"));
            categories.add(new Category("7", "Aventura"));
            categories.add(new Category("8", "Animação"));
            categories.add(new Category("9", "Documentário"));
            categories.add(new Category("10", "Fantasia"));
            categories.add(new Category("11", "Mistério"));
            categories.add(new Category("12", "Musical"));
        }
        public List<Category> getcategories() {
            return categories;
        }
}
