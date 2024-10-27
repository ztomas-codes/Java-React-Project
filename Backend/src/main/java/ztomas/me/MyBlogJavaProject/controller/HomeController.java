package ztomas.me.MyBlogJavaProject.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String greet(HttpServletRequest request) {
        System.out.println(request);
        return request.getSession().getId();
    }
}
