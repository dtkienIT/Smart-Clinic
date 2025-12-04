package com.project.back_end.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "patients")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @NotBlank
    @Size(min = 3, max = 100)
    private String name;

    @NotNull
    @NotBlank
    @Email
    @Column(unique = true, nullable = false)
    private String email;

    @NotNull
    @NotBlank
    @Size(min = 6)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @NotNull
    @NotBlank
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be exactly 10 digits")
    @Column(unique = true, nullable = false)
    private String phone;

    @NotNull
    @NotBlank
    @Size(max = 255)
    private String address;

    // relationship: one patient has many appointments
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = false)
    private List<Appointment> appointments = new ArrayList<>();

    // No-args constructor required by JPA
    public Patient() {}

    // constructor
    public Patient(String name, String email, String password, String phone, String address) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) { 
        this.id = id; 
    }

    public String getName() {
        return name;
    }

    public void setName(String name) { 
        this.name = name; 
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) { 
        this.email = email; 
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) { 
        this.password = password; 
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) { 
        this.phone = phone; 
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) { 
        this.address = address; 
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }
}
