package ztomas.me.MyBlogJavaProject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ztomas.me.MyBlogJavaProject.model.BlogModels.Article;
import ztomas.me.MyBlogJavaProject.model.Users;
import ztomas.me.MyBlogJavaProject.repository.ArticleRepo;

import java.util.Date;
import java.util.List;

@Service
public class ArticleService {

    @Autowired
    ArticleRepo articleRepo;

    public List<Article> getAllArticles() {
        List<Article> articles = articleRepo.findAll();
        return articles.stream().filter(article -> article.isVisibility()).toList();
    }

    public Article addArticle(Article article, Users user) {
        article.setUser(user);
        article.setDate(new Date());
        return articleRepo.save(article);
    }
}
