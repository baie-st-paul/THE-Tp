package com.example.tpbackend.service;

import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.custom_exceptions.OffreNotFoundException;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.repository.OffreStageRepository;
import com.example.tpbackend.service.security.AuthenticationService;
import com.example.tpbackend.service.utilisateur.EmployerService;
import com.example.tpbackend.service.utilisateur.UserService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@NoArgsConstructor
@AllArgsConstructor
public class OffreStageService {
    @Autowired
    private OffreStageRepository offreStageRepository;

    @Autowired
    private EmployerService employerService;

    @Autowired
    private UserService userService;

    public OffreStageDTO saveOffre(OffreStageDTO offre) {
        OffreStage offreStage = offre.toOffreStage();
        offreStage.setEmployer(employerService.getEmployerById(offre.getEmployerId()));
        return offreStageRepository.save(offreStage).toOffreStageDTO();
    }

    public List<OffreStage> getAllOffres() {
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
        if(offreStage == null) {
            throw new IllegalArgumentException("L'objet OffreStage fourni est null");
        }
        try {
            OffreStageDTO dto = new OffreStageDTO();
            dto.setDescription(offreStage.getDescription());
            return dto;
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la conversion de OffreStage en OffreStageDTO", e);
        }
    }

    public OffreStageDTO getOffreById(long id) {
        return offreStageRepository.findOffreById(id)
                .orElseThrow(() -> new RuntimeException("Offre de stage non trouvée pour l'ID : " + id)).toOffreStageDTO();
    }

    public Optional<OffreStageDTO> getOffreStageById(Long id) {
        try {
            return offreStageRepository.findById(id)
                    .map(OffreStageDTO::fromOffreStage);
        } catch (OffreNotFoundException e) {
            throw new OffreNotFoundException(id);
        }
    }

    public OffreStageDTO updateOffreStage(long id ,OffreStageDTO offreStageDTO){
        OffreStage offreStage = offreStageDTO.toOffreStage();
        offreStage.setId(id);
        offreStage.setEmployer(employerService.getEmployerById(offreStageDTO.getEmployerId()));
        return offreStageRepository.save(offreStage).toOffreStageDTO();
    }

    public void deleteOffreStage(long id){
        offreStageRepository.deleteOffreStageById(id);
    }

    public List<OffreStageDTO> getOffresByEmployerId() {
        List<OffreStage> offreStages = offreStageRepository.findAllByEmployer(userService.getUserId());
        List<OffreStageDTO> offreStageDTOS = new ArrayList<>();

        for (OffreStage offreStage: offreStages) {
            offreStageDTOS.add(offreStage.toOffreStageDTO());
        }

        return offreStageDTOS;
    }
}
