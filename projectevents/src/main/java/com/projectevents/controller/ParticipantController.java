package com.projectevents.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.projectevents.dto.ParticipantDTO;
import com.projectevents.service.ParticipantService;

@CrossOrigin
@RestController
@RequestMapping("/api/participants")
public class ParticipantController {

    @Autowired
    private ParticipantService participantService;

    
    @PostMapping
    public ResponseEntity<String> addParticipant(@RequestBody ParticipantDTO participantDTO) {
        boolean joined = participantService.toggleParticipant(participantDTO.getUserId(), participantDTO.getEventId());
        return ResponseEntity.ok(joined ? "Joined event" : "Event is full or already joined.");
    }
    
    @PutMapping("/toggle")
    public ResponseEntity<String> toggleParticipant(
            @RequestParam Long userId,
            @RequestParam Long eventId) {
        boolean joined = participantService.toggleParticipant(userId, eventId);
        return ResponseEntity.ok(joined ? "✅ Joined event" : "❌ Left event");
    }

   
    @DeleteMapping
    public ResponseEntity<String> removeParticipant(@RequestParam Long userId, @RequestParam Long eventId) {
        boolean left = participantService.toggleParticipant(userId, eventId);
        return ResponseEntity.ok(left ? "Left event" : "Not part of the event.");
    }

    
    @GetMapping
    public ResponseEntity<List<ParticipantDTO>> getAllParticipants() {
        return ResponseEntity.ok(participantService.getAllParticipants());
    }
}
