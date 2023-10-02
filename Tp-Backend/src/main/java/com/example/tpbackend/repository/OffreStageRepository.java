package com.example.tpbackend.repository;

import com.example.tpbackend.models.OffreStage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OffreStageRepository extends JpaRepository<OffreStage, Long> {
    Optional<OffreStage> findOffreById(Long id);
    List<OffreStage> findAllByTitre(String titre);
}
