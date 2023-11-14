package com.example.tpbackend.controllers.signature;

import com.example.tpbackend.DTO.signature.SignatureGestionnaireDTO;
import com.example.tpbackend.service.signature.SignatureGestionnaireService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/stages/signatures/gestionnaire")
@CrossOrigin(origins = "http://localhost:3000")
public class SignatureGestionnaireController {

    private final SignatureGestionnaireService signatureGestionnaireService;

    @GetMapping("/get/{matricule}")
    @PreAuthorize("authenticated")
    public ResponseEntity<SignatureGestionnaireDTO> getGestionnaireSignature(@PathVariable String matricule) {
        try {
            SignatureGestionnaireDTO signature = signatureGestionnaireService.getGestionnaireSignature(matricule);
            return ResponseEntity.ok(signature);
        } catch (Exception e) {
            System.out.println(matricule);
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/create")
    @PreAuthorize("authenticated")
    public ResponseEntity<SignatureGestionnaireDTO> createGestionnaireSignature(@RequestBody SignatureGestionnaireDTO dto) {
        try {
            SignatureGestionnaireDTO signature = signatureGestionnaireService.saveGestionnaireSignature(dto);
            return new ResponseEntity<>(signature, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(dto);
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update")
    @PreAuthorize("authenticated")
    public ResponseEntity<SignatureGestionnaireDTO> updateGestionnaireSignature(@RequestBody SignatureGestionnaireDTO dto) {
        try {
            SignatureGestionnaireDTO signature = signatureGestionnaireService.updateGestionnaireSignature(dto);
            return ResponseEntity.ok(signature);
        } catch (Exception e) {
            System.out.println(dto);
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
