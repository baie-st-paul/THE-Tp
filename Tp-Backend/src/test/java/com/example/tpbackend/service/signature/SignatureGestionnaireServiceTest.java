package com.example.tpbackend.service.signature;

import com.example.tpbackend.DTO.signature.SignatureGestionnaireDTO;
import com.example.tpbackend.models.signature.SignatureGestionnaire;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.gestionnaire.Gestionnaire;
import com.example.tpbackend.repository.signature.SignatureGestionnaireRepository;
import com.example.tpbackend.repository.utilisateur.GestionnaireRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ContextConfiguration(classes = {SignatureGestionnaireService.class})
@RunWith(SpringJUnit4ClassRunner.class)
@ExtendWith(MockitoExtension.class)
class SignatureGestionnaireServiceTest {
    @InjectMocks
    private SignatureGestionnaireService signatureGestionnaireService;

    @Mock
    private SignatureGestionnaireRepository signatureGestionnaireRepository;

    @Mock
    private GestionnaireRepository gestionnaireRepository;

    @Test
    void testCreateGestionnaireSignature() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setFirstName("Jane");
        utilisateur.setLastName("Doe");
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setPhoneNumber("6625550144");
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Gestionnaire);

        Gestionnaire gestionnaire = new Gestionnaire();
        gestionnaire.setUtilisateur(utilisateur);
        gestionnaire.setMatricule("2222222");


        SignatureGestionnaireDTO signatureDTO = new SignatureGestionnaireDTO();
        signatureDTO.setGestionnaireMatricule("2222222");
        signatureDTO.setImageLink("https://example.org/example");

        when(gestionnaireRepository.findByMatricule(any())).thenReturn(gestionnaire);
        when(signatureGestionnaireRepository.save(any(SignatureGestionnaire.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ArgumentCaptor<SignatureGestionnaire> signatureCaptor = ArgumentCaptor.forClass(SignatureGestionnaire.class);

        SignatureGestionnaireDTO result = signatureGestionnaireService.saveGestionnaireSignature(signatureDTO);

        assertNotNull(result);
        assertEquals("https://example.org/example", result.getImageLink());
        assertEquals("2222222", result.getGestionnaireMatricule());

        verify(signatureGestionnaireRepository, times(1)).save(signatureCaptor.capture());
        SignatureGestionnaire savedSignature = signatureCaptor.getValue();

        assertNotNull(savedSignature);
        assertEquals("https://example.org/example", savedSignature.getImageLink());
        assertNotNull(savedSignature.getGestionnaire());
        assertEquals("2222222", savedSignature.getGestionnaire().getMatricule());
    }

    @Test
    void testGetGestionnaireSignature() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setFirstName("Jane");
        utilisateur.setLastName("Doe");
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setPhoneNumber("6625550144");
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Gestionnaire);

        Gestionnaire gestionnaire = new Gestionnaire();
        gestionnaire.setUtilisateur(utilisateur);
        gestionnaire.setMatricule("2222222");

        SignatureGestionnaire signatureGestionnaire = new SignatureGestionnaire();
        signatureGestionnaire.setGestionnaire(gestionnaire);
        signatureGestionnaire.setImageLink("https://example.org/example");
        signatureGestionnaire.setId(1L);


        when(signatureGestionnaireRepository.findByGestionnaire_Matricule(any())).thenReturn(signatureGestionnaire);

        SignatureGestionnaireDTO result = signatureGestionnaireService.getGestionnaireSignature("2222222");

        assertNotNull(result);
        assertEquals("https://example.org/example", result.getImageLink());
        assertEquals("2222222", result.getGestionnaireMatricule());
    }

    @Test
    void testUpdateGestionnaireSignature(){
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setFirstName("Jane");
        utilisateur.setLastName("Doe");
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setPhoneNumber("6625550144");
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Gestionnaire);

        Gestionnaire gestionnaire = new Gestionnaire();
        gestionnaire.setUtilisateur(utilisateur);
        gestionnaire.setMatricule("2222222");

        SignatureGestionnaire signatureGestionnaire = new SignatureGestionnaire();
        signatureGestionnaire.setGestionnaire(gestionnaire);
        signatureGestionnaire.setImageLink("https://example.org/example");
        signatureGestionnaire.setId(1L);

        SignatureGestionnaireDTO dto = new SignatureGestionnaireDTO();
        dto.setGestionnaireMatricule("2222222");
        dto.setImageLink("https://example.org/example2");


        when(signatureGestionnaireRepository.save(any(SignatureGestionnaire.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(gestionnaireRepository.findByMatricule(any())).thenReturn(gestionnaire);

        SignatureGestionnaireDTO result = signatureGestionnaireService.updateGestionnaireSignature(dto);

        assertNotNull(result);
        assertEquals("https://example.org/example2", result.getImageLink());
        assertEquals("2222222", result.getGestionnaireMatricule());
        assertNotEquals("https://example.org/example", result.getImageLink());
    }

}
