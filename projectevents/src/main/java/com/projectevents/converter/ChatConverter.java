package com.projectevents.converter;

import com.projectevents.dto.ChatDTO;
import com.projectevents.entity.Chat;

public class ChatConverter {

    public static ChatDTO entityToDTO(Chat chat) {
        if (chat == null) {
            return null;  
        }
        Long eventId = chat.getEvent() != null ? chat.getEvent().getEventId() : null;
        return new ChatDTO(chat.getChatId(), eventId, chat.getName());
    }

    public static Chat dtoToEntity(ChatDTO chatDTO) {
        if (chatDTO == null) {
            return null;  
        }
        Chat chat = new Chat();
        chat.setChatId(chatDTO.getId());
        chat.setName(chatDTO.getName());
        return chat;
    }
}
