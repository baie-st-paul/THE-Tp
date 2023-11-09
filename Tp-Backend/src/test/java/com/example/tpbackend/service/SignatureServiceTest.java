package com.example.tpbackend.service;

import com.example.tpbackend.DTO.SignatureDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerGetDTO;
import com.example.tpbackend.models.Signature;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import com.example.tpbackend.repository.SignatureRepository;
import com.example.tpbackend.repository.utilisateur.EmployerRepository;
import com.example.tpbackend.repository.utilisateur.StudentRepository;
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
    private EmployerService employerService;

    @Mock
    private StudentRepository studentRepository;

    @Test
    public void testCreateEmployerSignature() {
        SignatureDTO signatureDTO = new SignatureDTO( 1L, "https://example.org/example", null);

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.getUtilisateur().setFirstName("Jane");
        employer.setId(1L);
        employer.getUtilisateur().setLastName("Doe");
        employer.getUtilisateur().setPhoneNumber("6625550144");
        employer.setSignature(new Signature());
        employer.setUtilisateur(new Utilisateur(
                employer.getUtilisateur().getFirstName(),
                employer.getUtilisateur().getLastName(),
                "jane.doe@example.org",
                employer.getUtilisateur().getPhoneNumber(),
                "iloveyou",
                Utilisateur.Role.Employeur.toString()));

        EmployerGetDTO employerGetDTO = new EmployerGetDTO(
                employer.getId(),
                employer.getUtilisateur().getFirstName(),
                employer.getUtilisateur().getLastName(),
                employer.getCompanyName(),
                employer.getUtilisateur().getPhoneNumber(),
                employer.getUtilisateur().getEmail()
        );

        when(employerService.getEmployerById(1L)).thenReturn(employer);
        when(signatureRepository.save(any(Signature.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ArgumentCaptor<Signature> signatureCaptor = ArgumentCaptor.forClass(Signature.class);

        SignatureDTO result = signatureService.saveEmployerSignature(signatureDTO);

        assertNotNull(result);
        assertEquals("https://example.org/example", result.getImageLink());
        assertEquals(1L, result.getEmployerId());

        verify(signatureRepository, times(1)).save(signatureCaptor.capture());
        Signature savedSignature = signatureCaptor.getValue();

        assertNotNull(savedSignature);
        assertEquals("https://example.org/example", savedSignature.getImageLink());
        assertNotNull(savedSignature.getEmployer());
        assertEquals(1L, savedSignature.getEmployer().getId());
    }



    @Test
    public void testGetEmployerSignature() {
        Utilisateur user = new Utilisateur();
        user.setEmail("jane.doe@example.org");
        user.setId(1L);
        user.setPassword("iloveyou");
        user.setRole(Utilisateur.Role.Employeur);

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.getUtilisateur().setFirstName("Jane");
        employer.setId(1L);
        employer.getUtilisateur().setLastName("Doe");
        employer.setSignature(new Signature());
        employer.getUtilisateur().setPhoneNumber("6625550144");
        employer.setUtilisateur(user);

        Signature s = new Signature();
        s.setImageLink("https://example.org/example");
        s.setEmployer(employer);
        s.setId(1L);


        when(signatureRepository.findSignatureByEmployer_Id(1L)).thenReturn(s);
        SignatureDTO result = signatureService.getEmployerSignature(1L).get();

        assertNotNull(result);
        assertEquals("https://example.org/example", result.getImageLink());
        assertEquals(1L, result.getEmployerId());
        verify(signatureRepository, times(1)).findSignatureByEmployer_Id(1L);
    }

    @Test
    public void updateEmployerSignature() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Employeur);

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.getUtilisateur().setFirstName("Jane");
        employer.setId(1L);
        employer.getUtilisateur().setLastName("Doe");
        employer.setSignature(new Signature());
        employer.getUtilisateur().setPhoneNumber("6625550144");
        employer.setUtilisateur(utilisateur);

        Signature signature = new Signature();
        signature.setImageLink("https://example.org/example");
        signature.setEmployer(employer);
        signature.setId(1L);
        SignatureDTO signatureDTO = mock(SignatureDTO.class);
        when(signatureDTO.getEmployerId()).thenThrow(new RuntimeException("foo"));
        when(signatureDTO.toSignature()).thenReturn(signature);
        assertThrows(RuntimeException.class, () -> signatureService.updateEmployerSignature(signatureDTO));
        verify(signatureDTO).toSignature();
        verify(signatureDTO).getEmployerId();
    }

    @Test
    public void testDeleteEmployerSignature() {
        doNothing().when(signatureRepository).deleteSignatureById(anyLong());
        signatureService.deleteEmployerSignature(1L);
        verify(signatureRepository).deleteSignatureById(anyLong());
        assertTrue(signatureRepository.findSignatureById(1L).isEmpty());
    }

    @Test
    public void testCreateStudentSignature() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.com");
        utilisateur.setId(1L);
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Student);


        Student student = new Student();
        student.getUtilisateur().setFirstName("Jane");
        student.setMatricule("2222222");
        student.getUtilisateur().setLastName("Student");
        student.setProgram("Informatique");
        student.getUtilisateur().setPhoneNumber("6625550141");
        student.setOffresStages(new ArrayList<>());
        student.setUtilisateur(utilisateur);

        SignatureDTO signatureDTO = new SignatureDTO();
        signatureDTO.setStudentMatricule("2222222");
        signatureDTO.setImageLink("https://example.org/example");


        when(studentRepository.findByMatricule("2222222")).thenReturn(student);
        when(signatureRepository.save(any(Signature.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ArgumentCaptor<Signature> signatureCaptor = ArgumentCaptor.forClass(Signature.class);

        SignatureDTO result = signatureService.createStudentSignature(signatureDTO);

        assertNotNull(result);
        assertEquals("https://example.org/example", result.getImageLink());
        assertEquals("2222222", result.getStudentMatricule());

        verify(signatureRepository, times(1)).save(signatureCaptor.capture());
        Signature savedSignature = signatureCaptor.getValue();

        assertNotNull(savedSignature);
        assertEquals("https://example.org/example", savedSignature.getImageLink());
        assertNotNull(savedSignature.getStudent());
        assertEquals("2222222", savedSignature.getStudent().getMatricule());
    }

    @Test
    public void testGetStudentSignature(){
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.com");
        utilisateur.setId(1L);
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Student);

        Student student = new Student();
        student.getUtilisateur().setFirstName("Jane");
        student.setMatricule("2222222");
        student.getUtilisateur().setLastName("Student");
        student.setProgram("Informatique");
        student.getUtilisateur().setPhoneNumber("6625550141");
        student.setOffresStages(new ArrayList<>());
        student.setUtilisateur(utilisateur);

        Signature signature = new Signature();
        signature.setImageLink("https://example.org/example");
        signature.setEmployer(null);
        signature.setId(1L);
        signature.setStudent(student);


        when(signatureRepository.findSignatureByStudent_Matricule("2222222")).thenReturn(signature);
        SignatureDTO result = signatureService.getStudentSignature("2222222");

        assertNotNull(result);
        assertEquals("https://example.org/example", result.getImageLink());
        assertEquals("2222222", result.getStudentMatricule());
        verify(signatureRepository, times(1)).findSignatureByStudent_Matricule(any());
    }

    @Test
    public void testUpdateStudentSignature() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.com");
        utilisateur.setId(1L);
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Student);

        Student student = new Student();
        student.getUtilisateur().setFirstName("Jane");
        student.setMatricule("2222222");
        student.getUtilisateur().setLastName("Student");
        student.setProgram("Informatique");
        student.getUtilisateur().setPhoneNumber("6625550141");
        student.setOffresStages(new ArrayList<>());
        student.setUtilisateur(utilisateur);

        Signature s = new Signature();
        s.setImageLink("https://example.org/example");
        s.setStudent(student);
        s.setId(1L);

        SignatureDTO signatureDTO = new SignatureDTO();
        signatureDTO.setStudentMatricule("2222222");
        signatureDTO.setImageLink("newlink.org");

        when(studentRepository.findByMatricule(any())).thenReturn(student);
        when(signatureRepository.findSignatureByStudent_Matricule("2222222")).thenReturn(s);
        when(signatureRepository.save(any())).thenReturn(s);
        SignatureDTO result = signatureService.updateStudentSignature(signatureDTO);

        assertNotNull(result);
        assertNotEquals("https://example.org/example", result.getImageLink());
        assertEquals("newlink.org", result.getImageLink());
        assertEquals("2222222", result.getStudentMatricule());
        verify(signatureRepository, times(1)).save(any());
    }

    @Test
    public void testDeleteStudentSignature() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.com");
        utilisateur.setId(1L);
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Student);

        Student student = new Student();
        student.getUtilisateur().setFirstName("Jane");
        student.setMatricule("2222222");
        student.getUtilisateur().setLastName("Student");
        student.setProgram("Informatique");
        student.getUtilisateur().setPhoneNumber("6625550141");
        student.setOffresStages(new ArrayList<>());
        student.setUtilisateur(utilisateur);

        Signature s = new Signature();
        s.setImageLink("https://example.org/example");
        s.setStudent(student);
        s.setId(1L);

        student.setSignature(s);

        when(studentRepository.findByMatricule("2222222")).thenReturn(student);
        when(signatureRepository.findSignatureByStudent_Matricule("2222222")).thenReturn(s);

        signatureService.deleteStudentSignature("2222222");


        verify(signatureRepository, times(1)).delete(s);
        verify(studentRepository, times(1)).save(student);
    }

}