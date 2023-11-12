package com.example.tpbackend.controllers.signature;

import com.example.tpbackend.DTO.signature.SignatureEmployerDTO;
import com.example.tpbackend.service.signature.SignatureEmployerService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/stages/signatures/employer")
@CrossOrigin(origins = "http://localhost:3000")
public class SignatureEmployerController {
    private final SignatureEmployerService signatureEmployerService;

    @GetMapping("/get/{id}")
    @PreAuthorize("authenticated")
    public ResponseEntity<SignatureEmployerDTO> getEmployerSignature(@PathVariable long id) {
        try {
            SignatureEmployerDTO signature = signatureEmployerService.getSignatureByEmployerId(id);
            return ResponseEntity.ok(signature);
        } catch (Exception e) {
            System.out.println(id);
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/create")
    @PreAuthorize("authenticated")
    public ResponseEntity<SignatureEmployerDTO> createSignature(@RequestBody SignatureEmployerDTO dto) {
        try {
            SignatureEmployerDTO signature = signatureEmployerService.saveEmployerSignature(dto);
            return new ResponseEntity<>(signature, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(dto);
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update")
    @PreAuthorize("authenticated")
    public ResponseEntity<SignatureEmployerDTO> updateSignature(@RequestBody SignatureEmployerDTO dto) {
        try {
            SignatureEmployerDTO signature = signatureEmployerService.updateEmployerSignature(dto);
            return ResponseEntity.ok(signature);
        } catch (Exception e) {
            System.out.println(dto);
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("authenticated")
    public ResponseEntity<String> deleteEmployerSignature(@PathVariable long id) {
        try {
            signatureEmployerService.deleteSignatureByEmployerId(id);
            return ResponseEntity.ok("Signature supprimée");
        } catch (Exception e) {
            System.out.println(id);
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
