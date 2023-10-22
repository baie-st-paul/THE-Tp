package com.example.tpbackend.repository.utilisateur;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long>{
    Student findByMatricule(String matricule);

    Student findByUtilisateurId(Long id);

}
