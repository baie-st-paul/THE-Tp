package com.example.tpbackend.DTO.Authentication;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequest<T> {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String role;
    private T userType;
}
