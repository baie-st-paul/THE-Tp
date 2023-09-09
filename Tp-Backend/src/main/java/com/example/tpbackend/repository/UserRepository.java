package com.example.tpbackend.repository;

import com.example.tpbackend.models.utilisateur.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Utilisateur, Integer> {
    Utilisateur findByEmailAndPassword(String email, String password);
    boolean existsByEmail(String email);
}
