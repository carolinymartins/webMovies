package unoeste.fipp.webmovies.entities;

public class Category {
    private String id;
    private String nome;

    public Category() {
    }

    public Category(String id, String category) {
        this.id = id;
        this.nome = category;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
