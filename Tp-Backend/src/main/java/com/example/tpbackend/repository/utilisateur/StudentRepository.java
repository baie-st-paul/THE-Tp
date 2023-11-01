package com.example.tpbackend.repository.utilisateur;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long>{
    Student findByMatricule(String matricule);

    Student findByUtilisateurId(Long id);

    @Query("SELECT s.tagName FROM Student s WHERE s.matricule = ?1")
    String findTagNameByMatricule(@Param("matricule") String matricule);

    @Modifying
    @Transactional
    @Query("UPDATE Student s SET s.tagName = ?2 WHERE s.matricule = ?1")
    void updateTagNameByMatricule(@Param("matricule") String matricule, @Param("tagName") String tagName);

    @Modifying
    @Transactional
    @Query("DELETE FROM Student s WHERE s.matricule = ?1")
    void deleteByMatricule(@Param("matricule") String matricule);
}
