package com.example.tpbackend;

import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentPostDTO;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.service.OffreStageService;
import com.example.tpbackend.service.StudentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.io.IOException;

import java.util.stream.Stream;

@SpringBootApplication
public class TpBackendApplication implements CommandLineRunner {
    @Autowired
    StudentServices studentServices;

    public static void main(String[] args) {
        SpringApplication.run(TpBackendApplication.class, args);
    }
    @Override
    public void run(String... args) throws IOException {
        System.out.println("hello");
        System.out.println();
        StudentPostDTO studentPostDTO = studentServices.saveStudent("phil", "vall", "444-444-4444", "email", "informatique", "email@gmail.com", "password", "Student");

        /*StudentPostDTO studentPostDTO = studentServices.saveStudent(
                "phil",
                "vall",
                "444-444-4444",
                "email",
                "informatique",
                "email@gmail.com",
                "password",
                Utilisateur.Roles.STUDENT);
        studentPostDTO.setRole(Utilisateur.Roles.STUDENT);*/

        Stream.of("phil", "vall", "Todd", "Tedd", "Barnes", "Bo")
                .forEach(name -> {
                    StudentPostDTO studentPostDTO1 = new StudentPostDTO();
                    studentPostDTO1.setFirstName(name);
                    studentPostDTO1.setLastName(name);
                    studentPostDTO1.setPhoneNumber("444-444-4444");
                    studentPostDTO1.setMatricule("email");
                    studentPostDTO1.setProgram("informatique");
                    studentPostDTO1.setEmail(name + "@gmail.com");
                    studentPostDTO1.setPassword("password");
                    studentServices.saveStudent(
                            studentPostDTO1.getFirstName(),
                            studentPostDTO1.getLastName(),
                            studentPostDTO1.getPhoneNumber(),
                            studentPostDTO1.getMatricule(),
                            studentPostDTO1.getProgram(),
                            studentPostDTO1.getEmail(),
                            studentPostDTO1.getPassword(),
                            "Student"
                            );
        });
    }

}
