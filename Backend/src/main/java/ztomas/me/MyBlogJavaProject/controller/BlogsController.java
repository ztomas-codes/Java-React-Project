package ztomas.me.MyBlogJavaProject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ztomas.me.MyBlogJavaProject.model.BlogModels.Article;
import ztomas.me.MyBlogJavaProject.model.UserPrincipal;
import ztomas.me.MyBlogJavaProject.service.ArticleService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class BlogsController {

    @Autowired
    ArticleService articleService;

    @GetMapping("/blogs")
    public List<Article> list() {
        return articleService.getAllArticles();
    }

    @PostMapping("/blogs/new")
    public Article addArticle(@AuthenticationPrincipal UserPrincipal principal, @RequestBody Article article) {
        return articleService.addArticle(article, principal.getUser());
    }

}
