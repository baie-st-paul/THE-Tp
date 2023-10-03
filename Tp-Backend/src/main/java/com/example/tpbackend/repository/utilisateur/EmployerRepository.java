package com.example.tpbackend.repository.utilisateur;

import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployerRepository extends JpaRepository<Employer, Integer> {
    boolean existsByCompanyName(String companyName);

    @Query("SELECT NEW com.example.tpbackend.models.utilisateur.employeur.Employer(e.id,e.firstName, e.lastName, e.companyName, e.phoneNumber) FROM Employer e INNER JOIN e.utilisateur u")
    Employer findEmployerByUtilisateur();

    List<OffreStageDTO> getOffreStageById(Long id);

    Employer findEmployerById(Long id);
}
