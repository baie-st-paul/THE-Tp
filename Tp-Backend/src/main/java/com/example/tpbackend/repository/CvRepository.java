package com.example.tpbackend.repository;

import com.example.tpbackend.models.Cv;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CvRepository extends JpaRepository<Cv, String> {
    List<Cv> getAllByFileName(String fileName);

    @Modifying
    @Transactional
    @Query("UPDATE Cv SET file_cv = ?3, fileName = ?2, status = ?4 WHERE matricule = ?1")
    void updateCvWhenStudentHaveCv(String matricule, String fileName, byte[] cv, Cv.Status status);

    @Modifying
    @Transactional
    @Query("UPDATE Cv SET status = ?2 WHERE matricule = ?1")
    void updateCvStatusByMatricule(String matricule, Cv.Status status);

    @Modifying
    @Transactional
    @Query("UPDATE Cv SET statusVuPasVuG = ?2 WHERE matricule = ?1")
    void updateCvStatusVuPasVuGByMatricule(String matricule, Cv.StatusVuPasVu status);

    @Query("SELECT cv FROM Cv cv WHERE cv.matricule = ?1")
    Cv findCvByMatricule(@Param("matricule_student") String matricule);
}
