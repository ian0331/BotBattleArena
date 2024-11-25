package com.kob.backend2.service.impl.pk;

import com.kob.backend2.consumer.WebSocketServer;
import com.kob.backend2.consumer.utils.Game;
import com.kob.backend2.service.pk.ReceiveBotMoveService;
import org.springframework.stereotype.Service;

import javax.xml.ws.WebEndpoint;

@Service
public class ReceiveBotMoveServiceImpl implements ReceiveBotMoveService {

    @Override
    public String receiveBotMove(Integer userId, Integer direction) {
        System.out.println("receive bot move: " + userId + " " + direction);
        if(WebSocketServer.users.get(userId) != null) {
            Game game = WebSocketServer.users.get(userId).game;
            if(game != null) {
                if(game.getPlayerA().getId().equals(userId)) {
                    game.setNextStepA(direction);
                }else if(game.getPlayerB().getId().equals(userId)) {
                    game.setNextStepB(direction);
                }
            }
        }
        return "receive bot move success";
    }
}
