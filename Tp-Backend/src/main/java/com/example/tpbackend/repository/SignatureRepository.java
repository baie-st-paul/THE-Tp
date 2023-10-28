package com.example.tpbackend.repository;

import com.example.tpbackend.models.Signature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SignatureRepository extends JpaRepository<Signature, Long> {
    Signature findByEmployer_Utilisateur_Email(String email);
}
