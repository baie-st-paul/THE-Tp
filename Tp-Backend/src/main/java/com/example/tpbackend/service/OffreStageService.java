package com.example.tpbackend.service;

import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.custom_exceptions.OffreNotFoundException;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.Tag;
import com.example.tpbackend.repository.OffreStageRepository;
import com.example.tpbackend.repository.TagRepository;
import com.example.tpbackend.service.utilisateur.EmployerService;
import jakarta.transaction.Transactional;
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
    private TagRepository tagRepository;

    @Autowired
    private UserService userService;

    @Transactional
    public OffreStageDTO saveOffre(OffreStageDTO offre) {
        OffreStage offreStage = offre.toOffreStage();
        if(offre.getTag() == null) {
            if (tagRepository.existsByTagName(getTag().getTagName())) {
                offreStage.setTagName(getTag().getTagName());
            } else {
                offreStage.setTagName(getTag().getTagName());
                tagRepository.save(new Tag(getTag().getTagName()));
            }
        }
        else {
            offreStage.setTagName(offre.getTag());
        }
        offreStage.setEmployer(employerService.getEmployerById(offre.getEmployerId()));
        return offreStageRepository.save(offreStage).toOffreStageDTO();
    }

    @Transactional
    public List<OffreStage> getAllOffres() {
        return offreStageRepository.findAll();
    }

    @Transactional
    public List<OffreStageDTO> getOffres() {
        List<OffreStage> offreStages = offreStageRepository.findAll();
        List<OffreStageDTO> offreStageDTOS = new ArrayList<>();

        for (OffreStage offreStage: offreStages) {
            offreStageDTOS.add(offreStage.toOffreStageDTO());
        }

        return offreStageDTOS;
    }

    @Transactional
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

    @Transactional
    public OffreStageDTO getOffreById(long id) {
        return offreStageRepository.findOffreById(id)
                .orElseThrow(() -> new RuntimeException("Offre de stage non trouvée pour l'ID : " + id)).toOffreStageDTO();
    }

    @Transactional
    public Optional<OffreStageDTO> getOffreStageById(Long id) {
        try {
            return offreStageRepository.findById(id)
                    .map(OffreStageDTO::fromOffreStage);
        } catch (OffreNotFoundException e) {
            throw new OffreNotFoundException(id);
        }
    }

    @Transactional
    public OffreStageDTO updateOffreStage(long id ,OffreStageDTO offreStageDTO){
        OffreStage offreStage = offreStageDTO.toOffreStage();
        offreStage.setId(id);
        offreStage.setEmployer(employerService.getEmployerById(offreStageDTO.getEmployerId()));
        return offreStageRepository.save(offreStage).toOffreStageDTO();
    }

    @Transactional
    public void deleteOffreStage(long id){
        offreStageRepository.deleteOffreStageById(id);
    }

    @Transactional
    public List<OffreStageDTO> getOffresByEmployerId() {
        List<OffreStage> offreStages = offreStageRepository.findAllByEmployer(userService.getUserId());
        List<OffreStageDTO> offreStageDTOS = new ArrayList<>();

        for (OffreStage offreStage: offreStages) {
            offreStageDTOS.add(offreStage.toOffreStageDTO());
        }
        return offreStageDTOS;
    }
    public Tag getTag(){
        return new Tag(TagGenerator.getCurrentSession());
    }

}
