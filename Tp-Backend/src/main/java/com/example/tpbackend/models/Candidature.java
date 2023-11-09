package com.example.tpbackend.models;
import com.example.tpbackend.DTO.candidature.CandidatureGetDTO;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import com.example.tpbackend.utils.ByteArrayMultipartFile;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Entity
@Data
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
    @JoinColumn(name = "offre_stage",nullable=false)
    private OffreStage offreStage;

    @ManyToOne
    @JoinColumn(name = "cv_student",nullable = false)
    private Cv cvStudent;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name = "tag_name")
    private String tagName;


    public Candidature(byte[] lettre_motivation, Student student,
                       OffreStage offreStage, Cv cvStudent,String fileName, Status status) {
        this.lettre_motivation = lettre_motivation;
        this.student = student;
        this.offreStage = offreStage;
        this.cvStudent = cvStudent;
        this.fileName = fileName;
        this.status = status;
    }

    public byte[] getLettreMotivation() {
        return lettre_motivation;
    }

    public CandidatureGetDTO toCandidatureGetDTO(){
        byte[] yourByteArray = this.lettre_motivation;
        String originalFilename = fileName;
        String contentType = "application/pdf";

        MultipartFile multipartFile = new ByteArrayMultipartFile(fileName, originalFilename, contentType, yourByteArray);
        return new CandidatureGetDTO(this.student.getMatricule(),this.offreStage.toOffreStageDTO(),this.fileName, multipartFile);
    }

    public String getTagName() {
        return tagName;
    }

    public void setTagName(String tagName) {
        this.tagName = tagName;
    }

    public enum Status {
        Accepted,
        In_review,
        Refused,
    }
}
