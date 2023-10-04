package com.example.tpbackend.repository;

import com.example.tpbackend.models.OffreStage;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OffreStageRepository extends JpaRepository<OffreStage, Integer> {
    Optional<OffreStage> findOffreById(long id);
    List<OffreStage> findAllByStudentProgram(String program);

    @Modifying
    @Transactional
    @Query("UPDATE OffreStage SET status = ?2 WHERE titre = ?1")
    void updateOffreStatusByTitre(String titre, OffreStage.Status statusOffre);

    List<OffreStage> findAllByTitre(String titre);

    @Query("SELECT o FROM OffreStage o WHERE o.employer.id = ?1")
    List<OffreStage> findAllByEmployer(long id);

    boolean deleteOffreStageById(long id);
}
