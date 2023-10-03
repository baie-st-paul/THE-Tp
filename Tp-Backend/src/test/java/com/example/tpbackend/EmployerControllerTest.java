package com.example.tpbackend;

import com.example.tpbackend.DTO.StudentOfferDTO;
import com.example.tpbackend.controllers.EmployerController;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import com.example.tpbackend.service.StudentOfferService;
import com.example.tpbackend.service.utilisateur.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class EmployerControllerTest {

    @Mock
    private StudentOfferService studentOfferService;

    @Mock
    private UserService userService;

    @InjectMocks
    private EmployerController employerController;

    @Test
    public void testGetApplicants() {
        // Fixer les IDs et les rôles attendus pour l'utilisateur et l'employeur
        Long expectedUserId = 1L;
        Long expectedEmployerId = 1L;

        // Configurer le mock pour l'utilisateur actuel
        Utilisateur currentUser = new Utilisateur();
        currentUser.setId(expectedUserId);
        currentUser.setRole(Utilisateur.Role.Employeur);

        when(userService.getCurrentUser()).thenReturn(currentUser);


        List<StudentOfferDTO> fakeList = getStudentOfferDTOS();

        when(studentOfferService.getStudentsByOfferId(anyLong(), any())).thenReturn(fakeList);

        ResponseEntity<List<StudentOfferDTO>> response = employerController.getApplicants(expectedEmployerId, 1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(fakeList, response.getBody());
    }

    private static List<StudentOfferDTO> getStudentOfferDTOS() {
        List<StudentOfferDTO> fakeList = new ArrayList<>();

        Student fakeStudent1 = new Student();
        fakeStudent1.setMatricule("Matricule1");
        fakeStudent1.setFirstName("John");
        fakeStudent1.setLastName("Doe");
        fakeStudent1.setProgram("informatique");
        fakeStudent1.setPhoneNumber("514-111-1111");

        OffreStage fakeOffre1 = new OffreStage();
        fakeOffre1.setId(1L);
        fakeOffre1.setTitre("developpeur");
        fakeOffre1.setDescription("developper des applications");


        StudentOfferDTO fakeStudentOfferDTO1 = new StudentOfferDTO();
        fakeStudentOfferDTO1.setId(1L);
        fakeStudentOfferDTO1.setStudent(fakeStudent1);
        fakeStudentOfferDTO1.setOffreStage(fakeOffre1);
        fakeList.add(fakeStudentOfferDTO1);
        return fakeList;
    }
}
