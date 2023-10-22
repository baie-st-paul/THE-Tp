package com.example.tpbackend.service;

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
import java.util.List;

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
        utilisateur.setFirstName("Jane");
        utilisateur.setPassword("iloveyou");
        utilisateur.setLastName("Doe");
        utilisateur.setRole(Utilisateur.Role.Employeur);
        utilisateur.setPhoneNumber("6625550144");

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setId(1L);
        employer.setOffresStages(new ArrayList<>());
        employer.setUtilisateur(utilisateur);


        Utilisateur utilisateur2 = new Utilisateur();
        utilisateur2.setEmail("jane.doe@example.com");
        utilisateur2.setId(2L);
        utilisateur2.setFirstName("Jane");
        utilisateur2.setPassword("iloveyou");
        utilisateur2.setLastName("Student");
        utilisateur2.setRole(Utilisateur.Role.Student);
        utilisateur2.setPhoneNumber("6625550141");


        Student student = new Student();
        student.setMatricule("2222222");
        student.setProgram("Informatique");
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
        when(studentRepository.findByMatricule("2222222")).thenReturn(student);
        when(entrevueRepository.save(entrevue)).thenReturn(entrevue);

        EntrevueDTO result = entrevueService.createEntrevue(entrevueDTO);
        assertEquals(entrevueDTO.getDateHeure(), result.getDateHeure());
        assertEquals(entrevueDTO.getDescription(), result.getDescription());
    }

    @Test
    void testUpdateStatus() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setFirstName("Jane");
        utilisateur.setPassword("iloveyou");
        utilisateur.setLastName("Doe");
        utilisateur.setRole(Utilisateur.Role.Employeur);
        utilisateur.setPhoneNumber("6625550144");

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setId(1L);
        employer.setOffresStages(new ArrayList<>());
        employer.setUtilisateur(utilisateur);


        Utilisateur utilisateur2 = new Utilisateur();
        utilisateur2.setEmail("jane.doe@example.com");
        utilisateur2.setId(2L);
        utilisateur2.setFirstName("Jane");
        utilisateur2.setPassword("iloveyou");
        utilisateur2.setLastName("Student");
        utilisateur2.setRole(Utilisateur.Role.Student);
        utilisateur2.setPhoneNumber("6625550141");


        Student student = new Student();
        student.setMatricule("2222222");
        student.setProgram("Informatique");
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


        when(entrevueRepository.findByStudent_MatriculeAndEmployer_IdAndDateHeure("2222222", 1L, entrevueDTO.getDateHeure())).thenReturn(entrevue);

        String newStatus = "Vue";
        entrevueDTO.setStatus(newStatus);

        when(entrevueRepository.save(entrevue)).thenReturn(entrevue);

        EntrevueDTO result = entrevueService.updateStatus(entrevueDTO, newStatus);
        assertEquals(newStatus, result.getStatus());
    }

    @Test
    void testGetStudentEntrevues(){
        List<Entrevue> entrevues = new ArrayList<>();

        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setFirstName("Jane");
        utilisateur.setPassword("iloveyou");
        utilisateur.setLastName("Doe");
        utilisateur.setRole(Utilisateur.Role.Employeur);
        utilisateur.setPhoneNumber("6625550144");

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setId(1L);
        employer.setOffresStages(new ArrayList<>());
        employer.setUtilisateur(utilisateur);

        Utilisateur utilisateur2 = new Utilisateur();
        utilisateur2.setEmail("jane.doe@example.com");
        utilisateur2.setId(2L);
        utilisateur2.setFirstName("Jane");
        utilisateur2.setPassword("iloveyou");
        utilisateur2.setLastName("Student");
        utilisateur2.setRole(Utilisateur.Role.Student);
        utilisateur2.setPhoneNumber("6625550141");

        Student student = new Student();
        student.setMatricule("2222222");
        student.setProgram("Informatique");
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

        Entrevue entrevue2 = new Entrevue();
        entrevue2.setId(2L);
        entrevue2.setDateHeure(entrevueDTO.getDateHeure());
        entrevue2.setDescription(entrevueDTO.getDescription());
        entrevue2.setStatus(Entrevue.Status.valueOf(entrevueDTO.getStatus()));
        entrevue2.setEmployer(employer);
        entrevue2.setStudent(student);

        entrevues.add(entrevue);
        entrevues.add(entrevue2);


        when(entrevueRepository.findAllByStudent_Matricule("2222222")).thenReturn(entrevues);

        List<EntrevueDTO> result = entrevueService.getStudentEntrevues("2222222");
        assertEquals(2, result.size());
        assertEquals(entrevue.getId(), result.get(0).getId());
        assertEquals(entrevue2.getId(), result.get(1).getId());
    }



}
