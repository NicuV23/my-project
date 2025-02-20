package com.projectevents.converter;

import com.projectevents.dto.ParticipantDTO;
import com.projectevents.entity.Participant;

public class ParticipantConverter {

    public static ParticipantDTO entityToDTO(Participant participant) {
        return new ParticipantDTO(
            participant.getParticipantId(),
            participant.getUser() != null ? participant.getUser().getId() : null,
            participant.getEvent() != null ? participant.getEvent().getEventId() : null,
            participant.getStatus()
        );
    }

    public static Participant dtoToEntity(ParticipantDTO participantDTO) {
        Participant participant = new Participant();
        participant.setParticipantId(participantDTO.getId());
        participant.setStatus(participantDTO.getStatus());
        return participant;
    }
}
