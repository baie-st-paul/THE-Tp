package com.example.tpbackend.controllers.signature;

import com.example.tpbackend.DTO.signature.SignatureStudentDTO;
import com.example.tpbackend.service.signature.SignatureStudentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/stages/signatures/student")
@CrossOrigin(origins = "http://localhost:3000")
public class SignatureStudentController {
    private final SignatureStudentService signatureStudentService;

    @GetMapping("/get/{matricule}")
    @PreAuthorize("authenticated")
    public ResponseEntity<SignatureStudentDTO> getStudentSignature(@PathVariable String matricule) {
        try {
            SignatureStudentDTO signature = signatureStudentService.getSignatureByStudentMatricule(matricule);
            return ResponseEntity.ok(signature);
        } catch (Exception e) {
            System.out.println(matricule);
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/create")
    @PreAuthorize("authenticated")
    public ResponseEntity<SignatureStudentDTO> createStudentSignature(@RequestBody SignatureStudentDTO dto) {
        try {
            SignatureStudentDTO signature = signatureStudentService.saveStudentSignature(dto);
            return new ResponseEntity<>(signature, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(dto);
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update")
    @PreAuthorize("authenticated")
    public ResponseEntity<SignatureStudentDTO> updateStudentSignature(@RequestBody SignatureStudentDTO dto) {
        try {
            SignatureStudentDTO signature = signatureStudentService.updateStudentSignature(dto);
            return ResponseEntity.ok(signature);
        } catch (Exception e) {
            System.out.println(dto);
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{matricule}")
    @PreAuthorize("authenticated")
    public ResponseEntity<String> deleteStudentSignature(@PathVariable String matricule) {
        try {
            signatureStudentService.deleteSignatureByStudentMatricule(matricule);
            return ResponseEntity.ok("Signature supprimée");
        } catch (Exception e) {
            System.out.println(matricule);
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
