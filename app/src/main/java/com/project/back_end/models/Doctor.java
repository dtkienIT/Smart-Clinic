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
@Table(name = "doctors")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @NotBlank
    @Size(min = 3, max = 100)
    private String name;

    @NotNull
    @NotBlank
    @Size(min = 3, max = 50)
    private String specialty;

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

    // Example slots: "09:00-10:00", "10:00-11:00"
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "doctor_available_times",
            joinColumns = @JoinColumn(name = "doctor_id")
    )
    @Column(name = "time_slot")
    private List<String> availableTimes = new ArrayList<>();

    // Optional relationship: one doctor has many appointments
    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = false)
    private List<Appointment> appointments = new ArrayList<>();

    // No-args constructor required by JPA
    public Doctor() {}

    // Optional constructor
    public Doctor(String name, String specialty, String email, String password, String phone) {
        this.name = name;
        this.specialty = specialty;
        this.email = email;
        this.password = password;
        this.phone = phone;
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

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) { 
        this.specialty = specialty; 
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

    public List<String> getAvailableTimes() {
        return availableTimes;
    }

    public void setAvailableTimes(List<String> availableTimes) {
        this.availableTimes = availableTimes;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }
}
