package com.example.tpbackend.repository.signature;

import com.example.tpbackend.models.signature.SignatureEmployer;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SignatureEmployerRepository extends JpaRepository<SignatureEmployer, Long> {
    @Query("SELECT s FROM SignatureEmployer s WHERE s.employer.id = ?1")
    SignatureEmployer findSignatureEmployerByEmployer_Id(long employerId);

    @Modifying
    @Transactional
    @Query("UPDATE SignatureEmployer SET imageLink = ?2 WHERE employer.id = ?1")
    void updateSignatureEmployerByEmployer_Id(long employerId, String imageLink);

    @Modifying
    @Transactional
    @Query("DELETE FROM SignatureEmployer s WHERE s.employer.id = ?1")
    void deleteSignatureEmployerByEmployer_Id(long id);
}
