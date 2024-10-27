package ztomas.me.MyBlogJavaProject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ztomas.me.MyBlogJavaProject.model.Users;
import ztomas.me.MyBlogJavaProject.service.UserService;

@RestController
public class UserController {

    @Autowired
    UserService service;

    @PostMapping("/register")
    public Users register(@RequestBody Users user) {
        user.setPwd(
                new BCryptPasswordEncoder(10).encode(user.getPwd())
        );
        return service.register(user);
    }
}
