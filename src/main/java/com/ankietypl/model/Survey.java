package com.ankietypl.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Created by Dominika on 2016-12-07.
 */
@Entity
public class Survey {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String title;

    @ManyToMany
    private List<Question> question;

//    @ManyToMany(mappedBy = "user")
//    private List<User> user;

    public Survey() {
    }

    public Survey(String title, List<Question> question) {
        this.title = title;
        this.question = question;

    }

    public Survey(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public List<Question> getQuestion() {
        return question;
    }

    public void setQuestion(List<Question> guestion) {
        this.question = guestion;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }


}
