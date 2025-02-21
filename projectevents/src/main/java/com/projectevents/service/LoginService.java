package com.projectevents.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.projectevents.entity.User;
import com.projectevents.repository.UserRepository;

@Service  
public class LoginService {
  
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;  

    public LoginService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User authenticate(String username, String password) throws Exception {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new Exception("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new Exception("Password mismatch");
        }  

        return user;
    }
}
