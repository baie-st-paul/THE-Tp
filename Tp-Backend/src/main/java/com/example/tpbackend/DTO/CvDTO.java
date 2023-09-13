package com.example.tpbackend.DTO;

import com.example.tpbackend.models.Cv;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Data
@NoArgsConstructor
public class CvDTO {
        private String matricule;
        private String fileName;
        @JsonIgnore
        private MultipartFile file_cv;
        private Cv.StatusCV status;

    public CvDTO(String matricule, String fileName, MultipartFile file_cv, String status) {
        this.matricule = matricule;
        this.fileName = fileName;
        this.file_cv = file_cv;
        this.status = Cv.StatusCV.valueOf(status);
    }

    public CvDTO toCvDTO (Cv cv ){
        CvDTO cvPostDTO = new CvDTO();
        BeanUtils.copyProperties(cvPostDTO,cv);
        return cvPostDTO;
    }

    public Cv toCv (CvDTO cvDTO ) throws IOException {
        Cv cv = new Cv();
        cv.setStatus(cvDTO.getStatus());
        cv.setMatricule(cvDTO.getMatricule());
        cv.setFileName(cvDTO.getFileName());
        cv.setFile_cv(convertMultipartFileToByteArray(cvDTO.getFile_cv()));
        return cv;
    }

    public byte[] convertMultipartFileToByteArray(MultipartFile multipartFile) throws IOException, IOException {
        if (multipartFile.isEmpty()) {
            return null; // or handle the empty file case as needed
        }

        return multipartFile.getBytes();
    }
}
