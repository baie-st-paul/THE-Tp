package com.example.tpbackend.service.utilisateur;

import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerPostDTO;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.repository.utilisateur.EmployerRepository;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.ContextConfiguration;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ContextConfiguration(classes = {EmployerService.class})
@ExtendWith(MockitoExtension.class)
class EmployerServiceTest {

    @InjectMocks
    private EmployerService employerService;
    @Mock
    private EmployerRepository employerRepository;

    @Mock
    private UtilisateurRepository utilisateurRepository;

    /**
     * Method under test: {@link EmployerService#existByName(String)}
     */
    @Test
    void testExistByName() {
        when(employerRepository.existsByCompanyName(Mockito.<String>any())).thenReturn(true);
        assertTrue(employerService.existByName("Company Name"));
        verify(employerRepository).existsByCompanyName(Mockito.<String>any());
    }

    /**
     * Method under test: {@link EmployerService#existByName(String)}
     */
    @Test
    void testExistByName2() {
        when(employerRepository.existsByCompanyName(Mockito.<String>any())).thenReturn(false);
        assertFalse(employerService.existByName("Company Name"));
        verify(employerRepository).existsByCompanyName(Mockito.<String>any());
    }

    /**
     * Method under test: {@link EmployerService#existByEmail(String)}
     */
    @Test
    void testExistByEmail() {
        when(utilisateurRepository.existsByEmail(Mockito.<String>any())).thenReturn(true);
        assertTrue(employerService.existByEmail("jane.doe@example.org"));
        verify(utilisateurRepository).existsByEmail(Mockito.<String>any());
    }

    /**
     * Method under test: {@link EmployerService#existByEmail(String)}
     */
    @Test
    void testExistByEmail2() {
        when(utilisateurRepository.existsByEmail(Mockito.<String>any())).thenReturn(false);
        assertFalse(employerService.existByEmail("jane.doe@example.org"));
        verify(utilisateurRepository).existsByEmail(Mockito.<String>any());
    }

    /**
     * Method under test: {@link EmployerService#getOffreStageByEmployer(Long)}
     */
    @Test
    void testGetOffreStageByEmployer() {
        ArrayList<OffreStageDTO> offreStageDTOList = new ArrayList<>();
        when(employerRepository.getOffreStageById(Mockito.<Long>any())).thenReturn(offreStageDTOList);
        List<OffreStageDTO> actualOffreStageByEmployer = employerService.getOffreStageByEmployer(1L);
        assertSame(offreStageDTOList, actualOffreStageByEmployer);
        assertTrue(actualOffreStageByEmployer.isEmpty());
        verify(employerRepository).getOffreStageById(Mockito.<Long>any());
    }

    /**
     * Method under test: {@link EmployerService#saveEmployer(EmployerPostDTO, String, String, String)}
     */
    @Test
    @Disabled("TODO: Complete this test")
    void testSaveEmployer() {
        // TODO: Complete this test.
        //   Reason: R013 No inputs found that don't throw a trivial exception.
        //   Diffblue Cover tried to run the arrange/act section, but the method under
        //   test threw
        //   java.lang.IllegalArgumentException: No enum constant com.example.tpbackend.models.utilisateur.Utilisateur.Role.Role
        //       at java.lang.Enum.valueOf(Enum.java:273)
        //       at com.example.tpbackend.models.utilisateur.Utilisateur$Role.valueOf(Utilisateur.java:44)
        //       at com.example.tpbackend.models.utilisateur.Utilisateur.<init>(Utilisateur.java:33)
        //       at com.example.tpbackend.service.utilisateur.EmployerService.saveEmployer(EmployerService.java:30)
        //   See https://diff.blue/R013 to resolve this issue.

        employerService.saveEmployer(
                new EmployerPostDTO("Jane", "Doe", "Company Name", "6625550144", "jane.doe@example.org", "iloveyou"),
                "jane.doe@example.org", "iloveyou", "Role");
    }

    /**
     * Method under test: {@link EmployerService#saveEmployer(EmployerPostDTO, String, String, String)}
     */
    @Test
    @Disabled("TODO: Complete this test")
    void testSaveEmployer2() {
        // TODO: Complete this test.
        //   Reason: R013 No inputs found that don't throw a trivial exception.
        //   Diffblue Cover tried to run the arrange/act section, but the method under
        //   test threw
        //   java.lang.IllegalArgumentException: No enum constant com.example.tpbackend.models.utilisateur.Utilisateur.Role.Role
        //       at java.lang.Enum.valueOf(Enum.java:273)
        //       at com.example.tpbackend.models.utilisateur.Utilisateur$Role.valueOf(Utilisateur.java:44)
        //       at com.example.tpbackend.models.utilisateur.Utilisateur.<init>(Utilisateur.java:33)
        //       at com.example.tpbackend.service.utilisateur.EmployerService.saveEmployer(EmployerService.java:30)
        //   See https://diff.blue/R013 to resolve this issue.

        employerService.saveEmployer(mock(EmployerPostDTO.class), "jane.doe@example.org", "iloveyou", "Role");
    }

    /**
     * Method under test: {@link EmployerService#getEmployeurByUser(UtilisateurDTO)}
     */
    @Test
    void testGetEmployeurByUser() {
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
        when(employerRepository.findEmployerByUtilisateur()).thenReturn(employer);
        EmployerGetDTO actualEmployeurByUser = employerService
                .getEmployeurByUser(new UtilisateurDTO("jane.doe@example.org", "iloveyou", "Role"));
        assertEquals("Company Name", actualEmployeurByUser.getCompanyName());
        assertEquals("6625550144", actualEmployeurByUser.getPhoneNumber());
        assertEquals("Doe", actualEmployeurByUser.getLastName());
        assertEquals(1L, actualEmployeurByUser.getId());
        assertEquals("Jane", actualEmployeurByUser.getFirstName());
        assertEquals("jane.doe@example.org", actualEmployeurByUser.getEmail());
        verify(employerRepository).findEmployerByUtilisateur();
    }


}
