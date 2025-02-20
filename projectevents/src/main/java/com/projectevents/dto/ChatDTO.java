package com.projectevents.dto;

public class ChatDTO {
    private Long id;
    private Long eventId; 

    public ChatDTO() {}

    public ChatDTO(Long id, Long eventId) {
        this.id = id;
        this.eventId = eventId;
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
}
