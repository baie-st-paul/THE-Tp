package com.example.tpbackend.service;

import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Year;

@NoArgsConstructor
public class TagGenerator {
    private static LocalDate debutAu = LocalDate.of(2023, 8, 23);
    private static LocalDate finAu = LocalDate.of(2023, 12, 22);
    private static LocalDate debutH = LocalDate.of(2023, 1, 23);
    private static LocalDate finH = LocalDate.of(2023, 5, 23);

    private static LocalDate debutETE = LocalDate.of(2023, 6, 23);
    private static LocalDate finETE = LocalDate.of(2023, 7, 23);
    private static LocalDate currentDate = LocalDateTime.now().toLocalDate();
    private static String currentYear = Year.now().toString();

    private static String currentSessionTag;
    public static String getCurrentSession(){
        if (isAu() != null){
            currentSessionTag = isAu().toString()+currentYear.substring(2);
        }
        if (isH() != null){
            currentSessionTag = isH().toString()+currentYear.substring(2);
        }
        if (isETE() != null){
            currentSessionTag = isETE().toString()+currentYear.substring(2);
        }
        System.out.println(currentSessionTag);
        return currentSessionTag;
    }

    private static SessionAcronym isAu(){
        if (currentDate.isAfter(debutAu) && currentDate.isBefore(finAu)) {
            return SessionAcronym.AU;
        }
        return null;
    }

    private static SessionAcronym isH(){
        if (currentDate.isAfter(debutH) && currentDate.isBefore(finH)) {
            return SessionAcronym.H;
        }
        return null;
    }

    private static SessionAcronym isETE(){
        if (currentDate.isAfter(debutETE) && currentDate.isBefore(finETE)) {
            return SessionAcronym.ETE;
        }
        return null;
    }
    private enum SessionAcronym{
        AU,
        H,
        ETE
    }
}
