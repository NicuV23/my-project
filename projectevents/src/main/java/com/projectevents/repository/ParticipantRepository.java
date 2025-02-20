package com.projectevents.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projectevents.entity.Participant;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {
}
