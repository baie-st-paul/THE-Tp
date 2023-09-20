package com.example.tpbackend.models.utilisateur.etudiant;

import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;

public record StudentLogin(String token, StudentGetDTO studentGetDTO) {
}
