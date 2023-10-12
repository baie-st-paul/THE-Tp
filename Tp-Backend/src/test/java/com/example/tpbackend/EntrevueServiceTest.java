package com.example.tpbackend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import com.example.tpbackend.DTO.EntrevueDTO;
import com.example.tpbackend.models.Entrevue;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import com.example.tpbackend.repository.EntrevueRepository;
import com.example.tpbackend.repository.utilisateur.EmployerRepository;
import com.example.tpbackend.repository.utilisateur.StudentRepository;

import com.example.tpbackend.service.EntrevueService;
import com.example.tpbackend.service.utilisateur.EmployerService;
import com.example.tpbackend.service.utilisateur.StudentServices;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.ArrayList;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@ContextConfiguration(classes = {EntrevueService.class})
@RunWith(SpringJUnit4ClassRunner.class)
@ExtendWith(MockitoExtension.class)
class EntrevueServiceTest {

    @Mock
    private EntrevueRepository entrevueRepository;

    @Mock
    private StudentRepository studentRepository;

    @Mock
    private StudentServices studentService;

    @Mock
    private EmployerRepository employerRepository;

    @Mock
    private EmployerService employerService;

    @InjectMocks
    private EntrevueService entrevueService;

    @Test
    void testCreateEntrevue() throws Exception {
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


        Utilisateur utilisateur2 = new Utilisateur();
        utilisateur2.setEmail("jane.doe@example.com");
        utilisateur2.setId(2L);
        utilisateur2.setPassword("iloveyou");
        utilisateur2.setRole(Utilisateur.Role.Student);


        Student student = new Student();
        student.setFirstName("Jane");
        student.setMatricule("2222222");
        student.setLastName("Student");
        student.setProgram("Informatique");
        student.setPhoneNumber("6625550141");
        student.setOffresStages(new ArrayList<>());
        student.setUtilisateur(utilisateur2);


        EntrevueDTO entrevueDTO = new EntrevueDTO();
        entrevueDTO.setIdEmployeur("1");
        entrevueDTO.setIdEtudiant("2222222");
        entrevueDTO.setDateHeure(String.valueOf(LocalDate.now()));
        entrevueDTO.setDescription("Interview description");
        entrevueDTO.setStatus("EnAttente");

        Entrevue entrevue = new Entrevue();
        entrevue.setId(1L);
        entrevue.setDateHeure(entrevueDTO.getDateHeure());
        entrevue.setDescription(entrevueDTO.getDescription());
        entrevue.setStatus(Entrevue.Status.valueOf(entrevueDTO.getStatus()));
        entrevue.setEmployer(employer);
        entrevue.setStudent(student);


        when(employerRepository.findEmployerById(1L)).thenReturn(employer);
        when(studentRepository.findByMaticule("2222222")).thenReturn(student);
        when(entrevueRepository.save(entrevue)).thenReturn(entrevue);

        EntrevueDTO result = entrevueService.createEntrevue(entrevueDTO);
        assertEquals(entrevueDTO.getDateHeure(), result.getDateHeure());
        assertEquals(entrevueDTO.getDescription(), result.getDescription());
    }
}
