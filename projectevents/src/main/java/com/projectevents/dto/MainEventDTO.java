package com.projectevents.dto;

public class MainEventDTO {
    private Long id;
    private String name;
    private String location;
    private Integer maxParticipants;
    private Long gameTypeId; 

    public MainEventDTO() {}

    public MainEventDTO(Long id, String name, String location, Integer maxParticipants, Long gameTypeId) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.maxParticipants = maxParticipants;
        this.gameTypeId = gameTypeId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

     void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

     public Integer getMaxParticipants() {
        return maxParticipants;
    }

    public void setMaxParticipants(Integer maxParticipants) {
        this.maxParticipants = maxParticipants;
    }

    public Long getGameTypeId() {
        return gameTypeId;
    }

    public void setGameTypeId(Long gameTypeId) {
        this.gameTypeId = gameTypeId;
    }
}
