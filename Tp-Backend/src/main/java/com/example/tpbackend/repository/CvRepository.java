package com.example.tpbackend.repository;

import com.example.tpbackend.models.Cv;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CvRepository extends JpaRepository<Cv, String> {
}
