package com.example.tpbackend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.repository.OffreStageRepository;

import java.time.LocalDate;
import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ContextConfiguration(classes = {OffreStageService.class})
@ExtendWith(SpringExtension.class)
class OffreStageServiceTest {
    @MockBean
    private OffreStageRepository offreStageRepository;

    @Autowired
    private OffreStageService offreStageService;

    /**
     * Method under test: {@link OffreStageService#convertToDto(OffreStage)}
     */
    @Test
    void testConvertToDto() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Student);

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setFirstName("Jane");
        employer.setId(1L);
        employer.setLastName("Doe");
        employer.setOffresStages(new ArrayList<>());
        employer.setPhoneNumber("6625550144");
        employer.setUtilisateur(utilisateur);

        OffreStage offreStage = new OffreStage();
        offreStage.setDateDebut(LocalDate.of(1970, 1, 1));
        offreStage.setDateFin(LocalDate.of(1970, 1, 1));
        offreStage.setDescription("The characteristics of someone or something");
        offreStage.setEmployer(employer);
        offreStage.setId(1L);
        offreStage.setSalaire(10.0d);
        offreStage.setStatus(OffreStage.Status.Accepted);
        offreStage.setStudentProgram("Student Program");
        offreStage.setTitre("Titre");
        assertEquals("The characteristics of someone or something",
                offreStageService.convertToDto(offreStage).getDescription());
    }

    /**
     * Method under test: {@link OffreStageService#convertToDto(OffreStage)}
     */
    @Test
    void testConvertToDto2() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Student);

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setFirstName("Jane");
        employer.setId(1L);
        employer.setLastName("Doe");
        employer.setOffresStages(new ArrayList<>());
        employer.setPhoneNumber("6625550144");
        employer.setUtilisateur(utilisateur);
        OffreStage offreStage = mock(OffreStage.class);
        when(offreStage.getDescription()).thenReturn("The characteristics of someone or something");
        doNothing().when(offreStage).setDateDebut(Mockito.<LocalDate>any());
        doNothing().when(offreStage).setDateFin(Mockito.<LocalDate>any());
        doNothing().when(offreStage).setDescription(Mockito.<String>any());
        doNothing().when(offreStage).setEmployer(Mockito.<Employer>any());
        doNothing().when(offreStage).setId(Mockito.<Long>any());
        doNothing().when(offreStage).setSalaire(Mockito.<Double>any());
        doNothing().when(offreStage).setStatus(Mockito.<OffreStage.Status>any());
        doNothing().when(offreStage).setStudentProgram(Mockito.<String>any());
        doNothing().when(offreStage).setTitre(Mockito.<String>any());
        offreStage.setDateDebut(LocalDate.of(1970, 1, 1));
        offreStage.setDateFin(LocalDate.of(1970, 1, 1));
        offreStage.setDescription("The characteristics of someone or something");
        offreStage.setEmployer(employer);
        offreStage.setId(1L);
        offreStage.setSalaire(10.0d);
        offreStage.setStatus(OffreStage.Status.Accepted);
        offreStage.setStudentProgram("Student Program");
        offreStage.setTitre("Titre");
        assertEquals("The characteristics of someone or something",
                offreStageService.convertToDto(offreStage).getDescription());
        verify(offreStage).getDescription();
        verify(offreStage).setDateDebut(Mockito.<LocalDate>any());
        verify(offreStage).setDateFin(Mockito.<LocalDate>any());
        verify(offreStage).setDescription(Mockito.<String>any());
        verify(offreStage).setEmployer(Mockito.<Employer>any());
        verify(offreStage).setId(Mockito.<Long>any());
        verify(offreStage).setSalaire(Mockito.<Double>any());
        verify(offreStage).setStatus(Mockito.<OffreStage.Status>any());
        verify(offreStage).setStudentProgram(Mockito.<String>any());
        verify(offreStage).setTitre(Mockito.<String>any());
    }
}

