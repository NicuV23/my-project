package com.projectevents.converter;

import com.projectevents.dto.GameTypeDTO;
import com.projectevents.entity.GameType;

public class GameTypeConverter {

    public static GameTypeDTO entityToDTO(GameType gameType) {
        return new GameTypeDTO(gameType.getTypeId(), gameType.getName());
    }

    public static GameType dtoToEntity(GameTypeDTO gameTypeDTO) {
        GameType gameType = new GameType();
        gameType.setTypeId(gameTypeDTO.getId());
        gameType.setName(gameTypeDTO.getName());
        return gameType;
    }
}
