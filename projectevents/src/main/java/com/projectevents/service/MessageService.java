package com.projectevents.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectevents.dto.MessageDTO;
import com.projectevents.entity.Chat;
import com.projectevents.entity.Message;
import com.projectevents.entity.User;
import com.projectevents.repository.MessageRepository;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private ChatService chatService;

    public MessageDTO createMessage(MessageDTO messageDTO) {
        Message message = new Message();
        message.setContent(messageDTO.getContent());
        message.setTimestamp(messageDTO.getTimestamp());
        
        User sender = userService.findUserById(messageDTO.getSenderId());
        Chat chat = chatService.findChatById(messageDTO.getChatId());
        
        message.setSender(sender);
        message.setChat(chat);

        message = messageRepository.save(message);
        return new MessageDTO(message.getMessageId(), message.getContent(), message.getTimestamp(), sender.getId(), chat.getChatId());
    }

    public MessageDTO getMessageById(Long id) {
        return messageRepository.findById(id)
            .map(m -> new MessageDTO(m.getMessageId(), m.getContent(), m.getTimestamp(), m.getSender().getId(), m.getChat() != null ? m.getChat().getChatId() : null))
            .orElse(null);
    }

    public List<MessageDTO> getAllMessages() {
        return messageRepository.findAll().stream()
            .map(m -> new MessageDTO(m.getMessageId(), m.getContent(), m.getTimestamp(), m.getSender().getId(), m.getChat() != null ? m.getChat().getChatId() : null))
            .collect(Collectors.toList());
    }

    public MessageDTO updateMessage(Long id, MessageDTO messageDTO) {
        return messageRepository.findById(id).map(message -> {
            message.setContent(messageDTO.getContent());
            message.setTimestamp(messageDTO.getTimestamp());
            messageRepository.save(message);
            return new MessageDTO(message.getMessageId(), message.getContent(), message.getTimestamp(), message.getSender().getId(), message.getChat().getChatId());
        }).orElse(null);
    }

    public boolean deleteMessage(Long id) {
        return messageRepository.findById(id).map(message -> {
            messageRepository.delete(message);
            return true;
        }).orElse(false);
    }
}

