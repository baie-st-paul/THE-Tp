package com.example.tpbackend.repository;

import com.example.tpbackend.models.Entrevue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EntrevueRepository extends JpaRepository<Entrevue, Long> {
    List<Entrevue> findByStudentNotNull();
}
