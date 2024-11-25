package com.kob.backend2.service.impl.user.account;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kob.backend2.mapper.UserMapper;
import com.kob.backend2.pojo.User;
import com.kob.backend2.service.user.account.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RegisterServiceImpl implements RegisterService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public Map<String, String> register(String username, String password, String confirmedPassword) {
        Map<String, String> map = new HashMap<>();
        if(username == null) {
            map.put("error_message", "用户名不能为空");
            return map;
        }

        if(password == null || confirmedPassword == null) {
            map.put("error_message", "密码不能为空");
            return map;
        }

        username = username.trim();
        if(username.isEmpty()) {
            map.put("error_message", "用户名不能为空");
            return map;
        }

        if(password.isEmpty() || confirmedPassword.isEmpty()) {
            map.put("error_message", "密码不能为空");
            return map;
        }

        if(username.length() > 100) {
            map.put("error_message", "密码长度不能大于100");
            return map;
        }

        if(!password.equals(confirmedPassword)) {
            map.put("error_message", "两次密码不一致");
            return map;
        }

        //查询用户名是否重复
        QueryWrapper<User> queryWrapper = new QueryWrapper<User>();
        queryWrapper.eq("username",username);
        List<User> list = userMapper.selectList(queryWrapper);

        if(!list.isEmpty()) {
            map.put("error_message", "该用户名已注册");
            return map;
        }

        //添加一个新用户
        String encodedPassword = passwordEncoder.encode(password);
        String photo = "https://cdn.acwing.com/media/user/profile/photo/226051_lg_c10496e638.jpg";
        User user = new User(null, username, encodedPassword, photo, 1500);

        userMapper.insert(user);

        map.put("error_message", "success");
        return map;
    }
}



















