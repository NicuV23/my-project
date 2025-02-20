package com.projectevents.entity;


import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;


@Entity
@Table(name = "chat")
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatId;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private MainEvent event;

    @OneToMany(mappedBy = "chat", cascade = CascadeType.ALL)
    private Set<Message> messages = new HashSet<>();

    public Chat() {}

    public Long getChatId() {
        return chatId;
    }

    public void setChatId(Long chatId) {
        this.chatId = chatId;
    }

    public MainEvent getEvent() {
        return event;
    }

     public void setEvent(MainEvent event) {
        this.event = event;
    }

     Set<Message> getMessages() {
        return messages;
    }

     void setMessages(Set<Message> messages) {
        this.messages = messages;
    }
}
