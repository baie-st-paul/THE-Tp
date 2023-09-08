package com.example.tpbackend.controllers;

import com.example.tpbackend.DTO.PostDTO.StudentPostDTO;
import com.example.tpbackend.service.StudentServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/stages") // v1 = version 1
@CrossOrigin(origins = "*")
@RequiredArgsConstructor

public class Controller{
    private final StudentServices studentServices;

    @PostMapping("/newStudent")
    public void createStudent(@RequestBody StudentPostDTO dto){
        studentServices.saveStudent(dto.getFirstName(), dto.getLastName(), dto.getPhoneNumber(), dto.getMatricule(), dto.getProgram(), dto.getEmail(), dto.getPassword());

    }




}
