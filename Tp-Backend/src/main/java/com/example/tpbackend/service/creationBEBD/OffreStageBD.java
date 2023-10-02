package com.example.tpbackend.service.creationBEBD;

import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.service.OffreStageService;
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

    @Override
    public void run(String... args) throws Exception {
        Random random = new Random();

        IntStream.range(0, 20).forEach(i -> {
            OffreStageDTO offreStageDTO = new OffreStageDTO(
                    i,
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
        /*List<OffreStage> allOffres = offreStageService.getAllOffres();
        allOffres.forEach(offre -> {
            System.out.println(offre.toString());
        });*/
    }
}
