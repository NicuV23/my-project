package com.projectevents.controller;

import com.projectevents.dto.UserDTO;
import com.projectevents.entity.User;
import com.projectevents.security.JwtUtil;
import com.projectevents.service.LoginService;
import com.projectevents.service.UserService;
import com.projectevents.service.UserService.UsernameAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private LoginService loginService;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) {
        try {
            User user = loginService.authenticate(authRequest.getUsername(), authRequest.getPassword());
            final String jwt = jwtUtil.generateToken(user.getUsername());
            return ResponseEntity.ok(new AuthResponse(jwt));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Authentication failed: " + e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        try {
            UserDTO createdUser = userService.createUser(userDTO);
            return ResponseEntity.ok(createdUser);
        } catch (UsernameAlreadyExistsException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    static class AuthRequest {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    static class AuthResponse {
        private final String jwt;

        public AuthResponse(String jwt) {
            this.jwt = jwt;
        }

        public String getJwt() {
            return jwt;
        }
    }
}