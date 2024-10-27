package ztomas.me.MyBlogJavaProject.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import ztomas.me.MyBlogJavaProject.model.BlogModels.Article;

import java.util.List;

@Entity(name = "users")
@AllArgsConstructor
public class Users {


    @JsonIgnore
    @Id
    private int id;
    private String username;

    @JsonIgnore
    private String pwd;

    @OneToMany(mappedBy = "user")
    private List<Article> articles;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String user) {
        this.username = user;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }
}
