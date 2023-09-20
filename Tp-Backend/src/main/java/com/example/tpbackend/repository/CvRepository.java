package com.example.tpbackend.repository;

import com.example.tpbackend.models.Cv;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CvRepository extends JpaRepository<Cv, String> {
    List<Cv> getAllByFileName(String fileName);
    @Query(value = "SELECT count(c) FROM Cv c")
    int nbrCvs();

    @Modifying
    @Transactional
    @Query("UPDATE Cv  SET file_cv = ?3, fileName = ?2, status = ?4 WHERE matricule = ?1")
    void updateCvWhenStudentHaveCv(String matricule, String fileName, byte[] cv, Cv.StatusCV status);

    @Modifying
    @Transactional
    @Query("UPDATE Cv  SET status = ?2 WHERE matricule = ?1")
    void updateCvStatusByMatricule(String matricule,Cv.StatusCV statusCV);
}
