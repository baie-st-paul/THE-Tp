package com.example.tpbackend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.repository.OffreStageRepository;
import com.example.tpbackend.service.OffreStageService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class OffreStageServiceTest {

    @InjectMocks
    private OffreStageService offreStageService;

    @Mock
    private OffreStageRepository offreStageRepository;

    @Test
    public void testCreateOffre() {
        OffreStage offre = new OffreStage();
        offre.setId(1L);
        when(offreStageRepository.save(any())).thenReturn(offre); // si on sauvegarde n'importe quel objet, on retourne l'offre

        OffreStage result = offreStageService.createOffre(new OffreStage());

        assertEquals(1L, result.getId());
    }

    @Test
    public void testGetAllOffres() {
        List<OffreStage> offres = Arrays.asList(new OffreStage(), new OffreStage());
        when(offreStageRepository.findAll()).thenReturn(offres);

        List<OffreStage> result = offreStageService.getAllOffres();

        assertEquals(2, result.size());
    }

    @Test
    public void testGetOffres() {
        List<OffreStage> offres = Arrays.asList(new OffreStage(), new OffreStage());
        when(offreStageRepository.findAll()).thenReturn(offres);

        List<OffreStageDTO> result = offreStageService.getOffres();

        assertEquals(2, result.size());
    }

    @Test
    public void testGetOffreById() {
        OffreStage offre = new OffreStage();
        offre.setId(1L);
        when(offreStageRepository.findOffreById(1L)).thenReturn(Optional.of(offre));

        OffreStage result = offreStageService.getOffreById(1L);

        assertEquals(1L, result.getId());
    }

    @Test
    public void testGetOffreById_NotFound() {
        when(offreStageRepository.findOffreById(1L)).thenReturn(Optional.empty());

        try {
            OffreStage result = offreStageService.getOffreById(1L);
        } catch (RuntimeException e) {
            assertEquals("Offre de stage non trouvée pour l'ID : 1", e.getMessage());
        }
    }
}
