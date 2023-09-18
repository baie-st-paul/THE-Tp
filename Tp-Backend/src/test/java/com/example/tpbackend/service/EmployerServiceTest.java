package com.example.tpbackend.service;

import com.example.tpbackend.DTO.utilisateur.employeur.GetDTO.EmployerGetDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.PostDTO.EmployerPostDTO;
import com.example.tpbackend.models.utilisateur.Employer;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.repository.utilisateur.EmployerRepository;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import com.example.tpbackend.service.utilisateur.EmployerService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.ContextConfiguration;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ContextConfiguration(classes = {EmployerService.class})
@ExtendWith(MockitoExtension.class)
class EmployerServiceTest {

    @Mock
    private EmployerRepository employerRepository;

    @Mock
    private UtilisateurRepository utilisateurRepository;

    @InjectMocks
    private EmployerService employerService;

    @Test
    public void testSaveEmployer() {
        // Arrange
        EmployerPostDTO employerDto = new EmployerPostDTO(
                "1",
                "John",
                "Doe",
                "Company",
                "123456789",
                "email@gmail.com",
                "password"
        );

        // Act
        final EmployerPostDTO employerPostDTOReturn = employerService.saveEmployer(employerDto);
        // Assert
        assertThat(employerPostDTOReturn).isEqualTo(employerDto);
        verify(employerRepository).save(employerDto.toEmployer());
        verify(utilisateurRepository).save(employerDto.toEmployer().getUtilisateur());

    }


    /**
     * Method under test: {@link EmployerService#getEmployer(String)}
     */
    @Test
    void testGetEmployer() {

        // Arrange
        Employer employer = new Employer();
        employer.setCompanyId("42");
        employer.setUtilisateur(new Utilisateur("philip@gmail.com", "iloveyou", "Employeur"));
        when(employerRepository.getByCompanyId(anyString())).thenReturn(employer);

        // Act
        final EmployerGetDTO employerDto = employerService.getEmployer("42");

        // Assert
        assertThat(employerDto.getCompanyId()).isEqualTo("42");
    }

    /**
     * Method under test: {@link EmployerService#getEmployer(String)}
     */
    @Test
    void testGetEmployer2() {
        Employer employer = new Employer();
        employer.setUtilisateur(new Utilisateur("jane.doe@example.org", "iloveyou", "Employeur"));
        when(employerRepository.getByCompanyId((String) any())).thenReturn(employer);
        EmployerGetDTO actualEmployer = employerService.getEmployer("42");
        assertNull(actualEmployer.getCompanyId());
        assertNull(actualEmployer.getPhoneNumber());
        assertNull(actualEmployer.getLastName());
        assertNull(actualEmployer.getFirstName());
        assertEquals("jane.doe@example.org", actualEmployer.getEmail());
        assertNull(actualEmployer.getCompanyName());
        verify(employerRepository).getByCompanyId((String) any());
    }

    /**
     * Method under test: {@link EmployerService#existByCompagnyId(String)}
     */
    @Test
    void testExistByCompagnyId() {
        when(employerRepository.existsByCompanyName((String) any())).thenReturn(true);
        assertTrue(employerService.existByCompagnyId("Company Name"));
        verify(employerRepository).existsByCompanyName((String) any());
    }

    /**
     * Method under test: {@link EmployerService#existByCompagnyId(String)}
     */
    @Test
    void testExistByCompagnyId2() {
        when(employerRepository.existsByCompanyName((String) any())).thenReturn(false);
        assertFalse(employerService.existByCompagnyId("Company Name"));
        verify(employerRepository).existsByCompanyName((String) any());
    }

    /**
     * Method under test: {@link EmployerService#existByEmail(String)}
     */
    @Test
    void testExistByEmail() {
        when(utilisateurRepository.existsByEmail((String) any())).thenReturn(true);
        assertTrue(employerService.existByEmail("jane.doe@example.org"));
        verify(utilisateurRepository).existsByEmail((String) any());
    }

    /**
     * Method under test: {@link EmployerService#existByEmail(String)}
     */
    @Test
    void testExistByEmail2() {
        when(utilisateurRepository.existsByEmail((String) any())).thenReturn(false);
        assertFalse(employerService.existByEmail("jane.doe@example.org"));
        verify(utilisateurRepository).existsByEmail((String) any());
    }

}
