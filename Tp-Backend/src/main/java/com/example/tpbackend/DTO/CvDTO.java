package com.example.tpbackend.DTO;

import com.example.tpbackend.models.Cv;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import jakarta.persistence.Column;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CvDTO {
    private String matricule;
    private String fileName;
    @JsonIgnore
    private MultipartFile file_cv;
    private String status;

    public Cv toCv() throws IOException {
        return new Cv(
                matricule,
                fileName,
                convertMultipartFileToByteArray(file_cv),
                status
        );
    }

    public byte[] convertMultipartFileToByteArray(MultipartFile multipartFile) throws IOException, IOException {
        if (multipartFile.isEmpty()) {
            return null; // or handle the empty file case as needed
        }
        return multipartFile.getBytes();
    }
}
