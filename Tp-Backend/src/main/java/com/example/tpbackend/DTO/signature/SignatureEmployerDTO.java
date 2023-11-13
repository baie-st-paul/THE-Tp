package com.example.tpbackend.DTO.signature;

import com.example.tpbackend.models.signature.SignatureEmployer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignatureEmployerDTO {
    private long employerId;
    private String imageLink;

    public SignatureEmployer toSignatureEmployer() {
        return new SignatureEmployer(
                imageLink
        );
    }
}
