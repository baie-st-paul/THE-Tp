package com.example.tpbackend.repository;

import com.example.tpbackend.models.ContratStage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContratStageRepository extends JpaRepository<ContratStage, Long> {
    List<ContratStage> findByEmployeur_Id(Long employeurId);
}
