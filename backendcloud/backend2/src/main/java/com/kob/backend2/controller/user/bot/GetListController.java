package com.kob.backend2.controller.user.bot;

import com.kob.backend2.pojo.Bot;
import com.kob.backend2.service.user.bot.GetListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GetListController {
    @Autowired
    private GetListService getListService;
    @PostMapping("/user/bot/getlist/")
    public List<Bot> getList() {
        return getListService.getList();
    }
}
