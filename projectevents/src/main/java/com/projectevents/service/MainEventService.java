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
import java.util.stream.Collectors;


//Acest serviciu folosește diverse repository-uri pentru a interacționa
//cu baza de date 
//și un serviciu suplimentar pentru gestionarea
//participanților la evenimente.

@Service
public class MainEventService {

    @Autowired
    private MainEventRepository mainEventRepository;

    @Autowired
    private GameTypeRepository gameTypeRepository;

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private ParticipantService participantService; 

    //  Creare eveniment și adăugare automată a creatorului ca participant
    public MainEventDTO createMainEvent(MainEventDTO mainEventDTO) {
        MainEvent mainEvent = new MainEvent();
        mainEvent.setName(mainEventDTO.getName());
        mainEvent.setLocation(mainEventDTO.getLocation());
        mainEvent.setMaxParticipants(mainEventDTO.getMaxParticipants());
        mainEvent.setEventDate(mainEventDTO.getEventDate());
        mainEvent.setEventTime(mainEventDTO.getEventTime());
        mainEvent.setDescription(mainEventDTO.getDescription());
        mainEvent.setCreatorId(mainEventDTO.getCreatorId());
        mainEvent.setCurrentParticipants(1); 

        Chat newChat = new Chat();
        chatRepository.save(newChat);
        mainEvent.setChatId(newChat.getChatId()); 
        
        GameType gameType = gameTypeRepository.findById(mainEventDTO.getGameTypeId())
            .orElseThrow(() -> new IllegalArgumentException("Invalid gameTypeId: " + mainEventDTO.getGameTypeId()));
        mainEvent.setGameType(gameType);

        if (mainEventDTO.getChatId() != null) {
            Chat chat = chatRepository.findById(mainEventDTO.getChatId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid chatId: " + mainEventDTO.getChatId()));
            mainEvent.setChatId(chat.getChatId());
        }

        mainEvent = mainEventRepository.save(mainEvent);

        //  Adaugă automat creatorul ca participant
        participantService.toggleParticipant(mainEvent.getCreatorId(), mainEvent.getEventId());

        return new MainEventDTO(
            mainEvent.getEventId(),
            mainEvent.getName(),
            mainEvent.getLocation(),
            mainEvent.getMaxParticipants(),
            mainEvent.getGameTypeId(),
            mainEvent.getChatId(),
            mainEvent.getEventDate(),
            mainEvent.getEventTime(),
            mainEvent.getDescription(),
            mainEvent.getCreatorId(),
            mainEvent.getCurrentParticipants()
        );
    }

    //  Returnează toate evenimentele cu numărul real de participanți
    public List<MainEventDTO> findAllEvents() {
        List<MainEvent> events = mainEventRepository.findAll();
        return events.stream()
            .map(event -> new MainEventDTO(
                event.getEventId(),
                event.getName(),
                event.getLocation(),
                event.getMaxParticipants(),
                event.getGameTypeId(),
                event.getChatId(),
                event.getEventDate(),
                event.getEventTime(),
                event.getDescription(),
                event.getCreatorId(),
                event.getCurrentParticipants() 
            ))
            .collect(Collectors.toList());
    }

    //  Returnează un eveniment după ID
    public MainEventDTO getMainEventById(Long id) {
        return mainEventRepository.findById(id)
            .map(event -> new MainEventDTO(
                event.getEventId(),
                event.getName(),
                event.getLocation(),
                event.getMaxParticipants(),
                event.getGameTypeId(),
                event.getChatId(),
                event.getEventDate(),
                event.getEventTime(),
                event.getDescription(),
                event.getCreatorId(),
                event.getCurrentParticipants()
            ))
            .orElse(null);
    }

    //  Returnează toate evenimentele unui utilizator (comentariile mele)
    public List<MainEventDTO> getEventsByUser(Long userId) {
        List<MainEvent> events = mainEventRepository.findByCreatorId(userId);
        return events.stream()
            .map(event -> new MainEventDTO(
                event.getEventId(),
                event.getName(),
                event.getLocation(),
                event.getMaxParticipants(),
                event.getGameTypeId(),
                event.getChatId(),
                event.getEventDate(),
                event.getEventTime(),
                event.getDescription(),
                event.getCreatorId(),
                event.getCurrentParticipants() 
            ))
            .collect(Collectors.toList());
    }

    //  Update eveniment (păstrează participanții actuali)
    public MainEventDTO updateMainEvent(Long id, MainEventDTO mainEventDTO) {
        return mainEventRepository.findById(id).map(event -> {
            event.setName(mainEventDTO.getName());
            event.setLocation(mainEventDTO.getLocation());
            event.setMaxParticipants(mainEventDTO.getMaxParticipants());
            event.setEventDate(mainEventDTO.getEventDate());
            event.setEventTime(mainEventDTO.getEventTime());
            event.setDescription(mainEventDTO.getDescription());

            GameType gameType = gameTypeRepository.findById(mainEventDTO.getGameTypeId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid gameTypeId: " + mainEventDTO.getGameTypeId()));
            event.setGameType(gameType);

            if (mainEventDTO.getChatId() != null) {
                Chat chat = chatRepository.findById(mainEventDTO.getChatId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid chatId: " + mainEventDTO.getChatId()));
                event.setChatId(chat.getChatId());
            }

            event.setCurrentParticipants(mainEventDTO.getCurrentParticipants());

            mainEventRepository.save(event);
            return new MainEventDTO(
                event.getEventId(),
                event.getName(),
                event.getLocation(),
                event.getMaxParticipants(),
                event.getGameTypeId(),
                event.getChatId(),
                event.getEventDate(),
                event.getEventTime(),
                event.getDescription(),
                event.getCreatorId(),
                event.getCurrentParticipants()
            );
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
