package com.example.tpbackend.service.creationBD;

import com.example.tpbackend.DTO.Authentication.RegisterRequest;
import com.example.tpbackend.DTO.ContratStageDTO;
import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.candidature.CandidaturePostDTO;
import com.example.tpbackend.DTO.entrevue.EntrevueDTO;
import com.example.tpbackend.models.Tag;
import com.example.tpbackend.repository.TagRepository;
import com.example.tpbackend.service.EntrevueService;
import com.example.tpbackend.service.OffreStageService;
import com.example.tpbackend.service.security.AuthenticationService;
import com.example.tpbackend.service.utilisateur.GestionnaireService;
import com.example.tpbackend.service.utilisateur.StudentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.LinkedHashMap;

@Service
public class UtilisateursBD implements CommandLineRunner {
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private StudentServices studentServices;
    @Autowired
    private EntrevueService entrevueService;
    @Autowired
    private GestionnaireService gestionnaireService;
    @Autowired
    private OffreStageService offreStageService;
    @Autowired
    private TagRepository tagRepository;


    @Override
    public void run(String... args) throws IOException {
        createAllStudent();
        System.out.println("students created");
        createEmployer();
        System.out.println("1 employer created");
        createGestionnaire();
        System.out.println("1 gestionnaire created");
        createAllCvs();
        System.out.println("cvs created");
        createAllOffreStage();
        System.out.println("offres stage created");
        createAllCandidature();
        System.out.println("candidatures created");
        createAllEntrevues();
        System.out.println("entrevues created");
        candidatureEmbauche();
        System.out.println("candidatures embauches");
        createAllContrats();
        System.out.println("contrats created");
    }

    public void normalCreateStudent(String matricule, String program,
                                    String firstName, String lastName, String email, String phoneNumber,
                                    String password, String role) {
        LinkedHashMap<String, String> studentDTO = new LinkedHashMap<>();
        studentDTO.put("matricule", matricule);
        studentDTO.put("program", program);
        try{
            RegisterRequest<?> registerRequest = new RegisterRequest<>(
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    password,
                    role,
                    studentDTO
            );
            authenticationService.register(registerRequest);
            System.out.println(registerRequest);
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public void updateTagCreateStudent(String matricule, String program,
                                       String firstName, String lastName, String email, String phoneNumber,
                                       String password, String role, String tag) {
        LinkedHashMap<String, String> studentDTO = new LinkedHashMap<>();
        studentDTO.put("matricule", matricule);
        studentDTO.put("program", program);
        try{
            RegisterRequest<?> registerRequest2 = new RegisterRequest<>(
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    password,
                    role,
                    studentDTO
            );
            authenticationService.register(registerRequest2);
            System.out.println(registerRequest2);
            studentServices.updateTag(matricule,tag);
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public void createAllStudent() {
        normalCreateStudent("1234567", "Informatique",
                "lina", "lac", "lina@gmail.com",
                "+15147237392", "Root!123", "Student");

        normalCreateStudent("5869595", "Informatique",
                "flo", "fla", "flo@gmail.com",
                "+15143748584", "Root!123", "Student");

        normalCreateStudent("8675848", "Informatique",
                "lala", "lolo", "lala@gmail.com",
                "+15143748584", "Root!123", "Student");

        normalCreateStudent("4738494", "Informatique",
                "tata", "toto", "tata@gmail.com",
                "+15143748584", "Root!123", "Student");

        normalCreateStudent("4959695", "Informatique",
                "lolo", "lala", "lolo@gmail.com",
                "+14389999999", "Root!123", "Student");


        updateTagCreateStudent("7654321", "Informatique",
                "toto", "tata", "toto@gmail.com",
                "+15143748594", "Root!123", "Student", "AU20");

        updateTagCreateStudent("0123456", "Informatique",
                "soso", "sasa", "soso@gmail.com",
                "+14389999992", "Root!123", "Student", "AU20");
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

    public void createAllCvs() throws IOException {
        createCv("web-developer-resume-example.pdf", "1234567", "In_review");
        createCv("web-developer-resume-example.pdf", "5869595", "In_review");
        createCv("web-developer-resume-example.pdf", "8675848", "In_review");
        createCv("web-developer-resume-example.pdf", "4738494", "In_review");
        createCv("web-developer-resume-example.pdf", "4959695", "Accepted");
        createCv("web-developer-resume-example.pdf", "7654321", "Refused");
        createCv("web-developer-resume-example.pdf", "0123456", "Accepted");
    }

    public MultipartFile createFile(String fileName) {
        File file = new File("Tp-Backend/src/main/java/com/example/tpbackend/service/creationBD/cvPDF/" + fileName);

        return new MultipartFile() {
            @Override
            public String getName() {
                return file.getName();
            }

            @Override
            public String getOriginalFilename() {
                return file.getName();
            }

            @Override
            public String getContentType() {
                return "application/pdf";
            }

            @Override
            public boolean isEmpty() {
                return file.length() == 0;
            }

            @Override
            public long getSize() {
                return file.length();
            }

            @Override
            public byte[] getBytes() throws IOException {
                InputStream inputStream = new FileInputStream(file);
                return inputStream.readAllBytes();
            }

            @Override
            public InputStream getInputStream() throws IOException {
                return new FileInputStream(file);
            }

            @Override
            public void transferTo(File dest) throws IOException, IllegalStateException {
                Path path = Paths.get(file.getPath());
                Files.write(path, Files.readAllBytes(Path.of(file.getPath())));
            }
        };
    }

    public void createCv(String fileName, String matricule, String status) throws IOException {
        CvDTO cvDTO = new CvDTO(
                matricule,
                fileName,
                createFile(fileName),
                status
        );
        studentServices.saveCv(cvDTO);
    }

    public void createAllCandidature() throws IOException {
        createCandidature("1234567", 1L, "lettreMotiv.pdf");
        createCandidature("5869595", 2L, "lettreMotiv.pdf");
        createCandidature("8675848", 3L, "lettreMotiv.pdf");
        createCandidature("4738494", 4L, "lettreMotiv.pdf");
        createCandidature("4959695", 4L, "lettreMotiv.pdf");
    }

    public void createCandidature(String matricule, Long idOffre, String fileName) throws IOException {
        CandidaturePostDTO candidaturePostDTO = new CandidaturePostDTO(
                matricule,
                idOffre,
                fileName,
                createFile(fileName)
        );
        studentServices.postulerOffre(candidaturePostDTO);
    }

    public void candidatureEmbauche() {
        studentServices.updateCandidatureStatus("1234567", "Accepted");
        studentServices.updateCandidatureStatus("5869595", "Accepted");
        studentServices.updateCandidatureStatus("8675848", "Accepted");
        studentServices.updateCandidatureStatus("4738494", "Accepted");
    }

    public void createAllEntrevues() {
        createEntrevue(1,
                "2023-11-11, 10:30",
                "rendez-vous sur teams",
                "EnAttente",
                "ALaurendeau",
                "1",
                "1234567",
                "1");
        createEntrevue(2,
                "2023-11-20, 11:00",
                "rendez-vous sur teams",
                "EnAttente",
                "ALaurendeau",
                "1",
                "5869595",
                "1");
        createEntrevue(3,
                "2023-11-30, 14:30",
                "rendez-vous sur teams",
                "EnAttente",
                "ALaurendeau",
                "1",
                "8675848",
                "1");
        createEntrevue(4,
                "2023-11-25, 9:30",
                "rendez-vous sur zoom",
                "Acceptee",
                "ALaurendeau",
                "1",
                "4738494",
                "1");
        createEntrevue(5,
                "2023-11-15, 10:30",
                "rendez-vous sur zoom",
                "Acceptee",
                "ALaurendeau",
                "1",
                "4959695",
                "1");
        createEntrevue(6,
                "2023-11-10, 8:00",
                "rendez-vous sur teams",
                "Refusee",
                "ALaurendeau",
                "1",
                "7654321",
                "1");
    }

    public void createEntrevue(long id, String dateHeure, String description, String status,
                               String companyName, String idEmp, String idStudent, String idOffre) {
        EntrevueDTO entrevueDTO = new EntrevueDTO(
                id,
                dateHeure,
                description,
                status,
                companyName,
                idEmp,
                idStudent,
                idOffre
        );
        entrevueService.createEntrevue(entrevueDTO);
    }

    public void createAllContrats() {
        createContrat(
                1L,
                "1234567",
                1L,
                "lina",
                "lac",
                "Dev web react"
        );
        createContrat(
                2L,
                "5869595",
                1L,
                "flo",
                "fla",
                "Dev web angular"
        );
        createContrat(
                3L,
                "8675848",
                1L,
                "lala",
                "lolo",
                "Dev web mobile"
        );
        createContrat(
                4L,
                "4738494",
                1L,
                "tata",
                "toto",
                "Dev java"
        );
    }

    public void createContrat(Long id, String matricule, Long idEmp, String prenom, String nom, String titreOffre) {
        ContratStageDTO contratStageDTO = new ContratStageDTO(
                id,
                matricule,
                idEmp,
                nom,
                titreOffre,
                prenom,
                "Pas_Signer",
                "Pas_Signer",
                "Pas_Signer"
        );
        gestionnaireService.createContrat(contratStageDTO);
    }

    public void createOffre(long id, String titre, double salaire, String program,
                            String description, LocalDate dateDebut, LocalDate dateFin,
                            int nbMaxStudent, String status, long idEmp, String tag) {
        OffreStageDTO offreStageDTO = new OffreStageDTO(
                id,
                titre,
                salaire,
                program,
                description,
                dateDebut,
                dateFin,
                nbMaxStudent,
                status,
                idEmp,
                new Tag(tag).getTagName()
        );

        System.out.println("tag" + offreStageDTO.getTag());
        OffreStageDTO postDTO = offreStageService.saveOffre(offreStageDTO);
        System.out.println(postDTO);
    }

    public void createAllOffreStage() {
        createOffre(1,
                "Dev web react",
                20,
                "Informatique",
                "Un développeur Web est responsable de la conception, du codage et de la modification des sites Web," +
                        " y compris tous les aspects du site Web, tels que la mise en page, les fonctionnalités et" +
                        " l'expérience utilisateur. Les développeurs Web doivent créer des conceptions" +
                        " de sites Web esthétiques avec une conception fonctionnelle et conviviale et une navigation" +
                        " claire pour une convivialité optimale.",
                LocalDate.of(2023, 11, 10),
                LocalDate.of(2023, 11, 23),
                10,
                "Refused",
                1,
                "AU23");

        createOffre(2,
                "Dev web angular",
                20,
                "Informatique",
                "Un développeur Web est responsable de la conception, du codage et de la modification des sites Web," +
                        " y compris tous les aspects du site Web, tels que la mise en page, les fonctionnalités et" +
                        " l'expérience utilisateur. Les développeurs Web doivent créer des conceptions" +
                        " de sites Web esthétiques avec une conception fonctionnelle et conviviale et une navigation" +
                        " claire pour une convivialité optimale.",
                LocalDate.of(2023, 11, 14),
                LocalDate.of(2023, 11, 25),
                10,
                "Accepted",
                1,
                "H23");

        tagRepository.save(new Tag("H23"));

        createOffre(3,
                "Dev mobile",
                25,
                "Informatique",
                "Un développeur d'applications mobiles utilise des langages de programmation " +
                        "et des compétences en développement pour créer, tester et développer des applications " +
                        "sur des appareils mobiles. Ils fonctionnent dans des environnements de systèmes d'exploitation " +
                        "populaires comme iOS et Android et prennent souvent en compte les principes UI et UX lors " +
                        "de la création d'applications.",
                LocalDate.of(2023, 11, 19),
                LocalDate.of(2023, 11, 30),
                8,
                "In_review",
                1,
                "AU23");

        createOffre(4,
                "Dev java",
                25,
                "Informatique",
                "Un développeur Java est un programmeur qui conçoit, développe et gère des applications" +
                        " et des logiciels basés sur Java. Alors que la plupart des grandes organisations utilisent " +
                        "Java pour implémenter des systèmes logiciels et des services backend, un développeur Java est " +
                        "aujourd'hui l'un des emplois les plus recherchés. ",
                LocalDate.of(2023, 11, 22),
                LocalDate.of(2023, 11, 30),
                15,
                "In_review",
                1,
                "AU23");
    }
}
