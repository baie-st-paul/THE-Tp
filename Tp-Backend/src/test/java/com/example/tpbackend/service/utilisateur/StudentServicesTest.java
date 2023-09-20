package com.example.tpbackend.service.utilisateur;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.example.tpbackend.repository.CvRepository;
import com.example.tpbackend.repository.utilisateur.StudentRepository;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ContextConfiguration(classes = {StudentServices.class})
@ExtendWith(SpringExtension.class)
class StudentServicesTest {
    @MockBean
    private CvRepository cvRepository;

    @MockBean
    private StudentRepository studentRepository;

    @Autowired
    private StudentServices studentServices;

    @MockBean
    private UtilisateurRepository utilisateurRepository;

    /**
     * Method under test: {@link StudentServices#existsByMatriculeOrEmail(String, String)}
     */
    @Test
    void testExistsByMatriculeOrEmail() {
        when(studentRepository.existsByMatriculeOrEmail(Mockito.<String>any(), Mockito.<String>any())).thenReturn(true);
        assertTrue(studentServices.existsByMatriculeOrEmail("Matricule", "jane.doe@example.org"));
        verify(studentRepository).existsByMatriculeOrEmail(Mockito.<String>any(), Mockito.<String>any());
    }

    /**
     * Method under test: {@link StudentServices#existsByMatriculeOrEmail(String, String)}
     */
    @Test
    void testExistsByMatriculeOrEmail2() {
        when(studentRepository.existsByMatriculeOrEmail(Mockito.<String>any(), Mockito.<String>any())).thenReturn(false);
        assertFalse(studentServices.existsByMatriculeOrEmail("Matricule", "jane.doe@example.org"));
        verify(studentRepository).existsByMatriculeOrEmail(Mockito.<String>any(), Mockito.<String>any());
    }
}

