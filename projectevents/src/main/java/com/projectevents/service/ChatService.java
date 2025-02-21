package com.projectevents.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.projectevents.dto.ChatDTO;
import com.projectevents.entity.Chat;
import com.projectevents.entity.MainEvent;
import com.projectevents.repository.ChatRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {
    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private MainEventService mainEventService;

    public ChatDTO createChat(ChatDTO chatDTO) {
        if (chatDTO.getEventId() == null) {
            throw new IllegalArgumentException("Event ID must not be null");
        }
        MainEvent event = mainEventService.findMainEventById(chatDTO.getEventId());
        if (event == null) {
            throw new IllegalStateException("No event found with ID: " + chatDTO.getEventId());
        }
        Chat chat = new Chat();
        chat.setEvent(event);
        chat.setName(chatDTO.getName());
        chat = chatRepository.save(chat);
        return new ChatDTO(chat.getChatId(), event.getEventId(), chat.getName());
    }
    
    public Chat findChatById(Long id) {
        return chatRepository.findById(id).orElse(null);
        		
    }

    public ChatDTO getChatById(Long id) {
        return chatRepository.findById(id)
            .map(c -> new ChatDTO(c.getChatId(), c.getEvent().getEventId(), c.getName()))
            .orElse(null);
    }

    public List<ChatDTO> getAllChats() {
        return chatRepository.findAll().stream()
            .map(chat -> new ChatDTO(chat.getChatId(), chat.getEvent().getEventId(), chat.getName()))
            .collect(Collectors.toList());
    }

    public ChatDTO updateChat(Long id, ChatDTO chatDTO) {
        return chatRepository.findById(id).map(chat -> {
            MainEvent event = mainEventService.findMainEventById(chatDTO.getEventId());
            chat.setEvent(event);
            chat.setName(chatDTO.getName());
            chatRepository.save(chat);
            return new ChatDTO(chat.getChatId(), event.getEventId(), chat.getName());
        }).orElse(null);
    }

    public boolean deleteChat(Long id) {
        return chatRepository.findById(id).map(chat -> {
            chatRepository.delete(chat);
            return true;
        }).orElse(false);
    }
}
