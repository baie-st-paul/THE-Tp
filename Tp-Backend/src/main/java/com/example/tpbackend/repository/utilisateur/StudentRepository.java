package com.example.tpbackend.repository.utilisateur;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long>{
    /*
    @Query(
            "SELECT NEW com.example.tpbackend.models.utilisateur.etudiant.Student(s.firstName, s.lastName, s.matricule, s.phoneNumber, s.program) " +
            "FROM Student s " +
            "WHERE s.matricule = ?1"
    )
    Student findByMaticule(String matricule);
*/
    /*
    @Query(
            "SELECT NEW com.example.tpbackend.models.utilisateur.etudiant.Student(s.matricule, s.program, u) " +
            "FROM Student s " +
            "LEFT JOIN Utilisateur u "+
            "WHERE s.matricule = ?1 " +
            "AND s.utilisateur.id = u.id"
    )
    */
    Student findByMatricule(String matricule);

}
