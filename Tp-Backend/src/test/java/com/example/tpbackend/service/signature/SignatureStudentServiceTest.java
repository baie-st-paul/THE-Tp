package com.example.tpbackend.service.signature;

import com.example.tpbackend.DTO.signature.SignatureStudentDTO;
import com.example.tpbackend.models.signature.SignatureStudent;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import com.example.tpbackend.repository.signature.SignatureStudentRepository;
import com.example.tpbackend.repository.utilisateur.StudentRepository;
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
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

@ContextConfiguration(classes = {SignatureStudentService.class})
@RunWith(SpringJUnit4ClassRunner.class)
@ExtendWith(MockitoExtension.class)
class SignatureStudentServiceTest {
    @InjectMocks
    private SignatureStudentService signatureStudentService;

    @Mock
    private SignatureStudentRepository signatureStudentRepository;
    @Mock
    private StudentRepository studentRepository;

    @Test
    public void testCreateStudentSignature() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setFirstName("Jane");
        utilisateur.setLastName("Doe");
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setPhoneNumber("6625550144");
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Student);

        Student student = new Student();
        student.setMatricule("2222222");
        student.setProgram("Informatique");
        student.setOffresStages(new ArrayList<>());
        student.setSignatureStudent(new SignatureStudent());
        student.setUtilisateur(utilisateur);

        SignatureStudentDTO signatureDTO = new SignatureStudentDTO();
        signatureDTO.setStudentMatricule("2222222");
        signatureDTO.setImageLink("https://example.org/example");

        when(studentRepository.findByMatricule("2222222")).thenReturn(student);
        when(signatureStudentRepository.save(any(SignatureStudent.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ArgumentCaptor<SignatureStudent> signatureCaptor = ArgumentCaptor.forClass(SignatureStudent.class);

        SignatureStudentDTO result = signatureStudentService.saveStudentSignature(signatureDTO);

        assertNotNull(result);
        assertEquals("https://example.org/example", result.getImageLink());
        assertEquals("2222222", result.getStudentMatricule());

        verify(signatureStudentRepository, times(1)).save(signatureCaptor.capture());
        SignatureStudent savedSignature = signatureCaptor.getValue();

        assertNotNull(savedSignature);
        assertEquals("https://example.org/example", savedSignature.getImageLink());
        assertNotNull(savedSignature.getStudent());
        assertEquals("2222222", savedSignature.getStudent().getMatricule());
    }

    @Test
    public void testGetStudentSignature(){
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setFirstName("Jane");
        utilisateur.setLastName("Doe");
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setPhoneNumber("6625550144");
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Student);

        Student student = new Student();
        student.setMatricule("2222222");
        student.setProgram("Informatique");
        student.setOffresStages(new ArrayList<>());
        student.setSignatureStudent(new SignatureStudent());
        student.setUtilisateur(utilisateur);

        SignatureStudent signature = new SignatureStudent();
        signature.setImageLink("https://example.org/example");
        signature.setId(1L);
        signature.setStudent(student);


        when(signatureStudentRepository.findSignatureStudentByStudentMatricule("2222222")).thenReturn(signature);
        SignatureStudentDTO result = signatureStudentService.getSignatureByStudentMatricule("2222222");

        assertNotNull(result);
        assertEquals("https://example.org/example", result.getImageLink());
        assertEquals("2222222", result.getStudentMatricule());
        verify(signatureStudentRepository, times(1)).findSignatureStudentByStudentMatricule(any());
    }

    @Test
    public void testUpdateStudentSignature() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setFirstName("Jane");
        utilisateur.setLastName("Doe");
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setPhoneNumber("6625550144");
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Student);

        Student student = new Student();
        student.setMatricule("2222222");
        student.setProgram("Informatique");
        student.setOffresStages(new ArrayList<>());
        student.setSignatureStudent(new SignatureStudent());
        student.setUtilisateur(utilisateur);

        SignatureStudent signature = new SignatureStudent();
        signature.setImageLink("https://example.org/example");
        signature.setId(1L);
        signature.setStudent(student);

        SignatureStudentDTO signatureDTO = new SignatureStudentDTO();
        signatureDTO.setStudentMatricule("2222222");
        signatureDTO.setImageLink("newlink.org");

        when(studentRepository.findByMatricule(any())).thenReturn(student);
        when(signatureStudentRepository.findSignatureStudentByStudentMatricule("2222222")).thenReturn(signature);
        when(signatureStudentRepository.save(any())).thenReturn(signature);
        SignatureStudentDTO result = signatureStudentService.updateStudentSignature(signatureDTO);

        assertNotNull(result);
        assertNotEquals("https://example.org/example", result.getImageLink());
        assertEquals("newlink.org", result.getImageLink());
        assertEquals("2222222", result.getStudentMatricule());
        verify(signatureStudentRepository, times(1)).save(any());
    }

    @Test
    public void testDeleteStudentSignature() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setFirstName("Jane");
        utilisateur.setLastName("Student");
        utilisateur.setPhoneNumber("6625550141");
        utilisateur.setEmail("jane.doe@example.com");
        utilisateur.setId(1L);
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Student);

        Student student = new Student();
        student.setMatricule("2222222");
        student.setProgram("Informatique");
        student.setOffresStages(new ArrayList<>());
        student.setUtilisateur(utilisateur);
        student.setSignatureStudent(new SignatureStudent());


        SignatureStudent s = new SignatureStudent();
        s.setImageLink("https://example.org/example");
        s.setStudent(student);
        s.setId(1L);

        when(studentRepository.findByMatricule("2222222")).thenReturn(student);
        when(signatureStudentRepository.findSignatureStudentByStudentMatricule("2222222")).thenReturn(s);

        signatureStudentService.deleteSignatureByStudentMatricule("2222222");


        verify(signatureStudentRepository, times(1)).delete(s);
        verify(studentRepository, times(1)).save(student);
    }
}
