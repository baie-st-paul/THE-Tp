package com.example.tpbackend.service.signature;

import com.example.tpbackend.DTO.signature.SignatureEmployerDTO;
import com.example.tpbackend.models.signature.SignatureEmployer;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.repository.signature.SignatureEmployerRepository;
import com.example.tpbackend.service.utilisateur.EmployerService;
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
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.verify;

@ContextConfiguration(classes = {SignatureEmployerService.class})
@RunWith(SpringJUnit4ClassRunner.class)
@ExtendWith(MockitoExtension.class)
class SignatureEmployerServiceTest {
    @InjectMocks
    private SignatureEmployerService signatureEmployerService;

    @Mock
    private SignatureEmployerRepository signatureEmployerRepository;

    @Mock
    private EmployerService employerService;

    @Test
    public void testCreateEmployerSignature() {
        SignatureEmployerDTO signatureDTO = new SignatureEmployerDTO(1L, "https://example.org/example");

        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setFirstName("Jane");
        utilisateur.setLastName("Doe");
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setPhoneNumber("6625550144");
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Employeur);

        Employer employer = new Employer();
        employer.setId(1L);
        employer.setCompanyName("Company Name");
        employer.setSignatureEmployer(new SignatureEmployer());
        employer.setUtilisateur(utilisateur);

        when(employerService.getEmployerById(1L)).thenReturn(employer);
        when(signatureEmployerRepository.save(any(SignatureEmployer.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ArgumentCaptor<SignatureEmployer> signatureCaptor = ArgumentCaptor.forClass(SignatureEmployer.class);

        SignatureEmployerDTO result = signatureEmployerService.saveEmployerSignature(signatureDTO);

        assertNotNull(result);
        assertEquals("https://example.org/example", result.getImageLink());
        assertEquals(1L, result.getEmployerId());

        verify(signatureEmployerRepository, times(1)).save(signatureCaptor.capture());
        SignatureEmployer savedSignature = signatureCaptor.getValue();

        assertNotNull(savedSignature);
        assertEquals("https://example.org/example", savedSignature.getImageLink());
        assertNotNull(savedSignature.getEmployer());
        assertEquals(1L, savedSignature.getEmployer().getId());
    }



    @Test
    public void testGetEmployerSignature() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setFirstName("Jane");
        utilisateur.setLastName("Doe");
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setPhoneNumber("6625550144");
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Employeur);

        Employer employer = new Employer();
        employer.setId(1L);
        employer.setCompanyName("Company Name");
        employer.setSignatureEmployer(new SignatureEmployer());
        employer.setUtilisateur(utilisateur);

        SignatureEmployer s = new SignatureEmployer();
        s.setImageLink("https://example.org/example");
        s.setEmployer(employer);
        s.setId(1L);


        when(signatureEmployerRepository.findSignatureEmployerByEmployer_Id(1L)).thenReturn(s);
        SignatureEmployerDTO result = signatureEmployerService.getSignatureByEmployerId(1L);

        assertNotNull(result);
        assertEquals("https://example.org/example", result.getImageLink());
        assertEquals(1L, result.getEmployerId());
        verify(signatureEmployerRepository, times(1)).findSignatureEmployerByEmployer_Id(1L);
    }

    @Test
    public void updateEmployerSignature() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setFirstName("Jane");
        utilisateur.setLastName("Doe");
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setPhoneNumber("6625550144");
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Employeur);

        Employer employer = new Employer();
        employer.setId(1L);
        employer.setCompanyName("Company Name");
        employer.setSignatureEmployer(new SignatureEmployer());
        employer.setUtilisateur(utilisateur);

        SignatureEmployer s = new SignatureEmployer();
        s.setImageLink("https://example.org/example");
        s.setEmployer(employer);
        s.setId(1L);

        SignatureEmployerDTO signatureDTO = mock(SignatureEmployerDTO.class);
        when(signatureDTO.getEmployerId()).thenThrow(new RuntimeException("foo"));
        when(signatureDTO.toSignatureEmployer()).thenReturn(s);
        assertThrows(RuntimeException.class, () -> signatureEmployerService.updateEmployerSignature(signatureDTO));
        verify(signatureDTO).toSignatureEmployer();
        verify(signatureDTO).getEmployerId();
    }

}
