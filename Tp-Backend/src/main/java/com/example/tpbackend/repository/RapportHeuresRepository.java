package com.example.tpbackend.repository;

import com.example.tpbackend.models.RapportHeures;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RapportHeuresRepository extends JpaRepository<RapportHeures, Long> {
}
