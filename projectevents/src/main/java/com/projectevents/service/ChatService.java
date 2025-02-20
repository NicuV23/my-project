package com.projectevents.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectevents.dto.ChatDTO;
import com.projectevents.entity.Chat;
import com.projectevents.entity.MainEvent;
import com.projectevents.repository.ChatRepository;


@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private MainEventService mainEventService;

    public ChatDTO createChat(ChatDTO chatDTO) {
        Chat chat = new Chat();
        MainEvent event = mainEventService.findMainEventById(chatDTO.getEventId());
        chat.setEvent(event);
        chat = chatRepository.save(chat);
        return new ChatDTO(chat.getChatId(), event.getEventId());
    }

    public ChatDTO getChatById(Long id) {
        return chatRepository.findById(id)
            .map(c -> new ChatDTO(c.getChatId(), c.getEvent().getEventId()))
            .orElse(null);
    }
    
    public Chat findChatById(Long id) {
        return chatRepository.findById(id).orElse(null);
    }

    public List<ChatDTO> getAllChats() {
        return chatRepository.findAll().stream()
            .map(chat -> new ChatDTO(chat.getChatId(), chat.getEvent().getEventId()))
            .collect(Collectors.toList());
    }

    public ChatDTO updateChat(Long id, ChatDTO chatDTO) {
        return chatRepository.findById(id).map(chat -> {
            MainEvent event = mainEventService.findMainEventById(chatDTO.getEventId());
            chat.setEvent(event);
            chatRepository.save(chat);
            return new ChatDTO(chat.getChatId(), event.getEventId());
        }).orElse(null);
    }

    public boolean deleteChat(Long id) {
        return chatRepository.findById(id).map(chat -> {
            chatRepository.delete(chat);
            return true;
        }).orElse(false);
    }
}

