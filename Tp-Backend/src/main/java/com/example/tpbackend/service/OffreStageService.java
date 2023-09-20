package com.example.tpbackend.service;

import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.repository.OffreStageRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@NoArgsConstructor
@AllArgsConstructor
public class OffreStageService {
    private OffreStageRepository offreStageRepository;

    public OffreStageDTO createOffre(OffreStageDTO offre) {
        return offreStageRepository.save(offre.toOffreStage()).toOffreStageDTO();
    }

    public List<OffreStage> getAllOffres() {//utilisé que dans test
        return offreStageRepository.findAll();
    }

    public List<OffreStageDTO> getOffres() {
        List<OffreStage> offreStages = offreStageRepository.findAll();
        List<OffreStageDTO> offreStageDTOS = new ArrayList<>();

        for (OffreStage offreStage: offreStages) {
            offreStageDTOS.add(offreStage.toOffreStageDTO());
        }

        return offreStageDTOS;
    }

    public OffreStageDTO convertToDto(OffreStage offreStage) {
        OffreStageDTO dto = new OffreStageDTO();
        dto.setDescription(offreStage.getDescription());
        return dto;
    }

    public OffreStageDTO getOffreById(Long id) {
        return offreStageRepository.findOffreById(id)
                .orElseThrow(() -> new RuntimeException("Offre de stage non trouvée pour l'ID : " + id)).toOffreStageDTO();
    }

    public OffreStageDTO updateOffreStage(OffreStageDTO offreStageDTO){
        return createOffre(offreStageDTO);
    }

    public void deleteOffreStage(OffreStageDTO offreStageDTO){
        offreStageRepository.delete(offreStageDTO.toOffreStage());
    }
}
