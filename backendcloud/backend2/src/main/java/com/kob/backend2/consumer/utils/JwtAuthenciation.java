package com.kob.backend2.consumer.utils;

import com.kob.backend2.utils.JwtUtil;
import io.jsonwebtoken.Claims;

public class JwtAuthenciation {
    public static Integer getUserId(String token) {
        int userId = -1; // -1 表示不存在
        try {
            Claims claims = JwtUtil.parseJWT(token);
            userId = Integer.parseInt(claims.getSubject());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return userId;
    }
}
