package com.example.tpbackend.models;

import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.utils.ByteArrayMultipartFile;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Entity
@NoArgsConstructor
@Data
@Table(uniqueConstraints = @UniqueConstraint(columnNames = "matricule_student"))
public class Cv {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_cv")
    private long id;

    @Column(name = "matricule_student", unique = true)
    private String matricule;
    private String fileName;

    @Column(name = "file_cv")
    private byte[] file_cv;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Enumerated(EnumType.STRING)
    private StatusVuPasVu statusVuPasVuG;


    @Enumerated(EnumType.STRING)
    private StatusVuPasVu statusVuPasVuS;

    public Cv(String matricule, String fileName, byte[] file_cv, String status,
              StatusVuPasVu statusVuPasVuG, StatusVuPasVu statusVuPasVuS) {
        this.matricule = matricule;
        this.fileName = fileName;
        this.file_cv = file_cv;
        this.status = Status.valueOf(status);
        this.statusVuPasVuG = statusVuPasVuG;
        this.statusVuPasVuS = statusVuPasVuS;
    }

    public CvDTO toCvDTO() {
        byte[] yourByteArray = file_cv;
        String originalFilename = fileName;
        String contentType = "application/pdf";

        MultipartFile multipartFile = new ByteArrayMultipartFile(fileName, originalFilename, contentType, yourByteArray);
        return new CvDTO(
                matricule,
                fileName,
                multipartFile,
                String.valueOf(status),
                String.valueOf(statusVuPasVuG),
                String.valueOf(statusVuPasVuS)
        );
    }


    public enum Status {
        Accepted,
        In_review,
        Refused
    }

    public enum StatusVuPasVu {
        vu,
        pasVu
    }
}
