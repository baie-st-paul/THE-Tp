package com.example.tpbackend.repository;

import com.example.tpbackend.DTO.candidature.CandidatureGetDTO;
import com.example.tpbackend.models.Candidature;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CandidatureRepository extends JpaRepository<Candidature, Integer> {
    @Query(value = "SELECT * FROM Candidature WHERE student_candidat = ?1",nativeQuery = true)
    List<Candidature> getAllCandidaturesByMatricule(String matricule);
}
