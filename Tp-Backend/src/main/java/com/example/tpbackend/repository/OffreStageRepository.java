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
public interface OffreStageRepository extends JpaRepository<OffreStage, Long> {
    Optional<OffreStage> findOffreById(long id);

    OffreStage getOffreById(Long id);

    @Modifying
    @Transactional
    @Query("UPDATE OffreStage SET status = ?2 WHERE titre = ?1")
    void updateOffreStatusByTitre(String titre, OffreStage.Status statusOffre);

    @Modifying
    @Transactional
    @Query("UPDATE OffreStage SET statusVuPasVuG = ?2 WHERE titre = ?1")
    void updateOffreStatusVuPasVuGByTitre(String titre, OffreStage.StatusVuPasVu statusOffre);

    @Modifying
    @Transactional
    @Query("UPDATE OffreStage SET statusVuPasVuS = ?2 WHERE titre = ?1")
    void updateOffreStatusVuPasVuSByTitre(String titre, OffreStage.StatusVuPasVu statusOffre);

    @Query("SELECT o FROM OffreStage o WHERE o.employer.utilisateur.id = ?1")
    List<OffreStage> findAllByEmployer(long id);

    @Modifying
    @Transactional
    @Query("DELETE FROM OffreStage WHERE id = ?1")
    void deleteOffreStageById(long id);
}
