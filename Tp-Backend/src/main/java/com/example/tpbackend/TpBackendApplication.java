package com.example.tpbackend;

import com.example.tpbackend.DTO.utilisateur.student.StudentPostDTO;
import com.example.tpbackend.service.utilisateur.StudentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.io.IOException;

import java.util.stream.Stream;

@SpringBootApplication
public class TpBackendApplication implements CommandLineRunner {
    @Autowired
    StudentServices studentServices;

    public static void main(String[] args) {
        SpringApplication.run(TpBackendApplication.class, args);
    }

    @Override
    public void run(String... args) {}
}
