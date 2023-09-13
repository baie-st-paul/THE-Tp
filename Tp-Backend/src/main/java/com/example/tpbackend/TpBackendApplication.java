package com.example.tpbackend;

import com.example.tpbackend.DTO.PostDTO.CvDTO;
import com.example.tpbackend.DTO.PostDTO.StudentPostDTO;
import com.example.tpbackend.models.Cv;
import com.example.tpbackend.service.StudentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

@SpringBootApplication
public class TpBackendApplication implements CommandLineRunner {
    @Autowired
    StudentServices studentServices = new StudentServices();

    public static void main(String[] args) {
        SpringApplication.run(TpBackendApplication.class, args);
    }
    @Override
    public void run(String... args) throws IOException {
        System.out.println("hello");
        System.out.println();
        StudentPostDTO studentPostDTO = studentServices.saveStudent("phil", "vall", "444-444-4444", "email", "informatique", "email@gmail.com", "password");
    }
}
