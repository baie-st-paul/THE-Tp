package com.example.tpbackend.repository;

import com.example.tpbackend.models.EvaluationPDF;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface EvaluationPDFRepository extends JpaRepository<EvaluationPDF, Long> {
}
