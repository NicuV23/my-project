package com.projectevents.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projectevents.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
