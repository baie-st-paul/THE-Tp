package com.example.tpbackend.DTO.PostDTO;

import com.example.tpbackend.models.Cv;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class CvDTO {
        private String matricule;
        private String fileName;
        private byte[] file_cv;
        private Cv.StatusCV status;

    public CvDTO(String matricule, String fileName, byte[] file_cv, String status) {
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

    public Cv toCv (CvDTO cvDTO ){
        Cv cv = new Cv();
        BeanUtils.copyProperties(cvDTO,cv);
        return cv;
    }
}
