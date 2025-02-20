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
    public ResponseEntity<ParticipantDTO> addParticipant(@RequestBody ParticipantDTO participantDTO) {
        ParticipantDTO newParticipant = participantService.addParticipant(participantDTO);
        return ResponseEntity.ok(newParticipant);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ParticipantDTO> getParticipantById(@PathVariable Long id) {
        ParticipantDTO participant = participantService.getParticipantById(id);
        return participant != null ? ResponseEntity.ok(participant) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<ParticipantDTO>> getAllParticipants() {
        List<ParticipantDTO> participants = participantService.getAllParticipants();
        return ResponseEntity.ok(participants);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParticipant(@PathVariable Long id) {
        boolean isDeleted = participantService.deleteParticipant(id);
        return isDeleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ParticipantDTO> updateParticipant(@PathVariable Long id, @RequestBody ParticipantDTO participantDTO) {
        ParticipantDTO updatedParticipant = participantService.updateParticipant(id, participantDTO);
        return updatedParticipant != null ? ResponseEntity.ok(updatedParticipant) : ResponseEntity.notFound().build();
    }
}
