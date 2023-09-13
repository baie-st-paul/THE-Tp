package com.example.tpbackend.service;

import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.repository.OffreStageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class OffreStageService {


    private final OffreStageRepository offreStageRepository;

    @Autowired
    public OffreStageService(OffreStageRepository offreStageRepository) {
        this.offreStageRepository = offreStageRepository;
    }

    public OffreStage createOffre(OffreStage offre) {
        return offreStageRepository.save(offre);
    }

    public List<OffreStage> getAllOffres() {
        return offreStageRepository.findAll();
    }

    public List<OffreStageDTO> getOffres() {
        List<OffreStage>  offres = offreStageRepository.findAll();

        return offres.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private OffreStageDTO convertToDto(OffreStage offreStage) {
        OffreStageDTO dto = new OffreStageDTO();
        dto.setEntreprise(offreStage.getEntreprise());
        dto.setPoste(offreStage.getPoste());
        dto.setDescription(offreStage.getDescription());
        return dto;
    }

    public OffreStage getOffreById(Long id) {
        return offreStageRepository.findOffreById(id)
                .orElseThrow(() -> new RuntimeException("Offre de stage non trouvée pour l'ID : " + id));
    }

}
