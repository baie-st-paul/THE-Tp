package com.example.tpbackend.DTO;

import com.example.tpbackend.models.Cv;
import com.example.tpbackend.utils.CvDTOSerializer;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonSerialize(using = CvDTOSerializer.class)
public class CvDTO {
    private String matricule;
    private String fileName;
    @JsonIgnore
    private MultipartFile file_cv;
    private String status;
    private String statusVuPasVuG;
    private String statusVuPasVuE;

    public Cv toCv() throws IOException {
        return new Cv(
                matricule,
                fileName,
                convertMultipartFileToByteArray(file_cv),
                status,
                Cv.StatusVuPasVu.valueOf(statusVuPasVuG),
                Cv.StatusVuPasVu.valueOf(statusVuPasVuE)
        );
    }

    public static byte[] convertMultipartFileToByteArray(MultipartFile multipartFile) throws IOException {
        if (multipartFile.isEmpty()) {
            return null;
        }
        return multipartFile.getBytes();
    }
}
