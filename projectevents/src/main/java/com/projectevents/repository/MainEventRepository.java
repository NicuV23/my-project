package com.projectevents.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projectevents.entity.MainEvent;

public interface MainEventRepository extends JpaRepository<MainEvent, Long> {

	List<MainEvent> findByCreatorId(Long userId);

}


//Extinde JpaRepository, ceea ce înseamnă că moștenește metode pentru operații CRUD (Create, Read, Update, Delete) pentru entitățile MainEvent.