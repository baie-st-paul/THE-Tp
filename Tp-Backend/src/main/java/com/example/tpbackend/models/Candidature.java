package com.example.tpbackend.models;

import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.DTO.candidature.CandidatureGetDTO;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import com.example.tpbackend.utils.ByteArrayMultipartFile;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Entity
@NoArgsConstructor
public class Candidature {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "candidature_id", nullable = false)
    private Long id;

    @Column(name = "lettre_motivation")
    private byte[] lettre_motivation;

    private String fileName;

    @ManyToOne
    @JoinColumn(name = "student_candidat",nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "ofrre_stage",nullable=false)
    private OffreStage offreStage;

    @ManyToOne
    @JoinColumn(name = "cv_student",nullable = false)
    private Cv cvStudent;

    public Candidature(byte[] lettre_motivation, Student student, OffreStage offreStage, Cv cvStudent,String fileName) {
        this.lettre_motivation = lettre_motivation;
        this.student = student;
        this.offreStage = offreStage;
        this.cvStudent = cvStudent;
        this.fileName = fileName;
    }

    public CandidatureGetDTO toCandidatureGetDTO(){
        byte[] yourByteArray = this.lettre_motivation;
        String originalFilename = fileName;
        String contentType = "application/pdf";

        MultipartFile multipartFile = new ByteArrayMultipartFile(fileName, originalFilename, contentType, yourByteArray);
        return new CandidatureGetDTO(this.student.getMatricule(),this.offreStage.toOffreStageDTO(),this.fileName, multipartFile);
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setLettre_motivation(byte[] lettre_motivation) {
        this.lettre_motivation = lettre_motivation;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public void setOffreStage(OffreStage offreStage) {
        this.offreStage = offreStage;
    }

    public void setCvStudent(Cv cvStudent) {
        this.cvStudent = cvStudent;
    }
}
