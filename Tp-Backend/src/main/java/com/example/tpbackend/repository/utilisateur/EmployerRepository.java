package com.example.tpbackend.repository.utilisateur;

import com.example.tpbackend.models.utilisateur.Employer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployerRepository extends JpaRepository<Employer, String> {
    boolean existsByCompanyName(String companyName);

    Employer getByCompanyId(String companyId);

    @Query("SELECT COUNT(e) > 0 FROM Employer e WHERE e.companyId = ?1 OR e.utilisateur.email = ?2")
    boolean existsByCompanyIdOrEmail(String matricule, String email);

    @Query("SELECT NEW com.example.tpbackend.models.utilisateur.Employer(e.companyId, e.firstName, e.lastName, e.companyName, e.phoneNumber) FROM Employer e INNER JOIN e.utilisateur u")
    Employer findStudentByUtilisateur();
}
