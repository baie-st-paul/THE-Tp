package com.example.tpbackend.DTO;

import com.example.tpbackend.models.Signature;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignatureDTO {
    private String userId;
    private String imageLink;

    public SignatureDTO(Signature signature){
        this.userId = signature.getUser().getId() + "";
        this.imageLink = signature.getImageLink();
    }
}

