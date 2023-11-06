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
    public SignatureStudentDTO createStudentSignature(SignatureStudentDTO dto){
        Student student = studentRepository.findByMatricule(dto.getStudentMatricule());
        SignatureStudent signature = new SignatureStudent();
        signature.setStudent(student);
        signature.setImageLink(dto.getImageLink());
        System.out.print(signature);
        signatureStudentRepository.save(signature);
        student.setSignatureStudent(signature);
        studentRepository.save(student);
        return signature.toSignatureStudentDTO();
    }

    @Transactional
    public SignatureStudentDTO getStudentSignature(String matricule){
        SignatureStudent signature = signatureStudentRepository.findSignatureStudentByStudentMatricule(matricule);
        if (signature == null)
            return null;
        return signature.toSignatureStudentDTO();
    }

    @Transactional
    public SignatureStudentDTO updateStudentSignature(SignatureStudentDTO dto){
        Student student = studentRepository.findByMatricule(dto.getStudentMatricule());
        SignatureStudent signature = signatureStudentRepository.findSignatureStudentByStudentMatricule(dto.getStudentMatricule());
        System.out.println(signature);
        signature.setImageLink(dto.getImageLink());
        student.setSignatureStudent(signature);
        System.out.println(dto.getImageLink());
        signatureStudentRepository.save(signature);
        studentRepository.save(student);
        return signature.toSignatureStudentDTO();
    }

    @Transactional
    public void deleteStudentSignature(String matricule){
        Student student = studentRepository.findByMatricule(matricule);
        SignatureStudent signature = signatureStudentRepository.findSignatureStudentByStudentMatricule(matricule);
        signatureStudentRepository.deleteSignatureStudentByStudentMatricule(signature.getStudent().getMatricule());
        student.setSignature(null);
        studentRepository.save(student);
    }
}
