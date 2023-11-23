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

    @Query("SELECT c FROM ContratStage c WHERE c.candidature.student.matricule = ?1")
    List<ContratStage> findByStudentMatricule(String matricule);

    @Query("SELECT c FROM ContratStage c WHERE c.candidature.offreStage.employer.id = ?1")
    List<ContratStage> findByEmployeur_Id(Long employeurId);

    @Modifying
    @Transactional
    @Query("UPDATE ContratStage SET statutVuPasVuG = ?2   WHERE candidature.student.matricule =  ?1")
    void updateStatusVuPasVuGByMatricule(String matricule, ContratStage.StatusVuPasVu statutContrat);

    @Modifying
    @Transactional
    @Query("UPDATE ContratStage SET statutVuPasVuS = ?2 WHERE candidature.student.matricule =  ?1")
    void updateStatusVuPasVuSByMatricule(String matricule, ContratStage.StatusVuPasVu statutContrat);

    @Modifying
    @Transactional
    @Query("UPDATE ContratStage SET statutVuPasVuE = ?2   WHERE candidature.student.matricule =  ?1")
    void updateStatusVuPasVuEByMatricule(String matricule, ContratStage.StatusVuPasVu statutContrat);
}
