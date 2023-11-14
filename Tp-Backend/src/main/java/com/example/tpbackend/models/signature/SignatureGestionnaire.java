package com.example.tpbackend.models.signature;


import com.example.tpbackend.DTO.signature.SignatureEmployerDTO;
import com.example.tpbackend.DTO.signature.SignatureGestionnaireDTO;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.models.utilisateur.gestionnaire.Gestionnaire;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignatureGestionnaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "gestionnaire_matricule")
    private Gestionnaire gestionnaire;

    @Lob
    @Column(name = "image_link")
    private String imageLink;

    public SignatureGestionnaire(String imageLink) {
        this.imageLink = imageLink;
    }

    public SignatureGestionnaireDTO toSignatureGestionnaireDTO() {
        SignatureGestionnaireDTO dto = new SignatureGestionnaireDTO();
        dto.setGestionnaireMatricule(gestionnaire.getMatricule());
        dto.setImageLink(imageLink);
        return dto;
    }
}
