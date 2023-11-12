package com.example.tpbackend.controllers;

import com.example.tpbackend.DTO.entrevue.EntrevueDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.service.EntrevueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/stages/entrevues")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class EntrevueController {
    private final EntrevueService entrevueService;

    @PostMapping
    @PreAuthorize("authenticated")
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
    @PreAuthorize("authenticated")
    public ResponseEntity<EntrevueDTO> updateStatus(@RequestBody EntrevueDTO entrevueDTO, @RequestParam String newStatus) {
        EntrevueDTO updatedEntrevue = entrevueService.updateStatus(entrevueDTO, newStatus);
        return new ResponseEntity<>(updatedEntrevue, HttpStatus.OK);
    }

    @GetMapping("/students/{matricule}")
    @PreAuthorize("authenticated")
    public ResponseEntity<List<EntrevueDTO>> getStudentEntrevues(@PathVariable String matricule) {
        List<EntrevueDTO> entrevues = entrevueService.getStudentEntrevues(matricule);
        return new ResponseEntity<>(entrevues, HttpStatus.OK);
    }

    @GetMapping("/{matricule}")
    @PreAuthorize("authenticated")
    public ResponseEntity<List<EntrevueDTO>> getEntrevuesStudentMatricule(@PathVariable String matricule) {
        List<EntrevueDTO> entrevues = entrevueService.getAllEntrevuesStudentMatricule(matricule);
        return new ResponseEntity<>(entrevues, HttpStatus.OK);
    }

    @PutMapping("/manageStatusByMatricule/{matricule}/{newStatus}")
    @PreAuthorize("authenticated")
    public ResponseEntity<String> manageStatusByMatricule(@PathVariable String matricule, @PathVariable String newStatus) {
       entrevueService.manageStatusByMatricule(matricule, newStatus);
        return new ResponseEntity<>("Status changed", HttpStatus.OK);
    }

    @GetMapping("/students/interviewed-by-employer/{employerId}")
    @PreAuthorize("authenticated")
    public ResponseEntity<List<StudentGetDTO>> getStudentsForInterviewByEmployerId(@PathVariable Long employerId){
        return ResponseEntity.ok(entrevueService.getStudentsForInterviewByEmployerId(employerId));
    }

}
