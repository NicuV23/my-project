package com.projectevents.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;

@Entity
@Table(name = "main_event")
public class MainEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventId;

    @Column(length = 50)
    private String name;
    
    @Column(name = "chat_id")
    private Long chatId;

    @Column(length = 50)
    private String location;

    @Column
    private Integer maxParticipants;

    @Column(name = "event_date")
    private LocalDate eventDate; 

    @Column(name = "event_time")
    private LocalTime eventTime; 

    @Column(columnDefinition = "TEXT")
    private String description; 
    
    @Column(name = "creator_id")
    private Long creatorId;

    
    @Column(nullable = false)
    private Integer currentParticipants = 0;


    @ManyToOne
    @JoinColumn(name = "game_type_id")
    private GameType gameType;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private Set<Participant> participants = new HashSet<>();

    public MainEvent() {}
    
    public Integer getCurrentParticipants() {
        return currentParticipants;
    }

    public void setCurrentParticipants(Integer currentParticipants) {
        this.currentParticipants = currentParticipants;
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

    public GameType getGameType() {
        return gameType;
    }

    public void setGameType(GameType gameType) {
        this.gameType = gameType;
    }

    public Long getChatId() {
        return chatId;
    }

    public void setChatId(Long chatId) {
        this.chatId = chatId;
    }

    public Set<Participant> getParticipants() {
        return participants;
    }

    public void setParticipants(Set<Participant> participants) {
        this.participants = participants;
    }

    public Long getGameTypeId() {
        return gameType != null ? gameType.getTypeId() : null;  
    }

    public LocalDate getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }

    public LocalTime getEventTime() {
        return eventTime;
    }

    public void setEventTime(LocalTime eventTime) {
        this.eventTime = eventTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
    public Long getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Long creatorId) {
        this.creatorId = creatorId;
    }
}
