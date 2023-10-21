package com.example.tpbackend.controllers;

import com.example.tpbackend.DTO.EntrevueDTO;
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
            System.out.println(dto);
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity<EntrevueDTO> updateStatus(@RequestBody EntrevueDTO entrevueDTO, @RequestParam String newStatus) {
        EntrevueDTO updatedEntrevue = entrevueService.updateStatus(entrevueDTO, newStatus);
        return new ResponseEntity<>(updatedEntrevue, HttpStatus.OK);
    }

    @GetMapping("/students/{matricule}")
    public ResponseEntity<List<EntrevueDTO>> getStudentEntrevues(@PathVariable String matricule) {
        List<EntrevueDTO> entrevues = entrevueService.getStudentEntrevues(matricule);
        return new ResponseEntity<>(entrevues, HttpStatus.OK);
    }

    @GetMapping("/{matricule}")
    public ResponseEntity<List<EntrevueDTO>> getEntrevuesStudentMatricule(@PathVariable String matricule) {
        List<EntrevueDTO> entrevues = entrevueService.getAllEntrevuesStudentMatricule(matricule);
        return new ResponseEntity<>(entrevues, HttpStatus.OK);
    }

    @PutMapping("manageStatusByMatricule/{matricule}/{newStatus}")
    public ResponseEntity<String> manageStatusByMatricule(@PathVariable String matricule, @PathVariable String newStatus) {
       entrevueService.manageStatusByMatricule(matricule, newStatus);
        return new ResponseEntity<>("Status changed", HttpStatus.OK);
    }
}
