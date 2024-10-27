package ztomas.me.MyBlogJavaProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ztomas.me.MyBlogJavaProject.model.BlogModels.Category;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Integer> {
}
