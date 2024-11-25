package com.kob.backend2.service.impl.user.bot;

import com.kob.backend2.mapper.BotMapper;
import com.kob.backend2.pojo.Bot;
import com.kob.backend2.pojo.User;
import com.kob.backend2.service.impl.utils.UserDetailsImpl;
import com.kob.backend2.service.user.bot.UpdateService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class UpdateServiceImpl implements UpdateService {
    private static final Logger log = LoggerFactory.getLogger(UpdateServiceImpl.class);
    @Autowired
    private BotMapper botMapper;
    @Override
    public Map<String, String> update(Map<String, String> data) {
        UsernamePasswordAuthenticationToken authenticationToken =
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl loginUser = (UserDetailsImpl) authenticationToken.getPrincipal();
        User user = loginUser.getUser();
        int bot_id = Integer.parseInt(data.get("bot_id"));

        String title = data.get("title");
        String description = data.get("description");
        String content = data.get("content");

        Map<String, String> map = new HashMap<>();

        if(title == null || title.isEmpty()) {
            map.put("error_message", "标题不能为空");
            return map;
        }

        if (title.length() > 100) {
            map.put("error_message", "标题长度不能大于100");
            return map;
        }

        if(description == null || description.isEmpty()) {
            description = "这个用户很懒，什么也没留下~";
        }

        if(description.length() > 300) {
            map.put("error_message", "bot描述的长度不能大于300");
            return map;
        }

        if(content == null || content.isEmpty()) {
            map.put("error_message", "bot代码不能为空");
            return map;
        }

        if(content.length() > 10000) {
            map.put("error_message", "bot代码的长度不能大于10000");
            return map;
        }

        Bot bot = botMapper.selectById(bot_id);
        if(bot == null) {
            map.put("error_message", "bot不存在或已经被删除");
            return map;
        }

        if(!bot.getUserId().equals(user.getId())) {
            map.put("error_message", "没有权限删除该bot");
            return map;
        }

        Bot new_bot = new Bot(
                bot.getId(),
                user.getId(),
                title,
                description,
                content,
                bot.getCreatetime(),
                new Date()
        );

        botMapper.updateById(new_bot);

        map.put("error_message", "success");

        return map;
    }
}
