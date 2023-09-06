package com.example.tpbackend.repository;
import com.example.tpbackend.DTO.PostDTO.StudentPostDTO;
import com.example.tpbackend.models.utilisateur.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer>{

}
