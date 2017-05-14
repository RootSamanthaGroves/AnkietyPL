package com.ankietypl.model;

import org.hibernate.validator.constraints.Email;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by Dominika on 2017-01-08.
 */
@Entity
public class Message {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private  long id;
    private String name;
    @Column(nullable = false)
    @Email
    private String email;
    @Size(min = 3, max = 500)
    private String message;

    public Message() {
    }

    public Message(long id, String name, String email, String message) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.message = message;
    }
    public Message(String name, String email, String message) {
        this.name = name;
        this.email = email;
        this.message = message;
    }

    public long getId() {
        return id;
    }



    public void setId(long id) {
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

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
