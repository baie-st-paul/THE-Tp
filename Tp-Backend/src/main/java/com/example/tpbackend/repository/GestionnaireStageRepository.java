package com.example.tpbackend.repository;

import com.example.tpbackend.models.GestionnaireStage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GestionnaireStageRepository extends JpaRepository<GestionnaireStage, Long> {

}
