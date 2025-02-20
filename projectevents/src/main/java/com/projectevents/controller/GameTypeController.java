package com.projectevents.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.projectevents.dto.GameTypeDTO;
import com.projectevents.service.GameTypeService;

@CrossOrigin
@RestController
@RequestMapping("/api/game-types")
public class GameTypeController {

    @Autowired
    private GameTypeService gameTypeService;

    @PostMapping
    public ResponseEntity<GameTypeDTO> createGameType(@RequestBody GameTypeDTO gameTypeDTO) {
        GameTypeDTO createdGameType = gameTypeService.createGameType(gameTypeDTO);
        return ResponseEntity.ok(createdGameType);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameTypeDTO> getGameTypeById(@PathVariable Long id) {
        GameTypeDTO gameType = gameTypeService.getGameTypeById(id);
        return gameType != null ? ResponseEntity.ok(gameType) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<GameTypeDTO> updateGameType(@PathVariable Long id, @RequestBody GameTypeDTO gameTypeDTO) {
        GameTypeDTO updatedGameType = gameTypeService.updateGameType(id, gameTypeDTO);
        return updatedGameType != null ? ResponseEntity.ok(updatedGameType) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGameType(@PathVariable Long id) {
        boolean deleted = gameTypeService.deleteGameType(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
    
    @GetMapping
    public ResponseEntity<List<GameTypeDTO>> getAllGameTypes() {
        List<GameTypeDTO> gameTypes = gameTypeService.getAllGameTypes();
        return ResponseEntity.ok(gameTypes);
    }


}
