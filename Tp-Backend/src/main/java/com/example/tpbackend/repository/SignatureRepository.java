package com.example.tpbackend.repository;

import com.example.tpbackend.models.Cv;
import com.example.tpbackend.models.Signature;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SignatureRepository extends JpaRepository<Signature, Long> {
    @Query("SELECT s FROM Signature s WHERE s.employer.id = ?1")
    Signature findSignatureByEmployer_Id(long employerId);

    @Modifying
    @Transactional
    @Query("UPDATE Signature SET imageLink = ?2 WHERE employer.id = ?1")
    void updateSignatureByEmployer_Id(long employerId, String imageLink);

    Optional<Signature> findSignatureById(long id);

    @Modifying
    @Transactional
    @Query("DELETE FROM Signature s WHERE s.employer.id = ?1")
    void deleteSignatureById(long id);

    Signature findSignatureByStudent_Matricule(String matricule);
}
