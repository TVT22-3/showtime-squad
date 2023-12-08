package com.showtimesquad.showtimesquad.model.response;

import java.util.List;

import jakarta.validation.constraints.NotBlank;

public class ListInfoResponse {
    private String name;
    private List<String> items;

    public ListInfoResponse(String name, List<String> items) {
        this.name = name;
        this.items = items;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getItems() {
        return items;
    }

    public void setItems(List<String> items) {
        this.items = items;
    }

    @Override
    public String toString() {
        return "ListInfoResponse{" +
                "name='" + name + '\'' +
                ", items=" + items +
                '}';
    }
}
