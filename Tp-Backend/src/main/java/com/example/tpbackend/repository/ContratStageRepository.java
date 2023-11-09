package com.example.tpbackend.repository;

import com.example.tpbackend.models.ContratStage;
import com.example.tpbackend.models.Signature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ContratStageRepository extends JpaRepository<ContratStage, Long> {
    @Query("SELECT c FROM ContratStage c WHERE c.id = ?1")
    ContratStage findSignatureByContrat_Id(long contratId);

}
