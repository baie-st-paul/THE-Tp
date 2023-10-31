package com.example.tpbackend.DTO;

import com.example.tpbackend.models.Signature;
import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignatureDTO {
    @Nullable
    private long employerId;
    private String imageLink;

    @Nullable
    private String studentMatricule;

    public Signature toSignature() {
        return new Signature(
                imageLink
        );
    }
}

