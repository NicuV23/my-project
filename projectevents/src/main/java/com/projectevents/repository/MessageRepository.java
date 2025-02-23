package com.projectevents.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import com.projectevents.entity.Message;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByChatChatId(Long chatId);

    @Transactional
    long countByChatChatId(Long chatId);

    @Modifying
    @Transactional
    void deleteByChatChatId(Long chatId);
}
