package com.example.tpbackend.controllers;

import com.example.tpbackend.DTO.SignatureDTO;
import com.example.tpbackend.service.SignatureService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/stages/signatures")
@CrossOrigin(origins = "http://localhost:3000")
public class SignatureController {
    private final SignatureService signatureService;

    @PostMapping("/employers/create")
    @PreAuthorize("authenticated")
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
    @PreAuthorize("authenticated")
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
    @PreAuthorize("authenticated")
    public ResponseEntity<List<SignatureDTO>> getEmployerSignature() {
        return new ResponseEntity<>(signatureService.getSignature(), HttpStatus.OK);
    }

    @GetMapping("/employers/{id}")
    @PreAuthorize("authenticated")
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
    @PreAuthorize("authenticated")
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

    @PostMapping("/students/create")
    @PreAuthorize("authenticated")
    public ResponseEntity<SignatureDTO> createStudentSignature(@RequestBody SignatureDTO dto) {
        try {
            SignatureDTO signature = signatureService.createStudentSignature(dto);
            return new ResponseEntity<>(signature, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(dto);
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }


    @PutMapping("/students")
    @PreAuthorize("authenticated")
    public ResponseEntity<SignatureDTO> updateStudentSignature(@RequestBody SignatureDTO dto) {
        try {
            SignatureDTO signature = signatureService.updateStudentSignature(dto);
            return ResponseEntity.ok(signature);
        } catch (Exception e) {
            System.out.println(dto);
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/students/{matricule}")
    @PreAuthorize("authenticated")
    public ResponseEntity<SignatureDTO> getStudentSignature(@PathVariable String matricule) {
        try {
            SignatureDTO signature = signatureService.getStudentSignature(matricule);
            if (signature != null) {
                return ResponseEntity.ok(signature);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            System.out.println(matricule);
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/students/{matricule}")
    @PreAuthorize("authenticated")
    public ResponseEntity<String> deleteStudentSignature(@PathVariable String matricule) {
        try {
            signatureService.deleteStudentSignature(matricule);
            return ResponseEntity.ok("Signature supprimée");
        } catch (Exception e) {
            System.out.println(matricule);
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
