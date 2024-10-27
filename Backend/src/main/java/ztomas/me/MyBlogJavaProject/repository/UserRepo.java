package ztomas.me.MyBlogJavaProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ztomas.me.MyBlogJavaProject.model.Users;
@Repository
public interface UserRepo extends JpaRepository<Users, Integer> {

   Users findByUsername(String username);

}
