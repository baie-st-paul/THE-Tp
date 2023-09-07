package com.example.tpbackend;

import com.example.tpbackend.DTO.PostDTO.StudentPostDTO;
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
    public void run(String... args) {
        StudentServices studentServices = new StudentServices();
        System.out.println("hello");
        System.out.println();

        StudentPostDTO studentPostDTO = studentServices.saveStudent("phil", "vall", "444-444-4444", "email", "informatique", "email@gmail.com", "password");

        System.out.println(studentPostDTO);
    }
}
