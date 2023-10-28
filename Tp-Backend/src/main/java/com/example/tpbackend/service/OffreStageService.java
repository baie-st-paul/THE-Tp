package com.example.tpbackend.service;

import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerGetDTO;
import com.example.tpbackend.custom_exceptions.OffreNotFoundException;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.Tag;
import com.example.tpbackend.repository.OffreStageRepository;
import com.example.tpbackend.repository.TagRepository;
import com.example.tpbackend.service.utilisateur.EmployerService;
import lombok.NoArgsConstructor;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@NoArgsConstructor
public class OffreStageService {

    @Autowired
    private OffreStageRepository offreStageRepository;
    @Autowired
    private EmployerService employerService;
    @Autowired
    private TagRepository tagRepository;

    public OffreStageDTO saveOffre(OffreStageDTO offre) {
        OffreStage offreStage = offre.toOffreStage();
        if (tagRepository.existsByTagName(getTag().getTagName())) {
            offreStage.setTagName(getTag().getTagName());
        }else{
            offreStage.setTagName(getTag().getTagName());
            tagRepository.save(new Tag(getTag().getTagName()));
        }
        offreStage.setEmployer(EmployerGetDTO.fromEmployerDTO(employerService.getEmployerById(offre.getEmployerId())));
        offreStageRepository.save(offreStage);
        return offre;
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
        offreStage.setEmployer(EmployerGetDTO.fromEmployerDTO(employerService.getEmployerById(offreStageDTO.getEmployerId())));
        return offreStageRepository.save(offreStage).toOffreStageDTO();
    }

    public void deleteOffreStage(long id){
        offreStageRepository.deleteOffreStageById(id);
    }

    public List<OffreStageDTO> getOffresByEmployerId(long id) {
        List<OffreStage> offreStages = offreStageRepository.findAllByEmployer(id);
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
