package com.example.tpbackend.models.signature;

import com.example.tpbackend.DTO.signature.SignatureEmployerDTO;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignatureEmployer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "employer_id")
    private Employer employer;

    @Lob
    @Column(name = "image_link")
    private String imageLink;

    public SignatureEmployer(String imageLink) {
        this.imageLink = imageLink;
    }

    public SignatureEmployerDTO toSignatureEmployerDTO() {
        SignatureEmployerDTO dto = new SignatureEmployerDTO();
        dto.setEmployerId(employer.getId());
        dto.setImageLink(imageLink);
        return dto;
    }
}
