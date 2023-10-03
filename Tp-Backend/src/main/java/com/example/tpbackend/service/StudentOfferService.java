package com.example.tpbackend.service;

import com.example.tpbackend.DTO.StudentOfferDTO;
import com.example.tpbackend.models.utilisateur.Utilisateur;

import java.util.List;



public interface StudentOfferService {
    List<StudentOfferDTO> getStudentsByOfferId(Long offerId, Utilisateur user);
}

