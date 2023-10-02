package com.example.tpbackend.controllers;

import com.example.tpbackend.DTO.EntrevueDTO;
import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.models.utilisateur.Entrevue;
import com.example.tpbackend.service.EntrevueService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/employer/{id}")
    public ResponseEntity<List<EntrevueDTO>> getEmployersEntrevues(@PathVariable("id") Long id) {
        List<EntrevueDTO> entrevues = entrevueService.getEntrevueByEmployer(id);
        return new ResponseEntity<>(entrevues, HttpStatus.OK);
    }

    @GetMapping("/student/{id}")
    public ResponseEntity<List<EntrevueDTO>> getStudentEntrevues(@PathVariable("id") String matricule) {
        List<EntrevueDTO> entrevues = entrevueService.getEntrevueByStudent(matricule);
        return new ResponseEntity<>(entrevues, HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<EntrevueDTO> updateStatus(@RequestBody EntrevueDTO entrevueDTO, @RequestParam String newStatus) {
        EntrevueDTO updatedEntrevue = entrevueService.updateStatus(entrevueDTO, newStatus);
        return new ResponseEntity<>(updatedEntrevue, HttpStatus.OK);
    }
}
