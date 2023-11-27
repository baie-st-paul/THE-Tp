package com.example.tpbackend.repository;

import com.example.tpbackend.models.GenerateContratPDF;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenerateContratPDFRepository extends JpaRepository<GenerateContratPDF, Long> {
}
