package ztomas.me.MyBlogJavaProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ztomas.me.MyBlogJavaProject.model.BlogModels.Article;

public interface ArticleRepo extends JpaRepository<Article, Integer> {
}
