package com.example.tpbackend.repository;
import com.example.tpbackend.models.ContratStage;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import org.springframework.stereotype.Repository;


@Repository
public interface ContratStageRepository extends JpaRepository<ContratStage, Long> {
    List<ContratStage> findByStudentMatricule(String matricule);
    
    List<ContratStage> findByEmployeur_Id(Long employeurId);

    @Modifying
    @Transactional
    @Query("UPDATE ContratStage SET statutVuPasVuG = ?2   WHERE student.matricule =  ?1")
    void updateStatusVuPasVuGByMatricule(String matricule, ContratStage.StatusVuPasVu statutContrat);

    @Modifying
    @Transactional
    @Query("UPDATE ContratStage SET statutVuPasVuE = ?2   WHERE student.matricule =  ?1")
    void updateStatusVuPasVuEByMatricule(String matricule, ContratStage.StatusVuPasVu statutContrat);
}
