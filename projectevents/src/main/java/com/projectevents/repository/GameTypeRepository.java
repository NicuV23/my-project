package com.projectevents.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projectevents.entity.GameType;

public interface GameTypeRepository extends JpaRepository<GameType, Long> {
}
