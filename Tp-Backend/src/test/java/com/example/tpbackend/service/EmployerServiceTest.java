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
                "John",
                "Doe",
                "Company",
                "123456789",
                "email@gmail.com",
                "password"
        );

        // Act
        final EmployerPostDTO employerPostDTOReturn = employerService.saveEmployer(employerDto,employerDto.getEmail(),employerDto.getPassword(),"Employeur");
        // Assert
        assertThat(employerPostDTOReturn).isEqualTo(employerDto);
        verify(employerRepository).save(employerDto.toEmployer(employerDto));
        verify(utilisateurRepository).save(employerDto.toEmployer(employerDto).getUtilisateur());

    }


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
