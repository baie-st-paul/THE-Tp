package com.example.tpbackend.repository;

import com.example.tpbackend.models.Candidature;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CandidatureRepository extends JpaRepository<Candidature, Integer> {
    List<Candidature> findByOffreStageId(Long offerId);
}
