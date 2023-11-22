package com.example.tpbackend.service.utilisateur;

import com.example.tpbackend.DTO.ContratStageDTO.ContratStageDTODetails;
import com.example.tpbackend.models.Candidature;
import com.example.tpbackend.models.ContratStage;
import com.example.tpbackend.models.Cv;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import com.example.tpbackend.repository.*;
import com.example.tpbackend.repository.utilisateur.StudentRepository;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
public class StudentServiceTestCustom {
    private CandidatureRepository candidatureRepository;
    private CvRepository cvRepository;
    private OffreStageRepository offreStageRepository;
    private StudentRepository studentRepository;
    private ContratStageRepository contratStageRepository;
    private UtilisateurRepository utilisateurRepository;
    private UserService userService;
    private TagRepository tagRepository;


    private StudentServices studentServices;

    @BeforeEach
    void setUp() {
        candidatureRepository = Mockito.mock(CandidatureRepository.class);
        cvRepository = Mockito.mock(CvRepository.class);
        offreStageRepository = Mockito.mock(OffreStageRepository.class);
        studentRepository = Mockito.mock(StudentRepository.class);
        contratStageRepository = Mockito.mock(ContratStageRepository.class);
        utilisateurRepository = Mockito.mock(UtilisateurRepository.class);
        userService = Mockito.mock(UserService.class);
        tagRepository = Mockito.mock(TagRepository.class);

        studentServices = new StudentServices();
        studentServices.setCandidatureRepository(candidatureRepository);
        studentServices.setCvRepository(cvRepository);
        studentServices.setOffreStageRepository(offreStageRepository);
        studentServices.setStudentRepository(studentRepository);
        studentServices.setContratStageRepository(contratStageRepository);
        studentServices.setUtilisateurRepository(utilisateurRepository);
        studentServices.setUserService(userService);
        studentServices.setTagRepository(tagRepository);
    }

    @Test
    void getContratByStudentShouldReturnContracts() {
        // Arrange
        String studentId = "S001";
        long employerId = 1L;

        Student student = new Student();
        student.setMatricule(studentId);
        student.setUtilisateur(new Utilisateur("John", "Doe", "john.doe@example.com", "1234567890", "password", Utilisateur.Role.Student.toString()));

        Utilisateur utilisateur = mock(Utilisateur.class);
        when(utilisateur.getId()).thenReturn(1L);
        when(utilisateur.getFirstName()).thenReturn("abc");
        when(utilisateur.getLastName()).thenReturn("abcd");

        Employer employer = new Employer();
        employer.setId(employerId);
        employer.setUtilisateur(utilisateur);

        OffreStage offreStage = mock(OffreStage.class);
        when(offreStage.getEmployer()).thenReturn(employer);
        when(offreStage.getTitre()).thenReturn("Développeur");

        OffreStage offreStage2 = mock(OffreStage.class);
        when(offreStage2.getEmployer()).thenReturn(employer);
        when(offreStage2.getTitre()).thenReturn("Testeur");

        Cv cv = mock(Cv.class);

        Candidature candidatureMock = mock(Candidature.class);
        when(candidatureMock.getCvStudent()).thenReturn(cv);
        when(candidatureMock.getOffreStage()).thenReturn(offreStage);
        when(candidatureMock.getStudent()).thenReturn(student);
        when(candidatureMock.getId()).thenReturn(2L);

        Candidature candidatureMock2 = mock(Candidature.class);
        when(candidatureMock2.getCvStudent()).thenReturn(cv);
        when(candidatureMock2.getOffreStage()).thenReturn(offreStage2);
        when(candidatureMock2.getStudent()).thenReturn(student);
        when(candidatureMock2.getId()).thenReturn(3L);

        ContratStage contract1 = new ContratStage();
        contract1.setId(1L);
        contract1.setCandidature(candidatureMock);
        contract1.setNomDePoste("Développeur");
        contract1.setStatutEtudiant(ContratStage.Statut.Pas_Signer);
        contract1.setStatutGestionnaire(ContratStage.Statut.Pas_Signer);
        contract1.setStatutEmployeur(ContratStage.Statut.Pas_Signer);

        ContratStage contract2 = new ContratStage();
        contract2.setId(2L);
        contract2.setCandidature(candidatureMock2);
        contract2.setNomDePoste("Testeur");
        contract2.setStatutEtudiant(ContratStage.Statut.Pas_Signer);
        contract2.setStatutGestionnaire(ContratStage.Statut.Pas_Signer);
        contract2.setStatutEmployeur(ContratStage.Statut.Pas_Signer);

        List<ContratStage> contracts = List.of(contract1, contract2);
        when(contratStageRepository.findByStudentMatricule(studentId)).thenReturn(contracts);

        List<ContratStageDTODetails> result = studentServices.getContratByStudent(studentId);

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(contract1.getId(), result.get(0).getId());
        assertEquals(2L, result.get(0).getCandidatureDTO().getId());
        assertEquals(contract1.getNomDePoste(), result.get(0).getCandidatureDTO().getOffreStage().getTitre());
        assertEquals(contract2.getId(), result.get(1).getId());
        assertEquals(3L, result.get(1).getCandidatureDTO().getId());
        assertEquals(contract2.getNomDePoste(), result.get(1).getCandidatureDTO().getOffreStage().getTitre());
    }
}
