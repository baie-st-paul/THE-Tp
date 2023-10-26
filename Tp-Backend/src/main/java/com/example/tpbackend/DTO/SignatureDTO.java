package com.example.tpbackend.DTO;

import com.example.tpbackend.models.Signature;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignatureDTO {
    private String userEmail;
    private String imageLink;

    public SignatureDTO(Signature signature){
        this.userEmail = signature.getUser().getEmail() + "";
        this.imageLink = signature.getImageLink();
    }
}

