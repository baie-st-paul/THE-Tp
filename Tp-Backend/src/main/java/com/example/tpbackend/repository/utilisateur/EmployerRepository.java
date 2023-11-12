package com.example.tpbackend.repository.utilisateur;

import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployerRepository extends JpaRepository<Employer, Long> {
    boolean existsByCompanyName(String companyName);

    List<OffreStageDTO> getOffreStageById(Long id);

    Employer findEmployerById(Long id);

    Employer findByUtilisateurId(Long id);
}
