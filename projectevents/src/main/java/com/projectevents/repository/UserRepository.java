package com.projectevents.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projectevents.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
