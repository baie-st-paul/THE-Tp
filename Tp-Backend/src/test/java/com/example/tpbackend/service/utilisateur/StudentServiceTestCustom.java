package com.example.tpbackend.service.utilisateur;


import com.example.tpbackend.DTO.ContratStageDTO;
import com.example.tpbackend.models.ContratStage;
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
        Long employerId = 1L;

        Student student = new Student();
        student.setMatricule(studentId);
        student.setUtilisateur(new Utilisateur("John", "Doe", "john.doe@example.com", "1234567890", "password", Utilisateur.Role.Student.toString()));

        Employer employer = new Employer();
        employer.setId(employerId);

        ContratStage contract1 = new ContratStage();
        contract1.setId(1L);
        contract1.setStudent(student);
        contract1.setEmployeur(employer);
        contract1.setNomDePoste("Développeur");

        ContratStage contract2 = new ContratStage();
        contract2.setId(2L);
        contract2.setStudent(student);
        contract2.setEmployeur(employer);
        contract2.setNomDePoste("Testeur");

        List<ContratStage> contracts = List.of(contract1, contract2);
        when(contratStageRepository.findByStudentMatricule(studentId)).thenReturn(contracts);

        List<ContratStageDTO> result = studentServices.getContratByStudent(studentId);

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(contract1.getId(), result.get(0).getId());
        assertEquals(studentId, result.get(0).getStudentId());
        assertEquals(employerId, result.get(0).getEmployerId());
        assertEquals(contract1.getNomDePoste(), result.get(0).getNomDeCompanie());
        assertEquals(contract2.getId(), result.get(1).getId());
        assertEquals(studentId, result.get(1).getStudentId());
        assertEquals(employerId, result.get(1).getEmployerId());
        assertEquals(contract2.getNomDePoste(), result.get(1).getNomDeCompanie());
    }
}
