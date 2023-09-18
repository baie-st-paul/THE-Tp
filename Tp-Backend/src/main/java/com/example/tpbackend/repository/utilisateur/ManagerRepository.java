package com.example.tpbackend.repository.utilisateur;

import com.example.tpbackend.models.utilisateur.Gestionnaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManagerRepository extends JpaRepository<Gestionnaire, Integer> {

    boolean existsByMatricule(String matricule);

}
