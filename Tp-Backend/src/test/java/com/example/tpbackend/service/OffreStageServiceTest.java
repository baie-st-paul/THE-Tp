package com.example.tpbackend.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.anyLong;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.example.tpbackend.DTO.EvaluationMilieuStageDTO;
import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.repository.OffreStageRepository;
import com.example.tpbackend.repository.TagRepository;
import com.example.tpbackend.service.utilisateur.EmployerService;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Disabled;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.web.multipart.MultipartFile;

@ContextConfiguration(classes = {OffreStageService.class})
@RunWith(SpringJUnit4ClassRunner.class)
@ExtendWith(MockitoExtension.class)
class OffreStageServiceTest {
    @Mock
    private EmployerService employerService;

    @Mock
    private TagRepository tagRepository;

    @Mock
    private OffreStageRepository offreStageRepository;

    @InjectMocks
    private OffreStageService offreStageService;

    /**
     * Method under test: {@link OffreStageService#saveOffre(OffreStageDTO)}
     */
    @Test
    void testCreateOffre2() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setFirstName("Jane");
        utilisateur.setPassword("iloveyou");
        utilisateur.setLastName("Doe");
        utilisateur.setRole(Utilisateur.Role.Student);
        utilisateur.setPhoneNumber("6625550144");

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setId(1L);
        employer.setOffresStages(new ArrayList<>());
        employer.setUtilisateur(utilisateur);

        Utilisateur utilisateur2 = new Utilisateur();
        utilisateur2.setEmail("jane.doe@example.org");
        utilisateur2.setId(1L);
        utilisateur2.setFirstName("Jane");
        utilisateur2.setPassword("iloveyou");
        utilisateur2.setLastName("Doe");
        utilisateur2.setRole(Utilisateur.Role.Student);
        utilisateur2.setPhoneNumber("6625550144");

        Employer employer2 = new Employer();
        employer2.setCompanyName("Company Name");
        employer2.setId(1L);
        employer2.setOffresStages(new ArrayList<>());
        employer2.setUtilisateur(utilisateur2);

        OffreStage offreStage = new OffreStage();
        offreStage.setDateDebut(LocalDate.of(1970, 1, 1));
        offreStage.setDateFin(LocalDate.of(1970, 1, 1));
        offreStage.setDescription("The characteristics of someone or something");
        offreStage.setId(1L);
        offreStage.setEmployer(employer);
        offreStage.setSalaire(10.0d);
        offreStage.setStatus(OffreStage.Status.Accepted);
        offreStage.setStatusVuPasVuG(OffreStage.StatusVuPasVu.vu);
        offreStage.setStatusVuPasVuS(OffreStage.StatusVuPasVu.vu);
        offreStage.setStudentProgram("Student Program");
        offreStage.setTitre("Titre");

        OffreStage offreStage2 = new OffreStage();
        offreStage2.setDateDebut(LocalDate.of(1970, 1, 1));
        offreStage2.setDateFin(LocalDate.of(1970, 1, 1));
        offreStage2.setDescription("The characteristics of someone or something");
        offreStage2.setId(1L);
        offreStage2.setEmployer(employer2);
        offreStage2.setSalaire(10.0d);
        offreStage2.setStatus(OffreStage.Status.Accepted);
        offreStage2.setStatusVuPasVuG(OffreStage.StatusVuPasVu.vu);
        offreStage2.setStatusVuPasVuS(OffreStage.StatusVuPasVu.vu);
        offreStage2.setStudentProgram("Student Program");
        offreStage2.setTitre("Titre");

        when(employerService.getEmployerById(anyLong())).thenReturn(employer);
        when(offreStageRepository.save(Mockito.<OffreStage>any())).thenReturn(offreStage);

        OffreStageDTO result = offreStageService.saveOffre(offreStage.toOffreStageDTO());

        assertEquals("1970-01-01", result.getDateDebut().toString());
        assertEquals("Titre", result.getTitre());
        assertEquals("Student Program", result.getStudentProgram());
        assertEquals("Accepted", result.getStatus());
        assertEquals(10.0d, result.getSalaire());
        assertEquals(1L, result.getId());
        assertEquals(1L, result.getEmployerId());
        assertEquals("The characteristics of someone or something", result.getDescription());
        assertEquals("1970-01-01", result.getDateFin().toString());
    }

    /**
     * Method under test: {@link OffreStageService#saveOffre(OffreStageDTO)}
     */
    @Test
    void testCreateOffre3() {
        when(employerService.getEmployerById(Mockito.<Long>any()))
                .thenReturn(new Employer(1L, "Company Name", new Utilisateur( "Jane", "Doe", "jane.doe@example.org","6625550144", "iloveyou", "Employeur" ) ));
        when(offreStageRepository.save(Mockito.<OffreStage>any())).thenThrow(new RuntimeException("foo"));

        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setFirstName("Jane");
        utilisateur.setPassword("iloveyou");
        utilisateur.setLastName("Doe");
        utilisateur.setRole(Utilisateur.Role.Student);
        utilisateur.setPhoneNumber("6625550144");

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setId(1L);
        employer.setOffresStages(new ArrayList<>());
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
        OffreStageDTO offre = mock(OffreStageDTO.class);
        when(offre.toOffreStage()).thenReturn(offreStage);
        when(offre.getEmployerId()).thenReturn(1L);
        assertThrows(RuntimeException.class, () -> offreStageService.saveOffre(offre));
        verify(offreStageRepository).save(Mockito.<OffreStage>any());
        verify(offre).toOffreStage();
    }



    /**
     * Method under test: {@link OffreStageService#getAllOffres()}
     */
    @Test
    void testGetAllOffres() {
        ArrayList<OffreStage> offreStageList = new ArrayList<>();
        when(offreStageRepository.findAll()).thenReturn(offreStageList);
        List<OffreStage> actualAllOffres = offreStageService.getAllOffres();
        assertSame(offreStageList, actualAllOffres);
        assertTrue(actualAllOffres.isEmpty());
        verify(offreStageRepository).findAll();
    }

    /**
     * Method under test: {@link OffreStageService#getAllOffres()}
     */
    @Test
    void testGetAllOffres2() {
        when(offreStageRepository.findAll()).thenThrow(new RuntimeException("foo"));
        assertThrows(RuntimeException.class, () -> offreStageService.getAllOffres());
        verify(offreStageRepository).findAll();
    }

    /**
     * Method under test: {@link OffreStageService#getOffres()}
     */
    @Test
    void testGetOffres() {
        when(offreStageRepository.findAll()).thenReturn(new ArrayList<>());
        assertTrue(offreStageService.getOffres().isEmpty());
        verify(offreStageRepository).findAll();
    }

    /**
     * Method under test: {@link OffreStageService#getOffres()}
     */
    @Test
    void testGetOffres2() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setFirstName("Jane");
        utilisateur.setPassword("iloveyou");
        utilisateur.setLastName("Doe");
        utilisateur.setRole(Utilisateur.Role.Student);
        utilisateur.setPhoneNumber("6625550144");

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setId(1L);
        employer.setOffresStages(new ArrayList<>());
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

        ArrayList<OffreStage> offreStageList = new ArrayList<>();
        offreStageList.add(offreStage);
        when(offreStageRepository.findAll()).thenReturn(offreStageList);
        assertEquals(1, offreStageService.getOffres().size());
        verify(offreStageRepository).findAll();
    }

    /**
     * Method under test: {@link OffreStageService#getOffres()}
     */
    @Test
    void testGetOffres3() {
        when(offreStageRepository.findAll()).thenThrow(new RuntimeException("foo"));
        assertThrows(RuntimeException.class, () -> offreStageService.getOffres());
        verify(offreStageRepository).findAll();
    }

    /**
     * Method under test: {@link OffreStageService#getOffres()}
     */
    @Test
    void testGetOffres4() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setFirstName("Jane");
        utilisateur.setPassword("iloveyou");
        utilisateur.setLastName("Doe");
        utilisateur.setRole(Utilisateur.Role.Student);
        utilisateur.setPhoneNumber("6625550144");

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setId(1L);
        employer.setOffresStages(new ArrayList<>());
        employer.setUtilisateur(utilisateur);
        OffreStage offreStage = mock(OffreStage.class);
        when(offreStage.toOffreStageDTO()).thenReturn(new OffreStageDTO());
        doNothing().when(offreStage).setDateDebut(Mockito.<LocalDate>any());
        doNothing().when(offreStage).setDateFin(Mockito.<LocalDate>any());
        doNothing().when(offreStage).setDescription(Mockito.<String>any());
        doNothing().when(offreStage).setEmployer(Mockito.<Employer>any());
        doNothing().when(offreStage).setId(anyLong());
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

        ArrayList<OffreStage> offreStageList = new ArrayList<>();
        offreStageList.add(offreStage);
        when(offreStageRepository.findAll()).thenReturn(offreStageList);
        assertEquals(1, offreStageService.getOffres().size());
        verify(offreStageRepository).findAll();
        verify(offreStage).toOffreStageDTO();
        verify(offreStage).setDateDebut(Mockito.<LocalDate>any());
        verify(offreStage).setDateFin(Mockito.<LocalDate>any());
        verify(offreStage).setDescription(Mockito.<String>any());
        verify(offreStage).setEmployer(Mockito.<Employer>any());
        verify(offreStage).setId(anyLong());
        verify(offreStage).setSalaire(Mockito.<Double>any());
        verify(offreStage).setStatus(Mockito.<OffreStage.Status>any());
        verify(offreStage).setStudentProgram(Mockito.<String>any());
        verify(offreStage).setTitre(Mockito.<String>any());
    }

    /**
     * Method under test: {@link OffreStageService#convertToDto(OffreStage)}
     */
    @Test
    void testConvertToDto() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setFirstName("Jane");
        utilisateur.setPassword("iloveyou");
        utilisateur.setLastName("Doe");
        utilisateur.setRole(Utilisateur.Role.Student);
        utilisateur.setPhoneNumber("6625550144");

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setId(1L);
        employer.setOffresStages(new ArrayList<>());
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
        utilisateur.setFirstName("Jane");
        utilisateur.setPassword("iloveyou");
        utilisateur.setLastName("Doe");
        utilisateur.setRole(Utilisateur.Role.Student);
        utilisateur.setPhoneNumber("6625550144");

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setId(1L);
        employer.setOffresStages(new ArrayList<>());
        employer.setUtilisateur(utilisateur);
        OffreStage offreStage = mock(OffreStage.class);
        when(offreStage.getDescription()).thenReturn("The characteristics of someone or something");
        doNothing().when(offreStage).setDateDebut(Mockito.<LocalDate>any());
        doNothing().when(offreStage).setDateFin(Mockito.<LocalDate>any());
        doNothing().when(offreStage).setDescription(Mockito.<String>any());
        doNothing().when(offreStage).setEmployer(Mockito.<Employer>any());
        doNothing().when(offreStage).setId(anyLong());
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
        verify(offreStage).setId(anyLong());
        verify(offreStage).setSalaire(Mockito.<Double>any());
        verify(offreStage).setStatus(Mockito.<OffreStage.Status>any());
        verify(offreStage).setStudentProgram(Mockito.<String>any());
        verify(offreStage).setTitre(Mockito.<String>any());
    }

    /**
     * Method under test: {@link OffreStageService#getOffreById(long)}
     */
    @Test
    void testGetOffreById() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setFirstName("Jane");
        utilisateur.setPassword("iloveyou");
        utilisateur.setLastName("Doe");
        utilisateur.setRole(Utilisateur.Role.Student);
        utilisateur.setPhoneNumber("6625550144");

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setId(1L);
        employer.setOffresStages(new ArrayList<>());
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
        Optional<OffreStage> ofResult = Optional.of(offreStage);
        when(offreStageRepository.findOffreById(anyLong())).thenReturn(ofResult);
        OffreStageDTO actualOffreById = offreStageService.getOffreById(1L);
        assertEquals("1970-01-01", actualOffreById.getDateDebut().toString());
        assertEquals("Titre", actualOffreById.getTitre());
        assertEquals("Student Program", actualOffreById.getStudentProgram());
        assertEquals("Accepted", actualOffreById.getStatus());
        assertEquals(10.0d, actualOffreById.getSalaire());
        assertEquals(1L, actualOffreById.getId());
        assertEquals(1L, actualOffreById.getEmployerId());
        assertEquals("The characteristics of someone or something", actualOffreById.getDescription());
        assertEquals("1970-01-01", actualOffreById.getDateFin().toString());
        verify(offreStageRepository).findOffreById(anyLong());
    }

    /**
     * Method under test: {@link OffreStageService#getOffreById(long)}
     */
    @Test
    void testGetOffreById2() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setFirstName("Jane");
        utilisateur.setPassword("iloveyou");
        utilisateur.setLastName("Doe");
        utilisateur.setRole(Utilisateur.Role.Student);
        utilisateur.setPhoneNumber("6625550144");

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setId(1L);
        employer.setOffresStages(new ArrayList<>());
        employer.setUtilisateur(utilisateur);
        OffreStage offreStage = mock(OffreStage.class);
        OffreStageDTO offreStageDTO = new OffreStageDTO();
        when(offreStage.toOffreStageDTO()).thenReturn(offreStageDTO);
        doNothing().when(offreStage).setDateDebut(Mockito.<LocalDate>any());
        doNothing().when(offreStage).setDateFin(Mockito.<LocalDate>any());
        doNothing().when(offreStage).setDescription(Mockito.<String>any());
        doNothing().when(offreStage).setEmployer(Mockito.<Employer>any());
        doNothing().when(offreStage).setId(anyLong());
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
        Optional<OffreStage> ofResult = Optional.of(offreStage);
        when(offreStageRepository.findOffreById(anyLong())).thenReturn(ofResult);
        assertSame(offreStageDTO, offreStageService.getOffreById(1L));
        verify(offreStageRepository).findOffreById(anyLong());
        verify(offreStage).toOffreStageDTO();
        verify(offreStage).setDateDebut(Mockito.<LocalDate>any());
        verify(offreStage).setDateFin(Mockito.<LocalDate>any());
        verify(offreStage).setDescription(Mockito.<String>any());
        verify(offreStage).setEmployer(Mockito.<Employer>any());
        verify(offreStage).setId(anyLong());
        verify(offreStage).setSalaire(Mockito.<Double>any());
        verify(offreStage).setStatus(Mockito.<OffreStage.Status>any());
        verify(offreStage).setStudentProgram(Mockito.<String>any());
        verify(offreStage).setTitre(Mockito.<String>any());
    }

    /**
     * Method under test: {@link OffreStageService#getOffreById(long)}
     */
    @Test
    void testGetOffreById3() {
        Optional<OffreStage> emptyResult = Optional.empty();
        when(offreStageRepository.findOffreById(anyLong())).thenReturn(emptyResult);
        assertThrows(RuntimeException.class, () -> offreStageService.getOffreById(1L));
        verify(offreStageRepository).findOffreById(anyLong());
    }

    /**
     * Method under test: {@link OffreStageService#updateOffreStage(long, OffreStageDTO)}
     */
    @Test
    @Disabled("TODO: Complete this test")
    void testUpdateOffreStage() {
        // TODO: Complete this test.
        //   Reason: R013 No inputs found that don't throw a trivial exception.
        //   Diffblue Cover tried to run the arrange/act section, but the method under
        //   test threw
        //   java.lang.NullPointerException: Name is null
        //       at java.lang.Enum.valueOf(Enum.java:271)
        //       at com.example.tpbackend.models.OffreStage$Status.valueOf(OffreStage.java:64)
        //       at com.example.tpbackend.models.OffreStage.<init>(OffreStage.java:47)
        //       at com.example.tpbackend.DTO.OffreStageDTO.toOffreStage(OffreStageDTO.java:29)
        //       at com.example.tpbackend.service.OffreStageService.updateOffreStage(OffreStageService.java:62)
        //   See https://diff.blue/R013 to resolve this issue.

        offreStageService.updateOffreStage(1L, new OffreStageDTO());
    }

    /**
     * Method under test: {@link OffreStageService#updateOffreStage(long, OffreStageDTO)}
     */
    @Test
    void testUpdateOffreStage2() {
        when(employerService.getEmployerById(Mockito.<Long>any()))
                .thenReturn(new Employer(1L, "Company Name", new Utilisateur( "Jane", "Doe", "jane.doe@example.org","6625550144", "iloveyou", "Employeur" ) ));

        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setFirstName("Jane");
        utilisateur.setPassword("iloveyou");
        utilisateur.setLastName("Doe");
        utilisateur.setRole(Utilisateur.Role.Student);
        utilisateur.setPhoneNumber("6625550144");

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setId(1L);
        employer.setOffresStages(new ArrayList<>());
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
        when(offreStageRepository.save(Mockito.<OffreStage>any())).thenReturn(offreStage);

        Utilisateur utilisateur2 = new Utilisateur();
        utilisateur2.setEmail("jane.doe@example.org");
        utilisateur2.setId(1L);
        utilisateur2.setFirstName("Jane");
        utilisateur2.setPassword("iloveyou");
        utilisateur2.setLastName("Doe");
        utilisateur2.setRole(Utilisateur.Role.Student);
        utilisateur2.setPhoneNumber("6625550144");

        Employer employer2 = new Employer();
        employer2.setCompanyName("Company Name");
        employer2.setId(1L);
        employer2.setOffresStages(new ArrayList<>());
        employer2.setUtilisateur(utilisateur2);

        OffreStage offreStage2 = new OffreStage();
        offreStage2.setDateDebut(LocalDate.of(1970, 1, 1));
        offreStage2.setDateFin(LocalDate.of(1970, 1, 1));
        offreStage2.setDescription("The characteristics of someone or something");
        offreStage2.setEmployer(employer2);
        offreStage2.setId(1L);
        offreStage2.setSalaire(10.0d);
        offreStage2.setStatus(OffreStage.Status.Accepted);
        offreStage2.setStudentProgram("Student Program");
        offreStage2.setTitre("Titre");
        OffreStageDTO offreStageDTO = mock(OffreStageDTO.class);
        when(offreStageDTO.getEmployerId()).thenReturn(1L);
        when(offreStageDTO.toOffreStage()).thenReturn(offreStage2);
        OffreStageDTO actualUpdateOffreStageResult = offreStageService.updateOffreStage(1L, offreStageDTO);
        assertEquals("1970-01-01", actualUpdateOffreStageResult.getDateDebut().toString());
        assertEquals("Titre", actualUpdateOffreStageResult.getTitre());
        assertEquals("Student Program", actualUpdateOffreStageResult.getStudentProgram());
        assertEquals("Accepted", actualUpdateOffreStageResult.getStatus());
        assertEquals(10.0d, actualUpdateOffreStageResult.getSalaire());
        assertEquals(1L, actualUpdateOffreStageResult.getId());
        assertEquals(1L, actualUpdateOffreStageResult.getEmployerId());
        assertEquals("The characteristics of someone or something", actualUpdateOffreStageResult.getDescription());
        assertEquals("1970-01-01", actualUpdateOffreStageResult.getDateFin().toString());
        verify(employerService).getEmployerById(Mockito.<Long>any());
        verify(offreStageRepository).save(Mockito.<OffreStage>any());
        verify(offreStageDTO).toOffreStage();
        verify(offreStageDTO).getEmployerId();
    }

    /**
     * Method under test: {@link OffreStageService#updateOffreStage(long, OffreStageDTO)}
     */
    @Test
    void testUpdateOffreStage3() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setFirstName("Jane");
        utilisateur.setPassword("iloveyou");
        utilisateur.setLastName("Doe");
        utilisateur.setRole(Utilisateur.Role.Student);
        utilisateur.setPhoneNumber("6625550144");

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setId(1L);
        employer.setOffresStages(new ArrayList<>());
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
        OffreStageDTO offreStageDTO = mock(OffreStageDTO.class);
        when(offreStageDTO.getEmployerId()).thenThrow(new RuntimeException("foo"));
        when(offreStageDTO.toOffreStage()).thenReturn(offreStage);
        assertThrows(RuntimeException.class, () -> offreStageService.updateOffreStage(1L, offreStageDTO));
        verify(offreStageDTO).toOffreStage();
        verify(offreStageDTO).getEmployerId();
    }

    /**
     * Method under test: {@link OffreStageService#updateOffreStage(long, OffreStageDTO)}
     */
    @Test
    @Disabled("TODO: Complete this test")
    void testUpdateOffreStage4() {
        // TODO: Complete this test.
        //   Reason: R013 No inputs found that don't throw a trivial exception.
        //   Diffblue Cover tried to run the arrange/act section, but the method under
        //   test threw
        //   java.lang.IllegalArgumentException: Source must not be null
        //       at com.example.tpbackend.DTO.utilisateur.employeur.EmployerGetDTO.fromEmployerDTO(EmployerGetDTO.java:29)
        //       at com.example.tpbackend.service.OffreStageService.updateOffreStage(OffreStageService.java:64)
        //   See https://diff.blue/R013 to resolve this issue.

        when(employerService.getEmployerById(Mockito.<Long>any())).thenReturn(null);

        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setFirstName("Jane");
        utilisateur.setPassword("iloveyou");
        utilisateur.setLastName("Doe");
        utilisateur.setRole(Utilisateur.Role.Student);
        utilisateur.setPhoneNumber("6625550144");

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setId(1L);
        employer.setOffresStages(new ArrayList<>());
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
        when(offreStageRepository.save(Mockito.<OffreStage>any())).thenReturn(offreStage);

        Utilisateur utilisateur2 = new Utilisateur();
        utilisateur2.setEmail("jane.doe@example.org");
        utilisateur2.setId(1L);
        utilisateur2.setFirstName("Jane");
        utilisateur2.setPassword("iloveyou");
        utilisateur2.setLastName("Doe");
        utilisateur2.setRole(Utilisateur.Role.Student);
        utilisateur2.setPhoneNumber("6625550144");

        Employer employer2 = new Employer();
        employer2.setCompanyName("Company Name");
        employer2.setId(1L);
        employer2.setOffresStages(new ArrayList<>());
        employer2.setUtilisateur(utilisateur2);

        OffreStage offreStage2 = new OffreStage();
        offreStage2.setDateDebut(LocalDate.of(1970, 1, 1));
        offreStage2.setDateFin(LocalDate.of(1970, 1, 1));
        offreStage2.setDescription("The characteristics of someone or something");
        offreStage2.setEmployer(employer2);
        offreStage2.setId(1L);
        offreStage2.setSalaire(10.0d);
        offreStage2.setStatus(OffreStage.Status.Accepted);
        offreStage2.setStudentProgram("Student Program");
        offreStage2.setTitre("Titre");
        OffreStageDTO offreStageDTO = mock(OffreStageDTO.class);
        when(offreStageDTO.getEmployerId()).thenReturn(1L);
        when(offreStageDTO.toOffreStage()).thenReturn(offreStage2);
        offreStageService.updateOffreStage(1L, offreStageDTO);
    }



    /**
     * Method under test: {@link OffreStageService#deleteOffreStage(long)}
     */
    @Test
    void testDeleteOffreStage() {
        doNothing().when(offreStageRepository).deleteOffreStageById(anyLong());
        offreStageService.deleteOffreStage(1L);
        verify(offreStageRepository).deleteOffreStageById(anyLong());
        assertTrue(offreStageService.getAllOffres().isEmpty());
    }

    /**
     * Method under test: {@link OffreStageService#deleteOffreStage(long)}
     */
    @Test
    void testDeleteOffreStage2() {
        doThrow(new RuntimeException("foo")).when(offreStageRepository).deleteOffreStageById(anyLong());
        assertThrows(RuntimeException.class, () -> offreStageService.deleteOffreStage(1L));
        verify(offreStageRepository).deleteOffreStageById(anyLong());
    }



    @Test
    public void testSaveEvaluation() throws IOException {
        byte[] fakePdfContent = "pdf content".getBytes();
        MultipartFile mockFile = mock(MultipartFile.class);

        when(mockFile.getOriginalFilename()).thenReturn("evaluation.pdf");
        when(mockFile.getBytes()).thenReturn(fakePdfContent);


        EvaluationMilieuStageDTO evaluationDTO = new EvaluationMilieuStageDTO(mockFile);

        /*when(offreStageRepository.findOffreById(anyLong())).thenReturn(Optional.of(offreStage));
        when(offreStageRepository.save(any(OffreStage.class))).thenReturn(offreStageResult);

        OffreStageDTO result = offreStageService.saveEvaluationMilieuStage(evaluationDTO, 1L);

        assertEquals(offreStage.getId(), result.getId());
        assertEquals(offreStage.getTitre(), result.getTitre());
        assertEquals(offreStage.getDescription(), result.getDescription());
        assertEquals(offreStage.getStudentProgram(), result.getStudentProgram());
        assertEquals(offreStage.getSalaire(), result.getSalaire());
        assertEquals(offreStage.getDateDebut(), result.getDateDebut());
        assertEquals(offreStage.getDateFin(), result.getDateFin());
        assertEquals(offreStage.getEmployer().getId(), result.getEmployerId());
        assertNotNull(result.getEvaluationMilieuStage());*/
    }

}
