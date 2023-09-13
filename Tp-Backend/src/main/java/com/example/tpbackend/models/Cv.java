package com.example.tpbackend.models;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

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


    public enum StatusCV{
        Acepted,
        In_review,
        Refused,
    }
}

