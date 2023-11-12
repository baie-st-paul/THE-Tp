package com.example.tpbackend.repository;
import com.example.tpbackend.models.ContratStage;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Query;

@Repository
public interface ContratStageRepository extends JpaRepository<ContratStage, Long> {

    @Query("SELECT c FROM ContratStage c WHERE c.id = ?1")
    ContratStage findContratStageById(long contratId);

    List<ContratStage> findByStudentMatricule(String matricule);
    
    List<ContratStage> findByEmployeur_Id(Long employeurId);
}