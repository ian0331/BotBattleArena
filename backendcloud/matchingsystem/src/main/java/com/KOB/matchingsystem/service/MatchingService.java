package com.KOB.matchingsystem.service;

public interface MatchingService {
    String addPlayer (Integer userId, Integer rating, Integer botId);//匹配需要依照分值
    String removePlayer (Integer userId);
}
