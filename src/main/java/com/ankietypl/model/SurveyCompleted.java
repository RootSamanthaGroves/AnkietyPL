package com.ankietypl.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by Dominika on 2017-01-07.
 */
@Entity

public class SurveyCompleted {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Size(min = 3, max = 50)
    @Column
    private String surveysComplite;


    public SurveyCompleted() {
    }

    public SurveyCompleted(String surveysComplite) {
        this.surveysComplite = surveysComplite;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getSurveysComplite() {
        return surveysComplite;
    }

    public void setSurveysComplite(String surveysComplite) {
        this.surveysComplite = surveysComplite;
    }
}
