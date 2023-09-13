package com.example.tpbackend.repository;

import com.example.tpbackend.models.OffreStage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OffreStageRepository extends JpaRepository<OffreStage, Integer> {

    Optional<OffreStage> findOffreById(Long id);


}