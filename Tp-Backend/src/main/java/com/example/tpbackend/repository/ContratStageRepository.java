package com.example.tpbackend.repository;
import com.example.tpbackend.models.ContratStage;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ContratStageRepository extends JpaRepository<ContratStage, Long> {
    List<ContratStage> findByStudentMatricule(String matricule);
    
    List<ContratStage> findByEmployeur_Id(Long employeurId);
}