package com.projectevents.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.projectevents.dto.ChatDTO;
import com.projectevents.service.ChatService;

@CrossOrigin
@RestController
@RequestMapping("/api/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping
    public ResponseEntity<ChatDTO> createChat(@RequestBody ChatDTO chatDTO) {
        ChatDTO createdChat = chatService.createChat(chatDTO);
        return ResponseEntity.ok(createdChat);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChatDTO> getChatById(@PathVariable Long id) {
        ChatDTO chat = chatService.getChatById(id);
        return chat != null ? ResponseEntity.ok(chat) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<ChatDTO>> getAllChats() {
        List<ChatDTO> chats = chatService.getAllChats();
        return ResponseEntity.ok(chats);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChat(@PathVariable Long id) {
        boolean isDeleted = chatService.deleteChat(id);
        return isDeleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ChatDTO> updateChat(@PathVariable Long id, @RequestBody ChatDTO chatDTO) {
        ChatDTO updatedChat = chatService.updateChat(id, chatDTO);
        return updatedChat != null ? ResponseEntity.ok(updatedChat) : ResponseEntity.notFound().build();
    }
}

