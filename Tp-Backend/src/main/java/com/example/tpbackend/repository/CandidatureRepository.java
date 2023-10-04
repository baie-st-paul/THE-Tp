package com.example.tpbackend.repository;

import com.example.tpbackend.DTO.candidature.CandidatureGetDTO;
import com.example.tpbackend.models.Candidature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CandidatureRepository extends JpaRepository<Candidature, Integer> {
    @Query("SELECT lettre_motivation,fileName,offreStage,student,cvStudent FROM Candidature WHERE student.matricule = ?1")
    List<Candidature> getAllCandidaturesByMatricule(String matricule);
}
