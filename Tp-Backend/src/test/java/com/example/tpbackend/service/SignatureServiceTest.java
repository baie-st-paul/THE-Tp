package com.example.tpbackend.service;

import com.example.tpbackend.DTO.SignatureDTO;
import com.example.tpbackend.models.Signature;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.repository.SignatureRepository;
import com.example.tpbackend.repository.utilisateur.EmployerRepository;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


@ContextConfiguration(classes = {SignatureService.class})
@RunWith(SpringJUnit4ClassRunner.class)
@ExtendWith(MockitoExtension.class)
class SignatureServiceTest {

    @InjectMocks
    private SignatureService signatureService;

    @Mock
    private SignatureRepository signatureRepository;

    @Mock
    private UtilisateurRepository userRepository;

    @Mock
    private EmployerRepository employerRepository;

    @Test
    public void testCreateEmployerSignature() throws Exception {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Employeur);

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setFirstName("Jane");
        employer.setId(1L);
        employer.setLastName("Doe");
        employer.setOffresStages(new ArrayList<>());
        employer.setPhoneNumber("6625550144");
        employer.setUtilisateur(utilisateur);

        SignatureDTO signatureDTO = new SignatureDTO();
        signatureDTO.setUserId("1");
        signatureDTO.setImageLink("https://example.org/example");


        when(userRepository.findById(1)).thenReturn(Optional.of(utilisateur));
        when(employerRepository.findEmployerByUtilisateur_Email(any())).thenReturn(employer);
        SignatureDTO result = signatureService.createEmployerSignature(signatureDTO);


        assertNotNull(result);
        assertEquals("https://example.org/example", result.getImageLink());
        assertEquals("1", result.getUserId());
        assertNotNull(employer.getSignature());
        verify(signatureRepository, times(1)).save(any());
    }

    @Test
    public void testGetEmployerSignature() throws Exception {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Employeur);

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setFirstName("Jane");
        employer.setId(1L);
        employer.setLastName("Doe");
        employer.setOffresStages(new ArrayList<>());
        employer.setPhoneNumber("6625550144");
        employer.setUtilisateur(utilisateur);

        Signature s = new Signature();
        s.setImageLink("https://example.org/example");
        s.setUser(utilisateur);
        s.setId(1L);

        when(userRepository.findById(1)).thenReturn(Optional.of(utilisateur));
        when(signatureRepository.findByUserId(1)).thenReturn(s);
        SignatureDTO result = signatureService.getEmployerSignature("1");

        assertNotNull(result);
        assertEquals("https://example.org/example", result.getImageLink());
        assertEquals("1", result.getUserId());
        verify(signatureRepository, times(1)).findByUserId(1);
    }

    @Test
    public void updateEmployerSignature() throws Exception {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Employeur);

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setFirstName("Jane");
        employer.setId(1L);
        employer.setLastName("Doe");
        employer.setOffresStages(new ArrayList<>());
        employer.setPhoneNumber("6625550144");
        employer.setUtilisateur(utilisateur);

        Signature s = new Signature();
        s.setImageLink("https://example.org/example");
        s.setUser(utilisateur);
        s.setId(1L);

        SignatureDTO signatureDTO = new SignatureDTO();
        signatureDTO.setUserId("1");
        signatureDTO.setImageLink("newlink.org");

        when(userRepository.findById(1)).thenReturn(Optional.of(utilisateur));
        when(employerRepository.findEmployerByUtilisateur_Email(any())).thenReturn(employer);
        when(signatureRepository.findByUserId(1L)).thenReturn(s);
        when(signatureRepository.save(any())).thenReturn(s);
        SignatureDTO result = signatureService.updateEmployerSignature(signatureDTO);

        assertNotNull(result);
        assertNotEquals("https://example.org/example", result.getImageLink());
        assertEquals("newlink.org", result.getImageLink());
        assertEquals("1", result.getUserId());
        verify(signatureRepository, times(1)).save(any());
    }

}
