package com.kob.backend.controller.user;

import com.kob.backend.mapper.UserMapper;
import com.kob.backend.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    UserMapper userMapper;


    @GetMapping("/user/all/")
    public List<User> getAll(){
        return userMapper.selectList(null);
    }

    @GetMapping("/user/{userid}/")
    public User getUser(@PathVariable int userid){
        return userMapper.selectById(userid);
    }

    @GetMapping("/user/add/{userid}/{username}/{password}/")
    public String addUser(
            @PathVariable int userid,
            @PathVariable String username,
            @PathVariable String password){
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(password);
        User user = new User(userid, username, encodedPassword);
        userMapper.insert(user);
        return "add user successfully!";
    }

    @GetMapping("/user/delete/{userid}/")
    public String deleteUser(@PathVariable int userid){
        userMapper.deleteById(userid);
        return "delete user successfully!";
    }
}
