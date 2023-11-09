package com.example.tpbackend.service;

import com.example.tpbackend.DTO.SignatureDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerGetDTO;
import com.example.tpbackend.models.Signature;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import com.example.tpbackend.repository.SignatureRepository;
import com.example.tpbackend.repository.utilisateur.StudentRepository;
import com.example.tpbackend.service.utilisateur.EmployerService;
import jakarta.transaction.Transactional;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@NoArgsConstructor
public class SignatureService {
    @Autowired
    private SignatureRepository signatureRepository;

    @Autowired
    private EmployerService employerService;

    @Autowired
    private StudentRepository studentRepository;

    @Transactional
    public List<SignatureDTO> getSignature() {
        List<Signature> signatures = signatureRepository.findAll();
        List<SignatureDTO> signatureDTOS = new ArrayList<>();

        for (Signature signature: signatures) {
            signatureDTOS.add(signature.toSignatureDTO());
        }

        return signatureDTOS;
    }

    @Transactional
    public SignatureDTO saveEmployerSignature(SignatureDTO signatureDTO){
        Signature signature = signatureDTO.toSignature();
        signature.setEmployer(employerService.getEmployerById(signatureDTO.getEmployerId()));
        return signatureRepository.save(signature).toSignatureDTO();
    }

    @Transactional
    public Optional<SignatureDTO> getEmployerSignature(long employerId) {
        Signature signature = signatureRepository.findSignatureByEmployer_Id(employerId);
        return Optional.ofNullable(signature.toSignatureDTO());
    }

    @Transactional
    public SignatureDTO updateEmployerSignature(SignatureDTO signatureDTO) {
        Signature signature = signatureDTO.toSignature();
        signature.setEmployer(employerService.getEmployerById(signatureDTO.getEmployerId()));
        signatureRepository.updateSignatureByEmployer_Id(signatureDTO.getEmployerId(), signature.getImageLink());
        return signature.toSignatureDTO();
    }

    @Transactional
    public void deleteEmployerSignature(long id) {
        signatureRepository.deleteSignatureById(id);
    }

    @Transactional
    public SignatureDTO createStudentSignature(SignatureDTO dto){
        Student student = studentRepository.findByMatricule(dto.getStudentMatricule());
        Signature signature = new Signature();
        signature.setStudent(student);
        signature.setImageLink(dto.getImageLink());
        System.out.print(signature);
        signatureRepository.save(signature);
        student.setSignature(signature);
        studentRepository.save(student);
        return signature.toSignatureDTO();
    }

    @Transactional
    public SignatureDTO getStudentSignature(String matricule){
        Signature signature = signatureRepository.findSignatureByStudent_Matricule(matricule);
        if (signature == null)
            return null;
        return signature.toSignatureDTO();
    }

    @Transactional
    public SignatureDTO updateStudentSignature(SignatureDTO dto){
        Student student = studentRepository.findByMatricule(dto.getStudentMatricule());
        Signature signature = signatureRepository.findSignatureByStudent_Matricule(dto.getStudentMatricule());
        System.out.println(signature);
        signature.setImageLink(dto.getImageLink());
        student.setSignature(signature);
        System.out.println(dto.getImageLink());
        signatureRepository.save(signature);
        studentRepository.save(student);
        return signature.toSignatureDTO();
    }

    @Transactional
    public void deleteStudentSignature(String matricule){
        Student student = studentRepository.findByMatricule(matricule);
        Signature signature = signatureRepository.findSignatureByStudent_Matricule(matricule);
        signatureRepository.deleteSignatureByStudentMatricule(signature.getStudent().getMatricule());
        student.setSignature(null);
        studentRepository.save(student);
    }
}
