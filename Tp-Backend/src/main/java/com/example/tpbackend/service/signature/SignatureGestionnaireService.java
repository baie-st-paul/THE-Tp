package com.example.tpbackend.service.signature;


import com.example.tpbackend.repository.signature.SignatureGestionnaireRepository;
import com.example.tpbackend.service.utilisateur.GestionnaireService;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@NoArgsConstructor
public class SignatureGestionnaireService {
    private SignatureGestionnaireRepository signatureGestionnaireRepository;
    private GestionnaireService gestionnaireService;
}
