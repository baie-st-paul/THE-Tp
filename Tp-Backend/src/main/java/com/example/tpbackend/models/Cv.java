package com.example.tpbackend.models;
import com.example.tpbackend.DTO.CvDTO;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.support.ByteArrayMultipartFileEditor;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;

@Entity
@NoArgsConstructor
@Data
public class Cv {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_cv")
    private long id;

    @Column(name = "matricule_student")
    private String matricule;
    private String fileName;

    @Column(name = "file_cv")
    private byte[] file_cv;

    @Enumerated(EnumType.STRING)
    private StatusCV status;

    public Cv(String matricule, String fileName, byte[] file_cv, String status) {
        this.matricule = matricule;
        this.fileName = fileName;
        this.file_cv = file_cv;
        this.status = StatusCV.valueOf(status);
    }

    /*public CvDTO toCvDTO() {
        return new CvDTO(
                matricule,
                fileName,
                (MultipartFile) new ByteArrayInputStream(file_cv),//a revoir!!!
                String.valueOf(status)
        );
    }*/

    public CvDTO toCvDTO(Cv cv){
        CvDTO cvPostDTO = new CvDTO();
        BeanUtils.copyProperties(cvPostDTO,cv);
        return cvPostDTO;
    }

    public enum StatusCV{
        Accepted,
        In_review,
        Refused,
    }
}

