package com.example.tpbackend.models;

import com.example.tpbackend.DTO.SignatureDTO;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
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

    @Lob
    @Column(name = "image_link")
    private String imageLink;

    public Signature(String imageLink) {
        this.imageLink = imageLink;
    }

    public SignatureDTO toSignatureDTO() {
        return new SignatureDTO(
                employer.getId(),
                imageLink
        );
    }
}
