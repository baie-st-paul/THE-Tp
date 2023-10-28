package com.example.tpbackend.service.creationBD;

import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.utilisateur.gestionnaire.GestionnairePostDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentPostDTO;
import com.example.tpbackend.models.Tag;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.repository.utilisateur.EmployerRepository;
import com.example.tpbackend.service.OffreStageService;
import com.example.tpbackend.service.TagGenerator;
import com.example.tpbackend.service.utilisateur.GestionnaireService;
import com.example.tpbackend.service.utilisateur.StudentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class UtilisateursBD implements CommandLineRunner {
    @Autowired
    private StudentServices studentServices;
    @Autowired
    private EmployerRepository employerRepository;
    @Autowired
    private GestionnaireService gestionnaireService;
    @Autowired
    private OffreStageService offreStageService;

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
        StudentPostDTO studentPostDTO = new StudentPostDTO(
                "lina",
                "lac",
                "etudiant@gmail.com",
                "Root!123",
                "+15147237392",
                "0938473",
                "Informatique"
        );
        StudentPostDTO postDTO = studentServices.saveStudent(
                studentPostDTO,
                studentPostDTO.getEmail(),
                studentPostDTO.getPassword(),
                "Student"
        );
        System.out.println(postDTO);
    }

    public void createEmployer() {
        Utilisateur utilisateur = new Utilisateur(
                "emp@gmail.com",
                "Root!123",
                "Employeur"
        );
        Employer employer = new Employer(
                1L,
                "emp",
                "lala",
                "ALaurendeau",
                "+15147899765"
        );

        employer.setUtilisateur(utilisateur);

        employerRepository.save(employer);

        System.out.println(employer);
    }

    public void createGestionnaire() {
        GestionnairePostDTO gestionnairePostDTO = new GestionnairePostDTO(
                "ges",
                "toto",
                "ges@gmail.com",
                "Root!123",
                "+15144758345",
                "9034948"
        );
        GestionnairePostDTO postDTO = gestionnaireService.saveGestionnaire(
                gestionnairePostDTO.getFirstName(),
                gestionnairePostDTO.getLastName(),
                gestionnairePostDTO.getPhoneNumber(),
                gestionnairePostDTO.getMatricule(),
                gestionnairePostDTO.getEmail(),
                gestionnairePostDTO.getPassword(),
                "Gestionnaire"
        );
        System.out.println(postDTO);
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
                "Accepted",
                10,new Tag(TagGenerator.getCurrentSession()).getTagName()
        );
        offreStageService.saveOffre(offreStageDTO);
    }
}
