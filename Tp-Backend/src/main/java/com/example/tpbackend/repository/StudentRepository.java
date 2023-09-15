package com.example.tpbackend.repository;
import com.example.tpbackend.models.utilisateur.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer>{
    @Query("SELECT COUNT(s) > 0 FROM Student s WHERE s.matricule = ?1 OR s.utilisateur.email = ?2")
    boolean existsByMatriculeOrEmail(String matricule, String email);




}
