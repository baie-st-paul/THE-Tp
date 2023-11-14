package com.example.tpbackend.repository.signature;

import com.example.tpbackend.models.signature.SignatureGestionnaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SignatureGestionnaireRepository extends JpaRepository<SignatureGestionnaire, Long> {
    SignatureGestionnaire findByGestionnaire_Matricule(String matricule);

}
