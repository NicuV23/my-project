package com.projectevents.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectevents.dto.MainEventDTO;
import com.projectevents.entity.MainEvent;
import com.projectevents.entity.GameType;
import com.projectevents.entity.Chat;
import com.projectevents.repository.MainEventRepository;
import com.projectevents.repository.GameTypeRepository;
import com.projectevents.repository.ChatRepository;

import java.util.List;

@Service
public class MainEventService {

    @Autowired
    private MainEventRepository mainEventRepository;

    @Autowired
    private GameTypeRepository gameTypeRepository;

    @Autowired
    private ChatRepository chatRepository; 

    public MainEventDTO createMainEvent(MainEventDTO mainEventDTO) {
        MainEvent mainEvent = new MainEvent();
        mainEvent.setName(mainEventDTO.getName());
        mainEvent.setLocation(mainEventDTO.getLocation());
        mainEvent.setMaxParticipants(mainEventDTO.getMaxParticipants());
        
        GameType gameType = gameTypeRepository.findById(mainEventDTO.getGameTypeId())
            .orElseThrow(() -> new IllegalArgumentException("Invalid gameTypeId: " + mainEventDTO.getGameTypeId()));
        mainEvent.setGameType(gameType);

        if (mainEventDTO.getChatId() != null) {
            
            
        }Chat chat = chatRepository.findById(mainEventDTO.getChatId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid chatId: " + mainEventDTO.getChatId()));
            mainEvent.setChatId(chat.getChatId());

        mainEvent = mainEventRepository.save(mainEvent);
        return new MainEventDTO(mainEvent.getEventId(), mainEvent.getName(), mainEvent.getLocation(), mainEvent.getMaxParticipants(), mainEvent.getGameTypeId(), mainEvent.getChatId());
    }

    public MainEventDTO getMainEventById(Long id) {
        return mainEventRepository.findById(id)
            .map(event -> new MainEventDTO(event.getEventId(), event.getName(), event.getLocation(), event.getMaxParticipants(), event.getChatId(), event.getGameTypeId()))
            .orElse(null);
    }

    public List<MainEvent> findAllEvents() {
        return mainEventRepository.findAll();
    }

    public MainEventDTO updateMainEvent(Long id, MainEventDTO mainEventDTO) {
        return mainEventRepository.findById(id).map(event -> {
            event.setName(mainEventDTO.getName());
            event.setLocation(mainEventDTO.getLocation());
            event.setMaxParticipants(mainEventDTO.getMaxParticipants());

            GameType gameType = gameTypeRepository.findById(mainEventDTO.getGameTypeId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid gameTypeId: " + mainEventDTO.getGameTypeId()));
            event.setGameType(gameType);

            if (mainEventDTO.getChatId() != null) {
                Chat chat = chatRepository.findById(mainEventDTO.getChatId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid chatId: " + mainEventDTO.getChatId()));
                event.setChatId(chat.getChatId());
            }

            mainEventRepository.save(event);
            return new MainEventDTO(event.getEventId(), event.getName(), event.getLocation(), event.getMaxParticipants(), event.getGameTypeId(), event.getChatId());
        }).orElse(null);
    }

    public boolean deleteMainEvent(Long id) {
        return mainEventRepository.findById(id).map(event -> {
            mainEventRepository.delete(event);
            return true;
        }).orElse(false);
    }

    public MainEvent findMainEventById(Long id) {
        return mainEventRepository.findById(id).orElse(null);
    }
}
