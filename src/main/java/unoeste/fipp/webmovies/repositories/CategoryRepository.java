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
            categories.add(new Category("2", "Romance"));
            categories.add(new Category("3", "Crime"));
            categories.add(new Category("4", "Ação"));
            categories.add(new Category("5", "Musical"));
            categories.add(new Category("6", "Terror"));
            categories.add(new Category("7", "Ficção Científica"));
            categories.add(new Category("8", "Fantasia"));
            categories.add(new Category("9", "Comédia"));
            categories.add(new Category("10", "Thriller"));
        }
        public List<Category> getcategories() {
            return categories;
        }

    public Category findById(String id) {
        for (Category c : categories) {
            if (c.id().equals(id))
                return c;
        }
        return null;
    }

}
