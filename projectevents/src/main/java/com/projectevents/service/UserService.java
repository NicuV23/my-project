package com.projectevents.service;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.projectevents.dto.UserDTO;
import com.projectevents.entity.Role;
import com.projectevents.entity.User;
import com.projectevents.repository.RoleRepository;
import com.projectevents.repository.UserRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {  

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RoleRepository roleRepository;
    
    public UserDTO createUser(UserDTO userDTO) {
        if (userRepository.findByUsername(userDTO.getUsername()).isPresent()) {
            throw new UsernameAlreadyExistsException("Username already exists");
        }

        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        
        String hashedPassword = BCrypt.hashpw(userDTO.getPassword(), BCrypt.gensalt());
        user.setPassword(hashedPassword);

//        Set<Role> roles = new HashSet<>();
//        for (String roleName : userDTO.getRoles()) {  
//            Role role = roleRepository.findByName(roleName)
//                .orElseThrow(() -> new IllegalArgumentException("Role not found: " + roleName));
//            roles.add(role);
//        }
//        user.setRoles(roles);

        userRepository.save(user);
        return new UserDTO(user.getId(), user.getUsername(), user.getEmail(), user.getPassword());
    }
    
    public class UsernameAlreadyExistsException extends RuntimeException {
        public UsernameAlreadyExistsException(String message) {
            super(message);
        }
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