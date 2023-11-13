package com.example.tpbackend.service.signature;

import com.example.tpbackend.DTO.signature.SignatureEmployerDTO;
import com.example.tpbackend.models.signature.SignatureEmployer;
import com.example.tpbackend.repository.signature.SignatureEmployerRepository;
import com.example.tpbackend.service.utilisateur.EmployerService;
import jakarta.transaction.Transactional;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@NoArgsConstructor
public class SignatureEmployerService {
    @Autowired
    private SignatureEmployerRepository signatureEmployerRepository;
    @Autowired
    private EmployerService employerService;

    @Transactional
    public SignatureEmployerDTO getSignatureByEmployerId(long id) {
        SignatureEmployer signature = signatureEmployerRepository.findSignatureEmployerByEmployer_Id(id);
        if (signature == null)
            return null;
        return signature.toSignatureEmployerDTO();
    }

    @Transactional
    public SignatureEmployerDTO saveEmployerSignature(SignatureEmployerDTO signatureDTO) {
        SignatureEmployer signature = signatureDTO.toSignatureEmployer();
        signature.setEmployer(employerService.getEmployerById(signatureDTO.getEmployerId()));
        return signatureEmployerRepository.save(signature).toSignatureEmployerDTO();
    }

    @Transactional
    public SignatureEmployerDTO updateEmployerSignature(SignatureEmployerDTO signatureDTO) {
        SignatureEmployer signature = signatureDTO.toSignatureEmployer();
        signature.setEmployer(employerService.getEmployerById(signatureDTO.getEmployerId()));
        signatureEmployerRepository.updateSignatureEmployerByEmployer_Id(
                signatureDTO.getEmployerId(),
                signature.getImageLink());
        return signature.toSignatureEmployerDTO();
    }

}
