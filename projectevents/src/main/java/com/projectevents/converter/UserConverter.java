package com.projectevents.converter;

import com.projectevents.dto.UserDTO;
import com.projectevents.entity.User;

public class UserConverter {

    public static UserDTO entityToDTO(User user) {
        return new UserDTO(user.getId(), user.getUsername(), user.getEmail(), user.getPassword());
    }

    public static User dtoToEntity(UserDTO userDTO) {
        User user = new User();
        user.setUserId(userDTO.getId());
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        return user;
    }
}
