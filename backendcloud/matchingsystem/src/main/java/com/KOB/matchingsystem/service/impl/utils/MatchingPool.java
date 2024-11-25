package com.kob.matchingsystem.service.impl.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.locks.ReentrantLock;
@Component
public class MatchingPool extends Thread{

    public List<Player> players = new ArrayList<>();

    private final ReentrantLock lock = new ReentrantLock();

    private static RestTemplate restTemplate;

    private final static String startGameUrl = "http://127.0.0.1:3000/pk/start/game/";

    @Autowired
    public void setRestTemplate(RestTemplate restTemplate) {
        MatchingPool.restTemplate = restTemplate;
    }

    public void addPlayer(Integer userId, Integer rating, Integer botId) {
        lock.lock();
        try {
            players.add(new Player(userId, rating, botId, 0));
        } finally {
            lock.unlock();
        }
    }

    public void removePlayer(Integer userId) {
        lock.lock();
        try {
            List<Player> newPlayers = new ArrayList<>();
            for(Player player : players) {
                if(!player.getUserId().equals(userId)) {
                    newPlayers.add(player);
                }
            }
            players = newPlayers;
        } finally {
            lock.unlock();
        }
    }

    private void increaseWatingTime() { // 将所有玩家当前匹配时间加一
        for(Player player : players) {
            player.setWatingTime(player.getWatingTime() + 1);
        }
    }

    private boolean checkMatched(Player a, Player b) { // 判断两名玩家是否匹配
        int ratingDelta = Math.abs(a.getRating() - b.getRating());
        int watingTime = Math.min(a.getWatingTime(), b.getWatingTime());
        return ratingDelta <= watingTime * 10;
    }

    private void sendResult(Player a, Player b) { // 返回a和b的匹配结果
        System.out.println("send result"+ a + " " + b);
        MultiValueMap<String, String> data = new LinkedMultiValueMap<>();
        data.add("a_id", a.getUserId().toString());
        data.add("a_bot_id", a.getBotId().toString());
        data.add("b_id", b.getUserId().toString());
        data.add("b_bot_id", b.getBotId().toString());
        restTemplate.postForObject(startGameUrl, data, String.class);
    }

    private void matchPlayers() { // 尝试匹配所有玩家
//        System.out.println("match players: " + players.toString());
        // 标记是否被匹配
        boolean[] used = new boolean[players.size()];

        // 先枚举等待最久的玩家，恰好是players前面的玩家等待的的久
        for(int i = 0; i < players.size(); i++) {
            if(used[i]) continue;
            // i只要和比i大的匹配，就正好所有玩家匹配一次
            for(int j = i + 1; j < players.size(); j++) {
                if(used[j]) continue;
                Player a = players.get(i), b = players.get(j);
                if(checkMatched(a, b)) {
                    used[i] = used[j] = true;
                    sendResult(a, b);
                    break;
                }
            }
        }

        List<Player> newPlayers = new ArrayList<>();
        for(int i = 0; i < players.size(); i++) {
            if(!used[i]) {
                newPlayers.add(players.get(i));
            }
        }
        players = newPlayers;

    }

    @Override
    public void run() {
        while (true) {
            try {
                Thread.sleep(1000);
                // 涉及到players变量， 加锁
                lock.lock();
                try {
                    increaseWatingTime();
                    matchPlayers();
                } finally {
                    lock.unlock();
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
