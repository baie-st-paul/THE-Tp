package com.example.tpbackend.repository;
import com.example.tpbackend.models.Candidature;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidatureRepository extends JpaRepository<Candidature, Integer> {
    @Query(value = "SELECT * FROM Candidature WHERE student_candidat = ?1",nativeQuery = true)
    List<Candidature> getAllCandidaturesByMatricule(String matricule);
    
    List<Candidature> findByOffreStageId(Long offerId);
}
