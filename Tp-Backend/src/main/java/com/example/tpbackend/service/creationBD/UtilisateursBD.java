package com.example.tpbackend.service.creationBD;

import com.example.tpbackend.DTO.Authentication.RegisterRequest;
import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.utilisateur.gestionnaire.GestionnairePostDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentPostDTO;
import com.example.tpbackend.models.Tag;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.repository.TagRepository;
import com.example.tpbackend.repository.utilisateur.EmployerRepository;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import com.example.tpbackend.service.OffreStageService;
import com.example.tpbackend.service.TagGenerator;
import com.example.tpbackend.service.security.AuthenticationService;
import com.example.tpbackend.service.utilisateur.GestionnaireService;
import com.example.tpbackend.service.utilisateur.StudentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.LinkedHashMap;

@Service
public class UtilisateursBD implements CommandLineRunner {
    @Autowired
    private OffreStageService offreStageService;
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private StudentServices studentServices;
    @Autowired
    private GestionnaireService gestionnaireService;
    @Autowired
    private EmployerRepository employerRepository;
    @Autowired
    private TagRepository tagRepository;


    @Override
    public void run(String... args) {
        createStudent();
        System.out.println("1 student created");
        createEmployer();
        System.out.println("1 employer created");
        createGestionnaire();
        System.out.println("1 gestionnaire created");
        createOffreStage();
        System.out.println("1 offre stage created");
    }

    public void createStudent() {
        LinkedHashMap<String, String> studentDTO = new LinkedHashMap<>();
        studentDTO.put("matricule", "1234567");
        studentDTO.put("program", "info");
        try{
            RegisterRequest<?> registerRequest = new RegisterRequest<>(
                    "lina",
                    "lac",
                    "etudiant@gmail.com",
                    "+15147237392",
                    "Root!123",
                    "Student",
                    studentDTO
            );
            authenticationService.register(registerRequest);
            System.out.println(registerRequest);
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
        }

        LinkedHashMap<String, String> studentDTO2 = new LinkedHashMap<>();
        studentDTO2.put("matricule", "7654321");
        studentDTO2.put("program", "info");
        try{
            RegisterRequest<?> registerRequest2 = new RegisterRequest<>(
                    "lina",
                    "lac",
                    "student@gmail.com",
                    "+14389999999",
                    "Root!123",
                    "Student",
                    studentDTO2
            );
            authenticationService.register(registerRequest2);
            System.out.println(registerRequest2);
            studentServices.updateTag("7654321","AU20");
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
        }

        LinkedHashMap<String, String> studentDTO3 = new LinkedHashMap<>();
        studentDTO3.put("matricule", "0123456");
        studentDTO3.put("program", "info");
        try{
            RegisterRequest<?> registerRequest3 = new RegisterRequest<>(
                    "lina",
                    "lac",
                    "student2@gmail.com",
                    "+14389999992",
                    "Root!123",
                    "Student",
                    studentDTO3
            );
            authenticationService.register(registerRequest3);
            System.out.println(registerRequest3);
            studentServices.updateTag("0123456","AU20");
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }

    public void createEmployer() {
        LinkedHashMap<String, String> employerDTO = new LinkedHashMap<>();
        employerDTO.put("companyName", "ALaurendeau");

        try{
            RegisterRequest<?> registerRequest = new RegisterRequest<>(
                    "emp",
                    "lala",
                    "emp@gmail.com",
                    "+15147899765",
                    "Root!123",
                    "Employeur",
                    employerDTO
            );
            authenticationService.register(registerRequest);
            System.out.println(registerRequest);
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public void createGestionnaire() {
        LinkedHashMap<String, String> gestionnaireDTO = new LinkedHashMap<>();
        gestionnaireDTO.put("matricule", "9034948");

        try{
            RegisterRequest<?> registerRequest = new RegisterRequest<>(
                    "ges",
                    "toto",
                    "ges@gmail.com",
                    "+15144758345",
                    "Root!123",
                    "Gestionnaire",
                    gestionnaireDTO
            );
            authenticationService.register(registerRequest);
            System.out.println(registerRequest);
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public void createOffreStage() {
        OffreStageDTO offreStageDTO = new OffreStageDTO(
                1,
                1,
                "Dev web",
                20,
                "Informatique",
                "Un développeur Web est responsable de la conception, du codage et de la modification des sites Web," +
                        " y compris tous les aspects du site Web, tels que la mise en page, les fonctionnalités et" +
                        " l'expérience utilisateur. Les développeurs Web doivent créer des conceptions" +
                        " de sites Web esthétiques avec une conception fonctionnelle et conviviale et une navigation" +
                        " claire pour une convivialité optimale.",
                LocalDate.of(2023, 10, 20),
                LocalDate.of(2023, 10, 20),
                "Refused",
                10,
                new Tag("AU23").getTagName()
        );
        OffreStageDTO offreStageDTO1 = new OffreStageDTO(
                2,
                1,
                "Dev web",
                20,
                "Informatique",
                "Un développeur Web est responsable de la conception, du codage et de la modification des sites Web," +
                        " y compris tous les aspects du site Web, tels que la mise en page, les fonctionnalités et" +
                        " l'expérience utilisateur. Les développeurs Web doivent créer des conceptions" +
                        " de sites Web esthétiques avec une conception fonctionnelle et conviviale et une navigation" +
                        " claire pour une convivialité optimale.",
                LocalDate.of(2023, 10, 20),
                LocalDate.of(2023, 10, 20),
                "Accepted",
                10,
                new Tag("H23").getTagName()
        );
        tagRepository.save(new Tag("H23"));
        System.out.println("tag" + offreStageDTO1.getTag());
        OffreStageDTO postDTO = offreStageService.saveOffre(offreStageDTO);
        offreStageService.saveOffre(offreStageDTO1);
        System.out.println(postDTO);
    }
}
