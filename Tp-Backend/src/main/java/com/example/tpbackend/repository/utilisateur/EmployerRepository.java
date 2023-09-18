package com.example.tpbackend.repository.utilisateur;

import com.example.tpbackend.models.utilisateur.Employer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployerRepository extends JpaRepository<Employer, String> {
    boolean existsByCompanyName(String companyName);

    Employer getByCompanyId(String companyId);
}
