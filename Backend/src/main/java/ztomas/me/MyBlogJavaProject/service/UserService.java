package ztomas.me.MyBlogJavaProject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import ztomas.me.MyBlogJavaProject.model.Users;
import ztomas.me.MyBlogJavaProject.repository.UserRepo;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    public Users register(@RequestBody Users user) {
         return userRepo.save(user);
    }
}
