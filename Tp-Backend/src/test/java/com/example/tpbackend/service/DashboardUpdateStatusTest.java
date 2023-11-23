package com.example.tpbackend.service;


import com.example.tpbackend.models.*;
import com.example.tpbackend.repository.*;
import com.example.tpbackend.service.dashboard.DashboardUpdateStatus;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import static org.mockito.Mockito.*;

@ContextConfiguration(classes = {DashboardUpdateStatus.class})
@RunWith(SpringJUnit4ClassRunner.class)
@ExtendWith(MockitoExtension.class)
class DashboardUpdateStatusTest
{
    @InjectMocks
    DashboardUpdateStatus dashboardUpdateStatus;

    @Mock
    private CvRepository cvRepository;

    @Mock
    private OffreStageRepository offreStageRepository;

    @Mock
    private EntrevueRepository entrevueRepository;

    @Mock
    private CandidatureRepository candidatureRepository;

    @Mock
    private ContratStageRepository contratStageRepository;


    @Test
    void testUpdateCvSetViewedByGestionnaire(){
        Cv cv = new Cv();
        cv.setStatus(Cv.Status.In_review);
        cv.setId(1L);
        cv.setMatricule("2222222");
        cv.setStatusVuPasVuG(Cv.StatusVuPasVu.pasVu);
        cv.setStatusVuPasVuS(Cv.StatusVuPasVu.pasVu);
        cv.setFileName("asbascv.pdf");

        doNothing().when(cvRepository).updateCvStatusVuPasVuGByMatricule("2222222", Cv.StatusVuPasVu.vu);
        dashboardUpdateStatus.updateStatusCvVuG("2222222", Cv.StatusVuPasVu.vu);

        verify(cvRepository, times(1)).updateCvStatusVuPasVuGByMatricule("2222222", Cv.StatusVuPasVu.vu);
    }

    @Test
    void testUpdateStatusOffreSetViewedByGestionnaire(){
        OffreStage offre = new OffreStage();
        offre.setDescription("asfqwfqw");
        offre.setTitre("offer");
        offre.setId(1L);
        offre.setStatus(OffreStage.Status.In_review);
        offre.setStatusVuPasVuG(OffreStage.StatusVuPasVu.pasVu);
        offre.setStatusVuPasVuS(OffreStage.StatusVuPasVu.pasVu);

        doNothing().when(offreStageRepository).updateOffreStatusVuPasVuGByTitre("offer", OffreStage.StatusVuPasVu.vu);
        dashboardUpdateStatus.updateStatusOffreVuG("offer", OffreStage.StatusVuPasVu.vu);

        verify(offreStageRepository, times(1)).updateOffreStatusVuPasVuGByTitre("offer", OffreStage.StatusVuPasVu.vu);
    }

    @Test
    void testUpdateStatusEntrevueSetViewedByGestionnaire() {
        Entrevue entrevue = new Entrevue();
        entrevue.setId(1L);
        entrevue.setStatus(Entrevue.Status.EnAttente);
        entrevue.setStatusVuPasVuG(Entrevue.StatusVuPasVu.pasVu);
        entrevue.setStatusVuPasVuS(Entrevue.StatusVuPasVu.pasVu);

        doNothing().when(entrevueRepository).updateStatusVuPasVuGByMatricule("2222222", Entrevue.StatusVuPasVu.vu);
        dashboardUpdateStatus.updateStatusEntrevueVuG("2222222", Entrevue.StatusVuPasVu.vu);

        verify(entrevueRepository, times(1)).updateStatusVuPasVuGByMatricule("2222222", Entrevue.StatusVuPasVu.vu);
    }

    @Test
    void updateStatusCandidatureSetViewedByGestionnaire(){
        Candidature candidature = new Candidature();
        candidature.setStatus(Candidature.Status.In_review);
        candidature.setId(1L);
        candidature.setStatusVuPasVuG(Candidature.StatusVuPasVu.pasVu);
        candidature.setStatusVuPasVuS(Candidature.StatusVuPasVu.pasVu);

        doNothing().when(candidatureRepository).updateCandidatureStatusVuPasVuGByMatricule("2222222", Candidature.StatusVuPasVu.vu);
        dashboardUpdateStatus.updateStatusCandidatureEmbaucheVuG("2222222", Candidature.StatusVuPasVu.vu);

        verify(candidatureRepository, times(1)).updateCandidatureStatusVuPasVuGByMatricule("2222222", Candidature.StatusVuPasVu.vu);
    }

    @Test
    void updateStatusContratSetViewedByGestionnaire(){
        ContratStage contratStage = new ContratStage();
        contratStage.setId(1L);
        contratStage.setStatutVuPasVuE(ContratStage.StatusVuPasVu.pasVu);
        contratStage.setStatutVuPasVuG(ContratStage.StatusVuPasVu.pasVu);
        contratStage.setStatutVuPasVuS(ContratStage.StatusVuPasVu.pasVu);

        doNothing().when(contratStageRepository).updateStatusVuPasVuGByMatricule("2222222", ContratStage.StatusVuPasVu.vu);
        dashboardUpdateStatus.updateStatusContratVuG("2222222", ContratStage.StatusVuPasVu.vu);

        verify(contratStageRepository, times(1)).updateStatusVuPasVuGByMatricule("2222222", ContratStage.StatusVuPasVu.vu);
    }
}
