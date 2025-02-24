package com.projectevents.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectevents.dto.ParticipantDTO;
import com.projectevents.entity.MainEvent;
import com.projectevents.entity.Participant;
import com.projectevents.entity.User;
import com.projectevents.repository.MainEventRepository;
import com.projectevents.repository.ParticipantRepository;
import com.projectevents.repository.UserRepository;

@Service
public class ParticipantService {

    @Autowired
    private ParticipantRepository participantRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private MainEventRepository mainEventRepository;

   
    public boolean toggleParticipant(Long userId, Long eventId) {
        Optional<Participant> existingParticipant = participantRepository.findByUser_IdAndEvent_EventId(userId, eventId);

        if (existingParticipant.isPresent()) {
            participantRepository.delete(existingParticipant.get());
            updateParticipantCount(eventId, -1);
            return false;
        } else {
            User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
            MainEvent event = mainEventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
            
            if (event.getCurrentParticipants() >= event.getMaxParticipants()) {
                throw new RuntimeException("Event is full");
            }

            Participant newParticipant = new Participant();
            newParticipant.setUser(user);
            newParticipant.setEvent(event);
            newParticipant.setStatus("active");
            participantRepository.save(newParticipant);
            updateParticipantCount(eventId, 1);
            return true; 
        }
    }

    private void updateParticipantCount(Long eventId, int change) {
        MainEvent event = mainEventRepository.findById(eventId)
            .orElseThrow(() -> new RuntimeException("Event not found"));
        event.setCurrentParticipants(
            (event.getCurrentParticipants() != null ? event.getCurrentParticipants() : 0) + change
        );
        mainEventRepository.save(event);
    }

    public List<ParticipantDTO> getAllParticipants() {
        return participantRepository.findAll().stream()
            .map(p -> new ParticipantDTO(p.getParticipantId(), p.getUser().getId(), p.getEvent().getEventId(), p.getStatus()))
            .collect(Collectors.toList());
    }
}
