package com.example.tpbackend.models.utilisateur;

import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;

public record LoginUser(String token, StudentGetDTO studentGetDTO) {
}
