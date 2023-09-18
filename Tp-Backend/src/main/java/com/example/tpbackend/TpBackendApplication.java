package com.example.tpbackend;
import com.example.tpbackend.service.OffreStageService;
import com.example.tpbackend.service.StudentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TpBackendApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(TpBackendApplication.class, args);
    }
    @Override
    public void run(String... args){

    }
}

