package com.example.tpbackend.service.signature;

import com.example.tpbackend.DTO.signature.SignatureStudentDTO;
import com.example.tpbackend.models.signature.SignatureStudent;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import com.example.tpbackend.repository.signature.SignatureStudentRepository;
import com.example.tpbackend.repository.utilisateur.StudentRepository;
import jakarta.transaction.Transactional;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@NoArgsConstructor
public class SignatureStudentService {
    @Autowired
    private SignatureStudentRepository signatureStudentRepository;
    @Autowired
    private StudentRepository studentRepository;

    @Transactional
    public SignatureStudentDTO getSignatureByStudentMatricule(String matricule) {
        SignatureStudent signature = signatureStudentRepository.findSignatureStudentByStudentMatricule(matricule);
        if (signature == null)
            return null;
        return signature.toSignatureStudentDTO();
    }

    @Transactional
    public SignatureStudentDTO saveStudentSignature(SignatureStudentDTO dto) {
        SignatureStudent signature = dto.toSignatureStudent();
        signature.setStudent(studentRepository.findByMatricule(dto.getStudentMatricule()));
        return signatureStudentRepository.save(signature).toSignatureStudentDTO();
    }

    @Transactional
    public SignatureStudentDTO updateStudentSignature(SignatureStudentDTO dto) {
        SignatureStudent signature = dto.toSignatureStudent();
        signature.setStudent(studentRepository.findByMatricule(dto.getStudentMatricule()));
        signatureStudentRepository.updateSignatureStudentByStudent_Matricule(
                dto.getStudentMatricule(),
                signature.getImageLink()
        );
        return signature.toSignatureStudentDTO();
    }

}
