package com.example.tpbackend.repository;

import com.example.tpbackend.models.StudentOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentOfferRepository extends JpaRepository<StudentOffer, Long> {

    List<StudentOffer> findOfferById(Long offerId);
}
