package com.example.tpbackend.repository;

import com.example.tpbackend.models.Entrevue;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
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

    @Query("SELECT e FROM Entrevue e WHERE e.student.matricule = ?1")
    List<Entrevue> getAllByStudentMatricule(String matricule);

    @Modifying
    @Transactional
    @Query("UPDATE Entrevue SET status = ?2 WHERE id = ?1")
    void updateStatusById(Long id, Entrevue.Status newStatus);

    @Modifying
    @Transactional
    @Query("UPDATE Entrevue SET statusVuPasVuG = ?2 WHERE student.matricule = ?1")
    void updateStatusVuPasVuGByMatricule(String matricule, Entrevue.StatusVuPasVu newStatus);

    @Modifying
    @Transactional
    @Query("UPDATE Entrevue SET statusVuPasVuS = ?2 WHERE student.matricule = ?1")
    void updateStatusVuPasVuSByMatricule(String matricule, Entrevue.StatusVuPasVu newStatus);

    List<Entrevue> findByEmployer(Employer employer);

    @Modifying
    @Transactional
    @Query("UPDATE Entrevue " +
            "SET dateHeure = ?2, description = ?3,status = ?4, statusVuPasVuG = ?5, statusVuPasVuS = ?6 " +
            "WHERE id = ?1")
    void updateById(long id,
                    String dateHeure,
                    String description,
                    Entrevue.Status newStatus ,
                    Entrevue.StatusVuPasVu statusVuPasVuG,
                    Entrevue.StatusVuPasVu statusVuPasVuS);
}
