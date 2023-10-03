package com.example.tpbackend.repository;

import com.example.tpbackend.models.Candidature;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidatureRepository extends JpaRepository<Candidature, Integer> {
}
