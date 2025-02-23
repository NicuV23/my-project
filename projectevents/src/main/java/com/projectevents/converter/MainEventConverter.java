package com.projectevents.converter;

import com.projectevents.dto.MainEventDTO;
import com.projectevents.entity.MainEvent;

public class MainEventConverter {

    public static MainEventDTO entityToDTO(MainEvent mainEvent) {
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
            mainEvent.getCreatorId()     
        );
    }

    public static MainEvent dtoToEntity(MainEventDTO mainEventDTO) {
        MainEvent mainEvent = new MainEvent();
        mainEvent.setEventId(mainEventDTO.getEventId());
        mainEvent.setName(mainEventDTO.getName());
        mainEvent.setLocation(mainEventDTO.getLocation());
        mainEvent.setMaxParticipants(mainEventDTO.getMaxParticipants());
        mainEvent.setEventDate(mainEventDTO.getEventDate());  
        mainEvent.setEventTime(mainEventDTO.getEventTime());  
        mainEvent.setDescription(mainEventDTO.getDescription()); 
        mainEvent.setChatId(mainEventDTO.getChatId());
        mainEvent.setCreatorId(mainEventDTO.getCreatorId());   
        return mainEvent;
    }
}
