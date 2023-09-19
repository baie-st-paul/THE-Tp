package com.example.tpbackend;
import com.example.tpbackend.service.GestionnaireStageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TpBackendApplication implements CommandLineRunner {
    @Autowired
    GestionnaireStageService gestionnaireStageService;

    public static void main(String[] args) {
        SpringApplication.run(TpBackendApplication.class, args);
    }
    @Override
    public void run(String... args) {
        System.out.println(
                gestionnaireStageService.getAllCvs()
        );
    }
}

