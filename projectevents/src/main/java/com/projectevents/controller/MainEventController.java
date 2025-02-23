package com.projectevents.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.projectevents.converter.MainEventConverter;
import com.projectevents.dto.MainEventDTO;
import com.projectevents.entity.MainEvent;
import com.projectevents.service.MainEventService;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/main-events")
public class MainEventController {

    @Autowired
    private MainEventService mainEventService;
    
    @PostMapping
    public ResponseEntity<MainEventDTO> createMainEvent(@RequestBody MainEventDTO eventDTO) {
        System.out.println("Received Event DTO: " + eventDTO);
        MainEventDTO savedEvent = mainEventService.createMainEvent(eventDTO);
        return ResponseEntity.ok(savedEvent);
    }


    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<MainEventDTO>> getEventsByUser(@PathVariable Long userId) {
        List<MainEventDTO> events = mainEventService.getEventsByUser(userId);
        return ResponseEntity.ok(events);
    }


    @GetMapping("/{id}")
    public ResponseEntity<MainEventDTO> getMainEventById(@PathVariable Long id) {
        MainEventDTO mainEvent = mainEventService.getMainEventById(id);
        return mainEvent != null ? ResponseEntity.ok(mainEvent) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<MainEventDTO>> getAllMainEvents() {
        List<MainEventDTO> events = mainEventService.findAllEvents()
            .stream()
            .map(event -> new MainEventDTO(event.getEventId(), event.getName(), event.getLocation(), event.getMaxParticipants(),
                    event.getChatId(), event.getGameTypeId(), event.getEventDate(), event.getEventTime(), event.getDescription(),event.getCreatorId()))
            .collect(Collectors.toList());
        return ResponseEntity.ok(events);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MainEventDTO> updateMainEvent(@PathVariable Long id, @RequestBody MainEventDTO mainEventDTO) {
        MainEventDTO updatedEvent = mainEventService.updateMainEvent(id, mainEventDTO);
        return updatedEvent != null ? ResponseEntity.ok(updatedEvent) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMainEvent(@PathVariable Long id) {
        boolean isDeleted = mainEventService.deleteMainEvent(id);
        return isDeleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
