package com.example.tpbackend.models.signature;

import com.example.tpbackend.DTO.signature.SignatureDTO;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Signature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "employer_id")
    private Employer employer;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "student_matricule")
    private Student student;

    @Lob
    @Column(name = "image_link")
    private String imageLink;


    public Signature(String imageLink) {
        this.imageLink = imageLink;
    }

    public SignatureDTO toSignatureDTO() {
        SignatureDTO dto = new SignatureDTO();
        if(employer != null)
            dto.setEmployerId(employer.getId());
        if(student != null)
            dto.setStudentMatricule(student.getMatricule());
        dto.setImageLink(imageLink);
        return dto;
    }
}
