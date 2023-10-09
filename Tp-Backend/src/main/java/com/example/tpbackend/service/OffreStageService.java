package com.example.tpbackend.service;

import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerGetDTO;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.repository.OffreStageRepository;
import com.example.tpbackend.service.utilisateur.EmployerService;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@NoArgsConstructor
public class OffreStageService {

    private OffreStageRepository offreStageRepository;
    private static final Logger logger = LoggerFactory.getLogger(OffreStageService.class);


    @Autowired
    public OffreStageService(OffreStageRepository offreStageRepository) {
        this.offreStageRepository = offreStageRepository;
    }

    @Autowired
    private EmployerService employerService;


    public OffreStageDTO createOffre(OffreStageDTO offre) {
        OffreStage offreStage = offre.toOffreStage();
        offreStage.setEmployer(EmployerGetDTO.fromEmployerDTO(employerService.getEmployerById(offre.getEmployerId())));
        return offreStageRepository.save(offreStage).toOffreStageDTO();
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

    /*public Optional<OffreStageDTO> getOffreStageById(Long id) {
        logger.info("Recherché d'une offre par ID: {}", id);
        return offreStageRepository.findById(id).map(OffreStageDTO::fromOffreStage);
    }*/

    public Optional<OffreStageDTO> getOffreStageById(Long id) {
        logger.info("Recherche d'une offre par ID: {}", id);
        Optional<OffreStageDTO> offre = offreStageRepository.findById(id).map(OffreStageDTO::fromOffreStage);
        if (offre.isEmpty()) {
            logger.warn("Aucune offre trouvée pour l'ID: {}", id);
        }
        return offre;
    }


    public OffreStageDTO updateOffreStage(Long id ,OffreStageDTO offreStageDTO){
        OffreStage offreStage = offreStageDTO.toOffreStage();
        offreStage.setId(id);
        offreStage.setEmployer(EmployerGetDTO.fromEmployerDTO(employerService.getEmployerById(offreStageDTO.getEmployerId())));
        return offreStageRepository.save(offreStage).toOffreStageDTO();
    }

    public boolean deleteOffreStage(Long id){
        return offreStageRepository.deleteOffreStageById(id);
    }

    public List<OffreStageDTO> getOffresByEmployerId(Long id) {
        List<OffreStage> offreStages = offreStageRepository.findAllByEmployer(id);
        List<OffreStageDTO> offreStageDTOS = new ArrayList<>();

        for (OffreStage offreStage: offreStages) {
            offreStageDTOS.add(offreStage.toOffreStageDTO());
        }

        return offreStageDTOS;
    }
}
