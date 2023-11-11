package com.example.tpbackend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import com.example.tpbackend.DTO.entrevue.EntrevueDTO;
import com.example.tpbackend.models.Entrevue;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import com.example.tpbackend.repository.EntrevueRepository;
import com.example.tpbackend.repository.OffreStageRepository;
import com.example.tpbackend.repository.utilisateur.EmployerRepository;
import com.example.tpbackend.repository.utilisateur.StudentRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    private EmployerRepository employerRepository;

    @Mock
    private OffreStageRepository offreStageRepository;

    @InjectMocks
    private EntrevueService entrevueService;

    @Test
    void testCreateEntrevue() {
        OffreStage offreStage = new OffreStage();
        offreStage.setId(7L);

        List<OffreStage> offreStages = new ArrayList<>();
        offreStages.add(offreStage);

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
        employer.setOffresStages(offreStages);
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
        student.setOffresStages(offreStages);
        student.setUtilisateur(utilisateur2);


        EntrevueDTO entrevueDTO = new EntrevueDTO();
        entrevueDTO.setId(1);
        entrevueDTO.setIdEmployeur("1");
        entrevueDTO.setIdEtudiant("2222222");
        entrevueDTO.setDateHeure(String.valueOf(LocalDate.now()));
        entrevueDTO.setDescription("Interview description");
        entrevueDTO.setStatus("EnAttente");
        entrevueDTO.setStatusVuPasVuG("pasVu");
        entrevueDTO.setStatusVuPasVuE("pasVu");
        entrevueDTO.setStatusVuPasVuS("pasVu");
        entrevueDTO.setIdOffre(offreStage.getId() + "");

        Entrevue entrevue = new Entrevue();
        entrevue.setId(1L);
        entrevue.setDateHeure(entrevueDTO.getDateHeure());
        entrevue.setDescription(entrevueDTO.getDescription());
        entrevue.setStatus(Entrevue.Status.valueOf(entrevueDTO.getStatus()));
        entrevue.setStatusVuPasVuG(Entrevue.StatusVuPasVu.valueOf(entrevueDTO.getStatusVuPasVuG()));
        entrevue.setStatusVuPasVuE(Entrevue.StatusVuPasVu.valueOf(entrevueDTO.getStatusVuPasVuE()));
        entrevue.setStatusVuPasVuS(Entrevue.StatusVuPasVu.valueOf(entrevueDTO.getStatusVuPasVuS()));

        entrevue.setEmployer(employer);
        entrevue.setStudent(student);
        entrevue.setOffreStage(offreStage);

        System.out.println(entrevueDTO);
        System.out.println(entrevue);

        when(employerRepository.findEmployerById(anyLong())).thenReturn(employer);
        when(studentRepository.findByMatricule(anyString())).thenReturn(student);
        when(offreStageRepository.getOffreById(anyLong())).thenReturn(offreStage);
        when(entrevueRepository.save(entrevue)).thenReturn(entrevue);

        EntrevueDTO result = entrevueService.createEntrevue(entrevueDTO);
        assertEquals(entrevueDTO.getDateHeure(), result.getDateHeure());
        assertEquals(entrevueDTO.getDescription(), result.getDescription());
    }

    @Test
    void testUpdateStatus() {
        OffreStage offreStage = new OffreStage();
        offreStage.setId(7L);

        List<OffreStage> offreStages = new ArrayList<>();
        offreStages.add(offreStage);

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
        employer.setOffresStages(offreStages);
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
        student.setOffresStages(offreStages);
        student.setUtilisateur(utilisateur2);


        EntrevueDTO entrevueDTO = new EntrevueDTO();
        entrevueDTO.setIdEmployeur("1");
        entrevueDTO.setIdEtudiant("2222222");
        entrevueDTO.setDateHeure(String.valueOf(LocalDate.now()));
        entrevueDTO.setDescription("Interview description");
        entrevueDTO.setStatus("EnAttente");
        entrevueDTO.setStatusVuPasVuG("pasVu");
        entrevueDTO.setStatusVuPasVuE("pasVu");
        entrevueDTO.setStatusVuPasVuS("pasVu");
        entrevueDTO.setIdOffre(offreStage.getId() + "");

        Entrevue entrevue = new Entrevue();
        entrevue.setId(1L);
        entrevue.setDateHeure(entrevueDTO.getDateHeure());
        entrevue.setDescription(entrevueDTO.getDescription());
        entrevue.setStatus(Entrevue.Status.valueOf(entrevueDTO.getStatus()));
        entrevue.setStatusVuPasVuG(Entrevue.StatusVuPasVu.pasVu);
        entrevue.setStatusVuPasVuE(Entrevue.StatusVuPasVu.pasVu);
        entrevue.setStatusVuPasVuS(Entrevue.StatusVuPasVu.pasVu);
        entrevue.setEmployer(employer);
        entrevue.setStudent(student);
        entrevue.setOffreStage(offreStage);

        String newStatus = "Acceptee";
        entrevueDTO.setStatus(newStatus);

        when(entrevueRepository.findByStudent_MatriculeAndEmployer_IdAndDateHeure("2222222", 1L, entrevueDTO.getDateHeure())).thenReturn(entrevue);
        when(entrevueRepository.save(entrevue)).thenReturn(entrevue);

        EntrevueDTO result = entrevueService.updateStatus(entrevueDTO, newStatus);
        assertEquals(newStatus, result.getStatus());
    }

    @Test
    void testGetStudentEntrevues(){
        List<Entrevue> entrevues = new ArrayList<>();

        OffreStage offreStage = new OffreStage();
        offreStage.setId(7L);

        OffreStage offreStage2 = new OffreStage();
        offreStage.setId(8L);

        List<OffreStage> offreStages = new ArrayList<>();
        offreStages.add(offreStage);
        offreStages.add(offreStage2);

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
        employer.setOffresStages(offreStages);
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
        student.setOffresStages(offreStages);
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
        entrevue.setOffreStage(offreStage);

        Entrevue entrevue2 = new Entrevue();
        entrevue2.setId(2L);
        entrevue2.setDateHeure(entrevueDTO.getDateHeure());
        entrevue2.setDescription(entrevueDTO.getDescription());
        entrevue2.setStatus(Entrevue.Status.valueOf(entrevueDTO.getStatus()));
        entrevue2.setEmployer(employer);
        entrevue2.setStudent(student);
        entrevue2.setOffreStage(offreStage2);

        entrevues.add(entrevue);
        entrevues.add(entrevue2);

        when(entrevueRepository.findAllByStudent_Matricule("2222222")).thenReturn(entrevues);

        List<EntrevueDTO> result = entrevueService.getStudentEntrevues("2222222");
        assertEquals(2, result.size());
        assertEquals(entrevue.getId(), result.get(0).getId());
        assertEquals(entrevue2.getId(), result.get(1).getId());
    }



}
