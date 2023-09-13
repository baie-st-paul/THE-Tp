package com.example.tpbackend.repository;

import com.example.tpbackend.models.utilisateur.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Utilisateur, Integer> {
    boolean existsByEmail(String email);

    @Query("SELECT COUNT(s) > 0 FROM Student s WHERE s.utilisateur.email = ?1 OR s.utilisateur.password = ?2")
    boolean findByEmailAndPassword(String email, String password);

    Utilisateur findByEmail(String email);
}
