package com.example.tpbackend.repository.signature;

import com.example.tpbackend.models.signature.SignatureGestionnaire;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SignatureGestionnaireRepository extends JpaRepository<SignatureGestionnaire, Long> {
    SignatureGestionnaire findByGestionnaire_Matricule(String matricule);

    @Modifying
    @Transactional
    @Query("UPDATE SignatureGestionnaire SET imageLink = ?2 WHERE gestionnaire.matricule = ?1")
    void updateSignatureGestionnairesByGestionnaire_Matricule(String matricule, String imageLink);
}
