package com.example.tpbackend.controllers;

import com.example.tpbackend.service.ContratStageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/contrats")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class ContratController {

    private final ContratStageService contratService;

    @PostMapping("employer/signe/{contratId}/{empId}")
    @PreAuthorize("authenticated")
    public ResponseEntity<String> signeContratEmp(@PathVariable Long contratId, @PathVariable Long empId) {
        try {
            contratService.signerContratEmp(contratId,empId);
            return ResponseEntity.ok("Contrat Signe par Emp");
        } catch (Exception e) {
            System.out.println(contratId + " " + empId);
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
