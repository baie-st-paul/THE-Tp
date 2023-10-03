package com.example.tpbackend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TpBackendApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(TpBackendApplication.class, args);
    }

    @Override
    public void run(String... args) {}
}
