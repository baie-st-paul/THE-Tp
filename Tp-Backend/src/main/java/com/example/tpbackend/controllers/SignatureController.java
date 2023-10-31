package com.example.tpbackend.controllers;

import com.example.tpbackend.DTO.SignatureDTO;
import com.example.tpbackend.service.SignatureService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/stages/signatures")
@CrossOrigin(origins = "http://localhost:3000")
public class SignatureController {
    private final SignatureService signatureService;

    @PostMapping("/employers/create")
    public ResponseEntity<SignatureDTO> createSignature(@RequestBody SignatureDTO dto) {
        try {
            SignatureDTO signature = signatureService.saveEmployerSignature(dto);
            return new ResponseEntity<>(signature, HttpStatus.CREATED);
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

    @GetMapping("/employers")
    public ResponseEntity<List<SignatureDTO>> getEmployerSignature() {
        return new ResponseEntity<>(signatureService.getSignature(), HttpStatus.OK);
    }

    @GetMapping("/employers/{id}")
    public ResponseEntity<SignatureDTO> getEmployerSignature(@PathVariable long id) {
        try {
            SignatureDTO signature = signatureService.getEmployerSignature(id).get();
            return ResponseEntity.ok(signature);
        } catch (Exception e) {
            System.out.println(id);
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/employers/{id}")
    public ResponseEntity<String> deleteEmployerSignature(@PathVariable long id) {
        try {
            signatureService.deleteEmployerSignature(id);
            return ResponseEntity.ok("Signature supprimée");
        } catch (Exception e) {
            System.out.println(id);
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
