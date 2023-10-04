package com.example.tpbackend.DTO;

import com.example.tpbackend.models.Cv;
import com.example.tpbackend.utils.CandidatureGetDTOSerializer;
import com.example.tpbackend.utils.CvDTOSerializer;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
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
@JsonSerialize(using = CvDTOSerializer.class)
public class CvDTO {
    private String matricule;
    private String fileName;
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

    public static byte[] convertMultipartFileToByteArray(MultipartFile multipartFile) throws IOException, IOException {
        if (multipartFile.isEmpty()) {
            return null;
        }
        return multipartFile.getBytes();
    }
}
