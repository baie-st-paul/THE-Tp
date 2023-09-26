package com.example.tpbackend.repository.utilisateur;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer>{
    @Query("SELECT COUNT(s) > 0 FROM Student s WHERE s.matricule = ?1 OR s.utilisateur.email = ?2")
    boolean existsByMatriculeOrEmail(String matricule, String email);

    @Query("SELECT NEW com.example.tpbackend.models.utilisateur.etudiant.Student(s.firstName, s.lastName, s.matricule, s.phoneNumber, s.program) FROM Student s INNER JOIN s.utilisateur u where u.email =?1")
    Student findStudentByUtilisateur(String email);


    @Query("SELECT NEW com.example.tpbackend.models.utilisateur.etudiant.Student(s.firstName, s.lastName, s.matricule, s.phoneNumber, s.program) FROM Student s WHERE s.matricule = ?1")
    Student findByMaticule(String matricule);
}
