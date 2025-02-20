package com.projectevents.entity;

import jakarta.persistence.*;



@Entity
@Table(name = "participant")
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long participantId;

    @Column(length = 50)
    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private MainEvent event;

    public Participant() {}

    public Long getParticipantId() {
        return participantId;
    }

    public void setParticipantId(Long participantId) {
        this.participantId = participantId;
    }
    
    public Long getUserId() {
        return user != null ? user.getId() : null;
    }

    public Long getEventId() {
        return event != null ? event.getEventId() : null;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public MainEvent getEvent() {
        return event;
    }

  public  void setEvent(MainEvent event) {
        this.event = event;
    }
}
