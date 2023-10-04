package com.example.tpbackend.service;

import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerGetDTO;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.repository.OffreStageRepository;
import com.example.tpbackend.service.utilisateur.EmployerService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@NoArgsConstructor
@AllArgsConstructor
public class OffreStageService {

    @Autowired
    private OffreStageRepository offreStageRepository;

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

    public OffreStageDTO getOffreById(long id) {
        return offreStageRepository.findOffreById(id)
                .orElseThrow(() -> new RuntimeException("Offre de stage non trouvée pour l'ID : " + id)).toOffreStageDTO();
    }

    public OffreStageDTO updateOffreStage(long id ,OffreStageDTO offreStageDTO){
        OffreStage offreStage = offreStageDTO.toOffreStage();
        offreStage.setId(id);
        offreStage.setEmployer(EmployerGetDTO.fromEmployerDTO(employerService.getEmployerById(offreStageDTO.getEmployerId())));
        return offreStageRepository.save(offreStage).toOffreStageDTO();
    }

    public void deleteOffreStage(long id){
        OffreStageDTO offreStageDTO = offreStageRepository.findOffreById(id).get().toOffreStageDTO();
        offreStageRepository.delete(offreStageDTO.toOffreStage());
    }

    public List<OffreStageDTO> getOffresByEmployerId(long id) {
        List<OffreStage> offreStages = offreStageRepository.findAllByEmployer(id);
        List<OffreStageDTO> offreStageDTOS = new ArrayList<>();

        for (OffreStage offreStage: offreStages) {
            offreStageDTOS.add(offreStage.toOffreStageDTO());
        }

        return offreStageDTOS;
    }
}
