package com.projectevents.converter;

import com.projectevents.dto.ChatDTO;
import com.projectevents.entity.Chat;

public class ChatConverter {

    public static ChatDTO entityToDTO(Chat chat) {
        if (chat.getEvent() != null) {
            return new ChatDTO(chat.getChatId(), chat.getEvent().getEventId());
        } else {
            return new ChatDTO(chat.getChatId(), null);
        }
    }

    public static Chat dtoToEntity(ChatDTO chatDTO) {
        Chat chat = new Chat();
        return chat;
    }
}
