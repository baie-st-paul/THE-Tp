package com.example.tpbackend.models.signature;

import com.example.tpbackend.DTO.signature.SignatureStudentDTO;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignatureStudent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "student_matricule")
    private Student student;

    @Lob
    @Column(name = "image_link")
    private String imageLink;

    public SignatureStudent(String imageLink) {
        this.imageLink = imageLink;
    }

    public SignatureStudentDTO toSignatureStudentDTO() {
        SignatureStudentDTO dto = new SignatureStudentDTO();
        dto.setStudentMatricule(student.getMatricule());
        dto.setImageLink(imageLink);
        return dto;
    }
}
