package com.projectevents.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projectevents.entity.MainEvent;

public interface MainEventRepository extends JpaRepository<MainEvent, Long> {
}
