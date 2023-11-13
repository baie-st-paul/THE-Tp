package com.example.tpbackend.DTO.signature;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignatureGestionnaireDTO {
    private String gestionnaireMatricule;
    private String imageLink;
}
