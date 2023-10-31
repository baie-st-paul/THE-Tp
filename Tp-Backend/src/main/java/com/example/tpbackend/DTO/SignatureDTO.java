package com.example.tpbackend.DTO;

import com.example.tpbackend.models.Signature;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignatureDTO {
    private long employerId;
    private String imageLink;

    public Signature toSignature() {
        return new Signature(
                imageLink
        );
    }
}

