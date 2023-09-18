package com.example.tpbackend.repository.utilisateur;

import com.example.tpbackend.models.utilisateur.Gestionnaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GestionnaireRepository extends JpaRepository<Gestionnaire, Integer> {

    boolean existsByMatricule(String matricule);

    @Query("SELECT COUNT(g) > 0 FROM Gestionnaire g WHERE g.matricule = ?1 OR g.utilisateur.email = ?2")
    boolean existsByMatriculeOrEmail(String matricule, String email);

    @Query("SELECT NEW com.example.tpbackend.models.utilisateur.Gestionnaire(g.firstName, g.lastName, g.matricule, g.phoneNumber) FROM Gestionnaire g INNER JOIN g.utilisateur u")
    Gestionnaire findStudentByUtilisateur();
}
