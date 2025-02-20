package com.projectevents.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectevents.dto.GameTypeDTO;
import com.projectevents.entity.GameType;
import com.projectevents.repository.GameTypeRepository;

@Service
public class GameTypeService {

    @Autowired
    private GameTypeRepository gameTypeRepository;

    public GameTypeDTO createGameType(GameTypeDTO gameTypeDTO) {
        GameType gameType = new GameType();
        gameType.setName(gameTypeDTO.getName());
        gameType = gameTypeRepository.save(gameType);
        return new GameTypeDTO(gameType.getTypeId(), gameType.getName());
    }
    
    public List<GameTypeDTO> getAllGameTypes() {
        return gameTypeRepository.findAll().stream()
            .map(gameType -> new GameTypeDTO(gameType.getTypeId(), gameType.getName()))
            .collect(Collectors.toList());
    }


    public GameTypeDTO getGameTypeById(Long id) {
        return gameTypeRepository.findById(id)
            .map(gameType -> new GameTypeDTO(gameType.getTypeId(), gameType.getName()))
            .orElse(null);
    }

    public GameTypeDTO updateGameType(Long id, GameTypeDTO gameTypeDTO) {
        return gameTypeRepository.findById(id)
            .map(gameType -> {
                gameType.setName(gameTypeDTO.getName());
                gameTypeRepository.save(gameType);
                return new GameTypeDTO(gameType.getTypeId(), gameType.getName());
            })
            .orElse(null);
    }
    
    
    public boolean deleteGameType(Long id) {
        if (gameTypeRepository.existsById(id)) {
            gameTypeRepository.deleteById(id);
            return true;
        }
        
        
        return false;
    }
}
