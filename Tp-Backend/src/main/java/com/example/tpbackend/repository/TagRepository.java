package com.example.tpbackend.repository;

import com.example.tpbackend.models.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    boolean existsByTagName(String tagName);
    List<Tag> findAll();
}