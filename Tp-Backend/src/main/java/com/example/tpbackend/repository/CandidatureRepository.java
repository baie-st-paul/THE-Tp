package com.example.tpbackend.repository;
import com.example.tpbackend.models.Candidature;
import java.util.List;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidatureRepository extends JpaRepository<Candidature, Integer> {
    @Query("SELECT c FROM Candidature c WHERE c.student.matricule = ?1")
    List<Candidature> getAllCandidaturesByMatricule(String matricule);
    
    List<Candidature> findByOffreStageId(Long offerId);

    @Modifying
    @Transactional
    @Query("UPDATE Candidature SET status = ?2 WHERE student.matricule = ?1")
    void updateCandidatureStatusByMatricule(String matricule, Candidature.Status status);

    List<Candidature> findByStatus(Candidature.Status status);
}
