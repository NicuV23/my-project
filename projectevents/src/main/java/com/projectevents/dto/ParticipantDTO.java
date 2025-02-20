package com.projectevents.dto;

public class ParticipantDTO {
    private Long id;
    private Long userId;
    private Long eventId;
    private String status;

    public ParticipantDTO() {}

    public ParticipantDTO(Long id, Long userId, Long eventId, String status) {
        this.id = id;
        this.userId = userId;
        this.eventId = eventId;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getEventId() {
        return eventId;
    }

     void setEventId(Long eventId) {
        this.eventId = eventId;
    }

     public String getStatus() {
        return status;
    }

     void setStatus(String status) {
        this.status = status;
    }
}
