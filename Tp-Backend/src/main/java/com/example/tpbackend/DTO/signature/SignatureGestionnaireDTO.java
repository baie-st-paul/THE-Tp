package com.example.tpbackend.DTO.signature;


import com.example.tpbackend.models.signature.SignatureGestionnaire;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignatureGestionnaireDTO {
    private String gestionnaireMatricule;
    private String imageLink;

    public SignatureGestionnaire toSignatureGestionnaire() {
        return new SignatureGestionnaire(
                imageLink
        );
    }
}
