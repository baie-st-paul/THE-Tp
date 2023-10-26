package com.example.tpbackend.controllers;

import com.example.tpbackend.DTO.SignatureDTO;
import com.example.tpbackend.service.SignatureService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/stages/signatures")
public class SignatureController {
    private final SignatureService signatureService;

    @PostMapping("/employers")
    public ResponseEntity<SignatureDTO> createSignature(@RequestBody SignatureDTO dto) {
        try {
            SignatureDTO signature = signatureService.createEmployerSignature(dto);
            return ResponseEntity.ok(signature);
        } catch (Exception e) {
            System.out.println(dto);
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/employers")
    public ResponseEntity<SignatureDTO> updateSignature(@RequestBody SignatureDTO dto) {
        try {
            SignatureDTO signature = signatureService.updateEmployerSignature(dto);
            return ResponseEntity.ok(signature);
        } catch (Exception e) {
            System.out.println(dto);
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/employers/{email}")
    public ResponseEntity<SignatureDTO> getEmployerSignature(@PathVariable String email) {
        try {
            SignatureDTO signature = signatureService.getEmployerSignature(email);
            return ResponseEntity.ok(signature);
        } catch (Exception e) {
            System.out.println(email);
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/employers/{email}")
    public ResponseEntity<String> deleteEmployerSignature(@PathVariable String email) {
        try {
            signatureService.deleteEmployerSignature(email);
            return ResponseEntity.ok("Signature supprimée");
        } catch (Exception e) {
            System.out.println(email);
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
