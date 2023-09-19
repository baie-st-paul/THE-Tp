package com.example.tpbackend.repository;

import com.example.tpbackend.models.Cv;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CvRepository extends JpaRepository<Cv, String> {
    List<Cv> getAllByFileName(String fileName);
    @Query(value = "SELECT count(c) FROM Cv c")
    int nbrCvs();
}
