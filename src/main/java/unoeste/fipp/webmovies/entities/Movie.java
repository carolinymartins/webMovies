package unoeste.fipp.webmovies.entities;

public class Movie {
    private String title;
    private String year;
    private Category category;
    private String poster;
    private String thumb;

    public Movie(String title, String year, Category category) {
        this.title = title;
        this.year = year;
        this.category = category;
    }

    public String getTitle() {
        return title;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public String getThumb() {
        return thumb;
    }

    public void setThumb(String thumb) {
        this.thumb = thumb;
    }
}
