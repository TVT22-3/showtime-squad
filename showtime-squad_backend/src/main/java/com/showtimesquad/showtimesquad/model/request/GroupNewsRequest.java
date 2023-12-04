package com.showtimesquad.showtimesquad.model.request;

import io.micrometer.common.lang.NonNull;

public class GroupNewsRequest extends GroupRequest {

    @NonNull
    private Integer news;

    public Integer getNews() {
        return this.news;
    }

    public void setNews(Integer id) {
        this.news = id;
    }

}
