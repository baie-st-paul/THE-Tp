package com.example.tpbackend.repository;

import com.example.tpbackend.models.EvaluationMilieuStagePDF;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EvaluationMilieuStageRepository extends JpaRepository<EvaluationMilieuStagePDF, Long> {
}
