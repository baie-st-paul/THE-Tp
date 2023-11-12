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
        System.out.print("dto "+dto);
        System.out.print("signature "+signature);
        return signatureStudentRepository.save(signature).toSignatureStudentDTO();
    }

    @Transactional
    public SignatureStudentDTO updateStudentSignature(SignatureStudentDTO dto) {
        SignatureStudent signature = dto.toSignatureStudent();
        signature.setStudent(studentRepository.findByMatricule(dto.getStudentMatricule()));
        System.out.println(signature);
        signatureStudentRepository.updateSignatureStudentByStudent_Matricule(
                dto.getStudentMatricule(),
                signature.getImageLink()
        );
        return signature.toSignatureStudentDTO();
    }

    @Transactional
    public void deleteSignatureByStudentMatricule(String matricule) {
        signatureStudentRepository.deleteSignatureStudentByStudentMatricule(matricule);
    }
}
