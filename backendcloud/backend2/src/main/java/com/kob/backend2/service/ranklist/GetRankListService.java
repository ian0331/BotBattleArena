package com.kob.backend2.service.ranklist;

import com.alibaba.fastjson2.JSONObject;

public interface GetRankListService {
    JSONObject getList(Integer page);
}
