package com.projectevents.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class MainEventDTO {
    private Long eventId;
    private String name;
    private String location;
    private Integer maxParticipants;
    private LocalDate eventDate;
    private LocalTime eventTime;
     private Integer currentParticipants;
    private String description;
    private Long gameTypeId;
    private Long chatId;
    private Long creatorId;

    public MainEventDTO() {}

    public MainEventDTO(Long eventId, String name, String location, Integer maxParticipants, 
            Long gameTypeId, Long chatId, LocalDate eventDate, LocalTime eventTime, 
            String description, Long creatorId) {
this.eventId = eventId;
this.name = name;
this.location = location;
this.maxParticipants = maxParticipants;
this.gameTypeId = gameTypeId;
this.chatId = chatId;
this.eventDate = eventDate;
this.eventTime = eventTime;
this.description = description;
this.creatorId = creatorId;
this.currentParticipants = 0; 
}


    public MainEventDTO(Long eventId, String name, String location, Integer maxParticipants, 
            Long gameTypeId, Long chatId, LocalDate eventDate, LocalTime eventTime, 
            String description, Long creatorId, Integer currentParticipants) {
this.eventId = eventId;
this.name = name;
this.location = location;
this.maxParticipants = maxParticipants;
this.gameTypeId = gameTypeId;
this.chatId = chatId;
this.eventDate = eventDate;
this.eventTime = eventTime;
this.description = description;
this.creatorId = creatorId;
this.currentParticipants = currentParticipants;
}


    public Long getEventId() { return eventId; }
    public void setEventId(Long eventId) { this.eventId = eventId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Integer getMaxParticipants() { return maxParticipants; }
    public void setMaxParticipants(Integer maxParticipants) { this.maxParticipants = maxParticipants; }

    public LocalDate getEventDate() { return eventDate; }
    public void setEventDate(LocalDate eventDate) { this.eventDate = eventDate; }

    public LocalTime getEventTime() { return eventTime; }
    public void setEventTime(LocalTime eventTime) { this.eventTime = eventTime; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Long getGameTypeId() { return gameTypeId; }
    public void setGameTypeId(Long gameTypeId) { this.gameTypeId = gameTypeId; }

    public Long getChatId() { return chatId; }
    public void setChatId(Long chatId) { this.chatId = chatId; }

    public Long getCreatorId() { return creatorId; }
    public void setCreatorId(Long creatorId) { this.creatorId = creatorId; }

    public Integer getCurrentParticipants() {
        return currentParticipants;
    }

    public void setCurrentParticipants(Integer currentParticipants) {
        this.currentParticipants = currentParticipants;
    }

}
