package com.projectevents.service;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.projectevents.dto.UserDTO;
import com.projectevents.entity.User;
import com.projectevents.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    public UserDTO createUser(UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        
        String hashedPassword = BCrypt.hashpw(userDTO.getPassword(), BCrypt.gensalt());
        user.setPassword(hashedPassword);
        userRepository.save(user);
        return new UserDTO(user.getId(), user.getUsername(), user.getEmail(), user.getPassword());
    }
    
    public User findUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
    
    public UserDTO getUserById(Long id) {
        return userRepository.findById(id)
            .map(user -> new UserDTO(user.getId(), user.getUsername(), user.getEmail(), user.getPassword()))
            .orElse(null);
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
            .map(user -> new UserDTO(user.getId(), user.getUsername(), user.getEmail(), user.getPassword()))
            .collect(Collectors.toList());
    }

    public UserDTO updateUser(Long id, UserDTO userDTO) {
        return userRepository.findById(id).map(user -> {
            user.setUsername(userDTO.getUsername());
            user.setEmail(userDTO.getEmail());
            String hashedPassword = BCrypt.hashpw(userDTO.getPassword(), BCrypt.gensalt());
            user.setPassword(hashedPassword);
            userRepository.save(user);
            return new UserDTO(user.getId(), user.getUsername(), user.getEmail(), user.getPassword());
        }).orElse(null);
    }

    public boolean deleteUser(Long id) {
        return userRepository.findById(id).map(user -> {
            userRepository.delete(user);
            return true;
        }).orElse(false);
    }
}
