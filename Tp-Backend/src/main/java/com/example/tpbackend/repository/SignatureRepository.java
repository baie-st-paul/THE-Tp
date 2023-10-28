package com.example.tpbackend.repository;

import com.example.tpbackend.models.Signature;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SignatureRepository extends JpaRepository<Signature, Long> {
    Signature findByEmployer_Id(long employerId);
    Optional<Signature> findSignatureById(long id);

    @Modifying
    @Transactional
    @Query("DELETE FROM Signature WHERE id = ?1")
    void deleteSignatureById(long id);
}
