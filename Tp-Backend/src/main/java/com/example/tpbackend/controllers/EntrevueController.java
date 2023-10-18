package com.example.tpbackend.controllers;

import com.example.tpbackend.DTO.EntrevueDTO;
import com.example.tpbackend.service.EntrevueService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/stages/entrevues")
@CrossOrigin(origins = "http://localhost:3000")
public class EntrevueController {
    private final EntrevueService entrevueService;

    @PostMapping
    public ResponseEntity<EntrevueDTO> createEntrevue(@RequestBody EntrevueDTO dto) {
        try {
            EntrevueDTO entrevue = entrevueService.createEntrevue(dto);
            return new ResponseEntity<>(entrevue, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(dto);
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
