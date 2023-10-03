package com.example.tpbackend.repository;


import com.example.tpbackend.models.Entrevue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EntrevueRepository extends JpaRepository<Entrevue, Long> {
    List<Entrevue> findAllByStudent_Matricule(String matricule);
    List<Entrevue> findAllByEmployer_Id(Long id);

    Entrevue findByStudent_MatriculeAndEmployer_IdAndDate(String matricule, Long id, String date);
}
