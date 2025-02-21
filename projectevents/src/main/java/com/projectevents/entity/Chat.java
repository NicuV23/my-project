package com.projectevents.entity;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "chat")
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatId;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private MainEvent event;

    @Column(name = "name")
    private String name;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Message> getMessages() {
        return messages;
    }

    public void setMessages(Set<Message> messages) {
        this.messages = messages;
    }
}
