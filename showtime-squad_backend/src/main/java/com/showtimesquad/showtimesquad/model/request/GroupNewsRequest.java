package com.showtimesquad.showtimesquad.model.request;

import jakarta.validation.constraints.NotNull;

/**
 * Request DTO for interacting with group's news
 */
public class GroupNewsRequest extends GroupRequest {

    @NotNull
    private Integer news;

    public Integer getNews() {
        return this.news;
    }

    public void setNews(Integer id) {
        this.news = id;
    }

}
