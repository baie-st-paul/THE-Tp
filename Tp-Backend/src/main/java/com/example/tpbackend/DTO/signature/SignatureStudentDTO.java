package com.example.tpbackend.DTO.signature;

import com.example.tpbackend.models.signature.SignatureStudent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignatureStudentDTO {
    private String studentMatricule;
    private String imageLink;

    public SignatureStudent toSignatureStudent() {
        return new SignatureStudent(
                imageLink
        );
    }
}
