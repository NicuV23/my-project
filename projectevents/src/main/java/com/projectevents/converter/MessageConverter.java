package com.projectevents.converter;

import com.projectevents.dto.MessageDTO;
import com.projectevents.entity.Message;

public class MessageConverter {

    public static MessageDTO entityToDTO(Message message) {
        return new MessageDTO(
            message.getMessageId(),
            message.getContent(),
            message.getTimestamp(),
            message.getSender() != null ? message.getSender().getId() : null,
            message.getChat() != null ? message.getChat().getChatId() : null
        );
    }

    public static Message dtoToEntity(MessageDTO messageDTO) {
        Message message = new Message();
        message.setMessageId(messageDTO.getId());
        message.setContent(messageDTO.getContent());
        message.setTimestamp(messageDTO.getTimestamp());
        return message;
    }
}
