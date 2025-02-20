package com.projectevents.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;

@Entity
@Table(name = "game_type")
public class GameType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long typeId;

    @Column(length = 50)
    private String name;

    @OneToMany(mappedBy = "gameType", cascade = CascadeType.ALL)
    private Set<MainEvent> events = new HashSet<>();

    public GameType() {}

    public Long getTypeId() {
        return typeId;
    }

    public void setTypeId(Long typeId) {
        this.typeId = typeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<MainEvent> getEvents() {
        return events;
    }

    public void setEvents(Set<MainEvent> events) {
        this.events = events;
    }
}
