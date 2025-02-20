package com.projectevents.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projectevents.entity.Chat;

public interface ChatRepository extends JpaRepository<Chat, Long> {
}
