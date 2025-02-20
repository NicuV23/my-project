package com.projectevents.converter;

import com.projectevents.dto.MainEventDTO;
import com.projectevents.entity.MainEvent;

public class MainEventConverter {

    public static MainEventDTO entityToDTO(MainEvent mainEvent) {
        return new MainEventDTO(mainEvent.getEventId(), mainEvent.getName(), mainEvent.getLocation(), mainEvent.getMaxParticipants(), mainEvent.getGameTypeId());
    }

    public static MainEvent dtoToEntity(MainEventDTO mainEventDTO) {
        MainEvent mainEvent = new MainEvent();
        mainEvent.setEventId(mainEventDTO.getId());
        mainEvent.setName(mainEventDTO.getName());
        mainEvent.setLocation(mainEventDTO.getLocation());
        mainEvent.setMaxParticipants(mainEventDTO.getMaxParticipants());
        return mainEvent;
    }
}
