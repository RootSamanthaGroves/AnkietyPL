package com.ankietypl.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Created by Dominika on 2017-01-07.
 */
@Entity
public class Question {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String question;

    @ManyToMany
    private List<Answer> answers;

    public Question() {
    }

    public Question(long id, String question) {
        this.id = id;
        this.question = question;
    }

    public Question(String question) {
        this.question = question;
    }

    public Question(long id, String question, List<Answer> answers) {
        this.id = id;
        this.question = question;
        this.answers = answers;
    }

    public Question(String question, List<Answer> answers, List<Survey> survey) {
        this.question = question;
        this.answers = answers;

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }

    @Override
    public String toString() {
        return "Question{" +
                "id=" + id +
                ", question='" + question + '\'' +
                ", answers=" + answers +
                '}';
    }
}
