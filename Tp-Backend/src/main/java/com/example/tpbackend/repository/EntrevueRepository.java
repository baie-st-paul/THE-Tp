package com.example.tpbackend.repository;

import com.example.tpbackend.models.Entrevue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EntrevueRepository extends JpaRepository<Entrevue, Long> {
    List<Entrevue> findAllByStudent_Matricule(String matricule);
    List<Entrevue> findAllByEmployer_Id(Long id);

    Entrevue findByStudent_MatriculeAndEmployer_IdAndDateHeure(String matricule, Long id, String date);
}
