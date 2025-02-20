package com.projectevents.dto;

import java.util.Date;

public class MessageDTO {
    private Long id;
    private String content;
    private Date timestamp;
    public Long senderId; 
    public Long chatId; 

    public MessageDTO() {}

    public MessageDTO(Long id, String content, Date timestamp, Long senderId, Long chatId) {
        this.id = id;
        this.content = content;
        this.timestamp = timestamp;
        this.senderId = senderId;
        this.chatId = chatId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

   public  void setContent(String content) {
        this.content = content;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

   public Long getSenderId() {
        return senderId;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public Long getChatId() {
        return chatId;
    }

    public void setChatId(Long chatId) {
        this.chatId = chatId;
    }
}
