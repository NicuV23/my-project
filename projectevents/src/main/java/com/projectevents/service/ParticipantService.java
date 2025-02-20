package com.projectevents.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectevents.dto.ParticipantDTO;
import com.projectevents.entity.MainEvent;
import com.projectevents.entity.Participant;
import com.projectevents.entity.User;
import com.projectevents.repository.ParticipantRepository;

@Service
public class ParticipantService {

    @Autowired
    private ParticipantRepository participantRepository;
    @Autowired
    private UserService userService; 
    @Autowired
    private MainEventService mainEventService; 

    public ParticipantDTO addParticipant(ParticipantDTO participantDTO) {
        Participant participant = new Participant();
        participant.setStatus(participantDTO.getStatus());
        
        User user = userService.findUserById(participantDTO.getUserId());
        participant.setUser(user);

        MainEvent event = mainEventService.findMainEventById(participantDTO.getEventId());
        participant.setEvent(event);

        participant = participantRepository.save(participant);
        return new ParticipantDTO(participant.getParticipantId(), participant.getUser().getId(), participant.getEvent().getEventId(), participant.getStatus());
    }

    public ParticipantDTO getParticipantById(Long id) {
        return participantRepository.findById(id)
            .map(p -> new ParticipantDTO(p.getParticipantId(), p.getUser().getId(), p.getEvent().getEventId(), p.getStatus()))
            .orElse(null);
    }

    public List<ParticipantDTO> getAllParticipants() {
        return participantRepository.findAll().stream()
            .map(p -> new ParticipantDTO(p.getParticipantId(), p.getUser().getId(), p.getEvent().getEventId(), p.getStatus()))
            .collect(Collectors.toList());
    }

    public ParticipantDTO updateParticipant(Long id, ParticipantDTO participantDTO) {
        return participantRepository.findById(id).map(participant -> {
            participant.setStatus(participantDTO.getStatus());
            participantRepository.save(participant);
            return new ParticipantDTO(participant.getParticipantId(), participant.getUser().getId(), participant.getEvent().getEventId(), participant.getStatus());
        }).orElse(null);
    }

    public boolean deleteParticipant(Long id) {
        return participantRepository.findById(id).map(participant -> {
            participantRepository.delete(participant);
            return true;
        }).orElse(false);
    }
}

