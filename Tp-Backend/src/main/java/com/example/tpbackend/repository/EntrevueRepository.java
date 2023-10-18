package com.example.tpbackend.repository;

import com.example.tpbackend.models.Entrevue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntrevueRepository extends JpaRepository<Entrevue, Long> {
}
