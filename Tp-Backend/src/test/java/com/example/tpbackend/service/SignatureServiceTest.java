package com.example.tpbackend.service;

import com.example.tpbackend.DTO.SignatureDTO;
import com.example.tpbackend.models.Signature;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.repository.SignatureRepository;
import com.example.tpbackend.repository.utilisateur.EmployerRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;

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
    private EmployerRepository employerRepository;

    @Test
    public void testCreateEmployerSignature() throws Exception {
        Utilisateur user = new Utilisateur();
        user.setEmail("jane.doe@example.org");
        user.setId(1L);
        user.setPassword("iloveyou");
        user.setRole(Utilisateur.Role.Employeur);

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setFirstName("Jane");
        employer.setId(1L);
        employer.setLastName("Doe");
        employer.setOffresStages(new ArrayList<>());
        employer.setPhoneNumber("6625550144");
        employer.setUtilisateur(user);

        SignatureDTO signatureDTO = new SignatureDTO();
        signatureDTO.setUserEmail("jane.doe@example.org");
        signatureDTO.setImageLink("https://example.org/example");


        when(employerRepository.findEmployerByUtilisateur_Email(any())).thenReturn(employer);
        SignatureDTO result = signatureService.createEmployerSignature(signatureDTO);


        assertNotNull(result);
        assertEquals("https://example.org/example", result.getImageLink());
        assertEquals("jane.doe@example.org", result.getUserEmail());
        assertNotNull(employer.getSignature());
        verify(signatureRepository, times(1)).save(any());
    }

    @Test
    public void testGetEmployerSignature() throws Exception {
        Utilisateur user = new Utilisateur();
        user.setEmail("jane.doe@example.org");
        user.setId(1L);
        user.setPassword("iloveyou");
        user.setRole(Utilisateur.Role.Employeur);

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setFirstName("Jane");
        employer.setId(1L);
        employer.setLastName("Doe");
        employer.setOffresStages(new ArrayList<>());
        employer.setPhoneNumber("6625550144");
        employer.setUtilisateur(user);

        Signature s = new Signature();
        s.setImageLink("https://example.org/example");
        s.setEmployer(employer);
        s.setId(1L);


        when(signatureRepository.findByEmployer_Utilisateur_Email("jane.doe@example.org")).thenReturn(s);
        SignatureDTO result = signatureService.getEmployerSignature("jane.doe@example.org");

        assertNotNull(result);
        assertEquals("https://example.org/example", result.getImageLink());
        assertEquals("jane.doe@example.org", result.getUserEmail());
        verify(signatureRepository, times(1)).findByEmployer_Utilisateur_Email(any());
    }

    @Test
    public void updateEmployerSignature() throws Exception {
        Utilisateur user = new Utilisateur();
        user.setEmail("jane.doe@example.org");
        user.setId(1L);
        user.setPassword("iloveyou");
        user.setRole(Utilisateur.Role.Employeur);

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setFirstName("Jane");
        employer.setId(1L);
        employer.setLastName("Doe");
        employer.setOffresStages(new ArrayList<>());
        employer.setPhoneNumber("6625550144");
        employer.setUtilisateur(user);

        Signature s = new Signature();
        s.setImageLink("https://example.org/example");
        s.setEmployer(employer);
        s.setId(1L);

        SignatureDTO signatureDTO = new SignatureDTO();
        signatureDTO.setUserEmail("jane.doe@example.org");
        signatureDTO.setImageLink("newlink.org");

        when(employerRepository.findEmployerByUtilisateur_Email(any())).thenReturn(employer);
        when(signatureRepository.findByEmployer_Utilisateur_Email("jane.doe@example.org")).thenReturn(s);
        when(signatureRepository.save(any())).thenReturn(s);
        SignatureDTO result = signatureService.updateEmployerSignature(signatureDTO);

        assertNotNull(result);
        assertNotEquals("https://example.org/example", result.getImageLink());
        assertEquals("newlink.org", result.getImageLink());
        assertEquals("jane.doe@example.org", result.getUserEmail());
        verify(signatureRepository, times(1)).save(any());
    }
    @Test
    public void testDeleteEmployerSignature() throws Exception {
        Utilisateur user = new Utilisateur();
        user.setEmail("jane.doe@example.org");
        user.setId(1L);
        user.setPassword("iloveyou");
        user.setRole(Utilisateur.Role.Employeur);

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setFirstName("Jane");
        employer.setId(1L);
        employer.setLastName("Doe");
        employer.setOffresStages(new ArrayList<>());
        employer.setPhoneNumber("6625550144");
        employer.setUtilisateur(user);

        Signature s = new Signature();
        s.setImageLink("https://example.org/example");
        s.setEmployer(employer);
        s.setId(1L);
        employer.setSignature(s);


        when(employerRepository.findEmployerByUtilisateur_Email(any())).thenReturn(employer);
        when(signatureRepository.findByEmployer_Utilisateur_Email("jane.doe@example.org")).thenReturn(s);
        signatureService.deleteEmployerSignature("jane.doe@example.org");

        assertNull(employer.getSignature());
        verify(signatureRepository, times(1)).delete(any());
        verify(employerRepository, times(1)).save(any());
    }

}
