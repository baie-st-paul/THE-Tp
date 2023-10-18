package com.example.tpbackend.repository;

import com.example.tpbackend.DTO.candidature.CandidatureDTO;
import com.example.tpbackend.models.Candidature;
import com.example.tpbackend.models.Entrevue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EntrevueRepository extends JpaRepository<Entrevue, Long> {

    // Ici j'utilise une requête JPQL pour récupérer les candidatures qui ont une entrevue avec le status fourni en paramètre
    @Query("SELECT c FROM Candidature c WHERE c.student.matricule IN (SELECT e.student.matricule FROM Entrevue e WHERE e.status = :status)")
    List<Candidature> findStudentWithEntrevue(@Param("status") Entrevue.Status status);
}
