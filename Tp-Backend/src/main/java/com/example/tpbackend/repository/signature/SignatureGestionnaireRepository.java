package com.example.tpbackend.repository.signature;

import com.example.tpbackend.models.signature.SignatureGestionnaire;
import org.springframework.stereotype.Repository;

@Repository
public interface SignatureGestionnaireRepository {
    SignatureGestionnaire findByGestionnaire_Matricule();


}
