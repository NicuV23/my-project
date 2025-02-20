package com.projectevents.entity;


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

    @Column(length = 50)
    private String location;

    @Column
    private Integer maxParticipants;

    @ManyToOne
    @JoinColumn(name = "game_type_id")
    private GameType gameType;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private Set<Participant> participants = new HashSet<>();

    public MainEvent() {}

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

    public Set<Participant> getParticipants() {
        return participants;
    }

    public void setParticipants(Set<Participant> participants) {
        this.participants = participants;
    }

    public Long getGameTypeId() {
        return gameType != null ? gameType.getTypeId() : null;  
    }

}
