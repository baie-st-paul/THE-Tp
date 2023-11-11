package com.example.tpbackend.repository;

import com.example.tpbackend.models.ContratStage;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ContratStageRepository extends JpaRepository<ContratStage, Long> {
    List<ContratStage> findByEmployeur_Id(Long employeurId);

    @Modifying
    @Transactional
    @Query("UPDATE ContratStage SET statutGestionnaire = ?2   WHERE student.matricule =  ?1")
    void updateStatusByMatricule(String matricule, ContratStage.Statut statutContrat);
}
