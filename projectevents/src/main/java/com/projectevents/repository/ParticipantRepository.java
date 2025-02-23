package com.projectevents.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.projectevents.entity.Participant;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {
	Optional<Participant> findByUser_IdAndEvent_EventId(Long userId, Long eventId);
}
