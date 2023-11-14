package com.example.tpbackend.service.signature;


import com.example.tpbackend.DTO.signature.SignatureGestionnaireDTO;
import com.example.tpbackend.models.signature.SignatureGestionnaire;
import com.example.tpbackend.models.utilisateur.gestionnaire.Gestionnaire;
import com.example.tpbackend.repository.signature.SignatureGestionnaireRepository;
import com.example.tpbackend.repository.utilisateur.GestionnaireRepository;
import jakarta.transaction.Transactional;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@NoArgsConstructor
public class SignatureGestionnaireService {
    @Autowired
    private SignatureGestionnaireRepository signatureGestionnaireRepository;
    @Autowired
    private GestionnaireRepository gestionnaireRepository;

    @Transactional
    public SignatureGestionnaireDTO saveGestionnaireSignature(SignatureGestionnaireDTO dto){
        Gestionnaire gestionnaire = gestionnaireRepository.findByMatricule(dto.getGestionnaireMatricule());
        SignatureGestionnaire signature = dto.toSignatureGestionnaire();
        signature.setImageLink(dto.getImageLink());
        signature.setGestionnaire(gestionnaireRepository.findByMatricule(dto.getGestionnaireMatricule()));
        gestionnaire.setSignature(signature);
        gestionnaireRepository.save(gestionnaire);
        return signatureGestionnaireRepository.save(signature).toSignatureGestionnaireDTO();
    }

    @Transactional
    public SignatureGestionnaireDTO updateGestionnaireSignature(SignatureGestionnaireDTO dto){
        Gestionnaire gestionnaire = gestionnaireRepository.findByMatricule(dto.getGestionnaireMatricule());
        SignatureGestionnaire signature = dto.toSignatureGestionnaire();
        signature.setImageLink(dto.getImageLink());
        signature.setGestionnaire(gestionnaire);
        gestionnaire.setSignature(signature);
        signatureGestionnaireRepository.save(signature);
        gestionnaireRepository.save(gestionnaire);
        return signature.toSignatureGestionnaireDTO();
    }

    @Transactional
    public SignatureGestionnaireDTO getGestionnaireSignature(String matricule){
        SignatureGestionnaire signature = signatureGestionnaireRepository.findByGestionnaire_Matricule(matricule);
        if(signature == null)
            return null;
        return signature.toSignatureGestionnaireDTO();
    }
}
