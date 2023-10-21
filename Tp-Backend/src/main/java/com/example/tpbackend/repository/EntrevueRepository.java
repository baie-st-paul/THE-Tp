package com.example.tpbackend.repository;

import com.example.tpbackend.DTO.EntrevueDTO;
import com.example.tpbackend.models.Cv;
import com.example.tpbackend.models.Entrevue;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EntrevueRepository extends JpaRepository<Entrevue, Long> {

    Entrevue findByStudent_MatriculeAndEmployer_IdAndDateHeure(String number, long l, String dateHeure);

    List<Entrevue> findAllByStudent_Matricule(String matricule);

    @Modifying
    @Transactional
    @Query("UPDATE Entrevue  SET status = ?2   WHERE student.matricule =  ?1")
    void updateStatusByMatricule(String matricule, Entrevue.Status newStatus);
    List<Entrevue> findByStudentNotNull();
}
