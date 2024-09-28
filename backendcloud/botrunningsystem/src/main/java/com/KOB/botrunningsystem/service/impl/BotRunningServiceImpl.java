package com.KOB.botrunningsystem.service.impl;

import com.KOB.botrunningsystem.service.BotRunningService;
import org.springframework.stereotype.Service;

@Service
public class BotRunningServiceImpl implements BotRunningService {

    @Override
    public String addBot(Integer userId, String botCode, String Input) {
        System.out.println("addBot" + userId + " " + botCode + " " + Input);
        return "add bot success";
    }
}
