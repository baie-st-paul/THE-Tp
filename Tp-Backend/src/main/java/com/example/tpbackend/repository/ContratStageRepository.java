package com.example.tpbackend.repository;

import com.example.tpbackend.models.ContratStage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContratStageRepository extends JpaRepository<ContratStage, Long> {
}
