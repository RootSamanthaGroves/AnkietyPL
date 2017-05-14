package com.ankietypl.model;

import org.hibernate.validator.constraints.Email;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

/**
 * Created by Dominika on 2016-12-06.
 */
@Entity
@Table(name = "users")
public class User {

    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Size(min = 3, max = 50)
    private String firstName;
    @Size(min = 3, max = 50)
    private String lastName;
    @Column(nullable = false, unique = true)
    @Email
    private String email;
    @Size(min = 5)
    private String password;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;


    @ManyToMany
    private List<Survey> survey;

    @OneToOne
    private UsersData usersDatas;

    public User(String firstName, String lastName, String email, String password, Role role, List<Survey> survey, UsersData usersDatas) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.survey = survey;
        this.usersDatas = usersDatas;
    }

    public User() {
    }

    public User(String firstName, String lastName, String email, String password, Role roleAcount) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = roleAcount;
    }


    public User(long id) {
        this.id = id;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public long getId() {
        return id;
    }


    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setId(long id) {
        this.id = id;
    }


    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Survey> getSurvey() {
        return survey;
    }

    public void setSurvey(List<Survey> survey) {
        this.survey = survey;
    }

    public UsersData getUsersDatas() {
        return usersDatas;
    }

    public void setUsersDatas(UsersData usersDatas) {
        this.usersDatas = usersDatas;
    }
}
