package com.projectevents.dto;

public class ChatDTO {
    private Long id;
    private Long eventId;
    private String name; 

    public ChatDTO() {}

    public ChatDTO(Long id, Long eventId, String name) {
        this.id = id;
        this.eventId = eventId;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
