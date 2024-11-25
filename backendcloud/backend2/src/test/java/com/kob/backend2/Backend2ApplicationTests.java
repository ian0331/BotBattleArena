package com.kob.backend2;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
class Backend2ApplicationTests {

    @Test
    void contextLoads() {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        System.out.println(passwordEncoder.encode("pwuya"));
        System.out.println(passwordEncoder.encode("pa"));
        System.out.println(passwordEncoder.encode("pb"));
        System.out.println(passwordEncoder.encode("pc"));
        System.out.println(passwordEncoder.encode("pd"));
    }

}
