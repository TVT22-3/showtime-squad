package com.showtimesquad.showtimesquad.model.request;

import io.micrometer.common.lang.NonNull;

public class GroupNewsRemoveIdRequest extends GroupRequest {

    @NonNull
    private Integer id;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

}
