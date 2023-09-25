package com.example.tpbackend.service.creationBEBD;

import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerPostDTO;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.service.OffreStageService;
import com.example.tpbackend.service.utilisateur.EmployerService;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import java.util.stream.IntStream;

@Service
public class OffreStageBD implements CommandLineRunner {

    @Autowired
    private OffreStageService offreStageService = new OffreStageService();

    @Autowired
    private EmployerService employerService = new EmployerService();
    @Override
    public void run(String... args) throws Exception {
        Random random = new Random();
    /*
        employerService.saveEmployer(new EmployerPostDTO(
                "firstName",
                "lastName",
                "companyName",
                "phoneNumber",
                "email",
                "password"), "email","password" , "Employeur");

        /*employerService.saveEmployer(new EmployerPostDTO(
                "firstName",
                "lastName",
                "companyName",
                "phoneNumber",
                "email",
                "password"), "email","password" , "Employeur");

        IntStream.range(0, 20).forEach(i -> {
            OffreStageDTO offreStageDTO = new OffreStageDTO(
<<<<<<< HEAD
                    i,
=======
>>>>>>> 752ea3d (EQ2-69-Changer la creation de offre pour avoir l'id de l'emplolyer et aussi afficher une liste de offre de stage)
                    0L,
                    "Titre" + RandomStringUtils.randomAlphabetic(5),
                    500.0 + random.nextDouble() * 2000,
                    "Informatique",
                    "Description de l'offre de stage " + RandomStringUtils.randomAlphabetic(400),
                    LocalDate.now().plusDays(random.nextInt(365)),
                    LocalDate.now().plusDays(30 + random.nextInt(365)),
                    "In_review"
            );
            offreStageService.createOffre(offreStageDTO);
        });

        // Afficher toutes les offres en console
        List<OffreStage> allOffres = offreStageService.getAllOffres();
        allOffres.forEach(offre -> {
            System.out.println(offre.toString());
<<<<<<< HEAD
        });*/
    }
}
