package com.projectevents.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.projectevents.dto.MessageDTO;
import com.projectevents.service.MessageService;

@CrossOrigin
@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping("/chats/{chatId}/messages")
    public ResponseEntity<MessageDTO> createMessage(@PathVariable Long chatId, @RequestBody MessageDTO messageDTO) {
        messageDTO.setChatId(chatId);
        MessageDTO createdMessage = messageService.createMessage(messageDTO);
        return ResponseEntity.ok(createdMessage);
    }

    @PostMapping
    public ResponseEntity<MessageDTO> createMessage(@RequestBody MessageDTO messageDTO) {
        MessageDTO createdMessage = messageService.createMessage(messageDTO);
        return ResponseEntity.ok(createdMessage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MessageDTO> getMessageById(@PathVariable Long id) {
        MessageDTO message = messageService.getMessageById(id);
        return message != null ? ResponseEntity.ok(message) : ResponseEntity.notFound().build();
    }

    @GetMapping("/chats/{chatId}/messages")
    public ResponseEntity<List<MessageDTO>> getMessagesByChatId(@PathVariable Long chatId) {
        List<MessageDTO> messages = messageService.getMessagesByChatId(chatId);
        return messages != null ? ResponseEntity.ok(messages) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<MessageDTO>> getAllMessages() {
        List<MessageDTO> messages = messageService.getAllMessages();
        return ResponseEntity.ok(messages);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        boolean isDeleted = messageService.deleteMessage(id);
        return isDeleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/chats/{chatId}/messages")
    public ResponseEntity<?> deleteMessagesByChatId(@PathVariable Long chatId) {
        boolean isDeleted = messageService.deleteMessagesByChatId(chatId);
        if (isDeleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<MessageDTO> updateMessage(@PathVariable Long id, @RequestBody MessageDTO messageDTO) {
        MessageDTO updatedMessage = messageService.updateMessage(id, messageDTO);
        return updatedMessage != null ? ResponseEntity.ok(updatedMessage) : ResponseEntity.notFound().build();
    }
}
