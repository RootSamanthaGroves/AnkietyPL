package com.ankietypl.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Created by Dominika on 2017-01-07.
 */
@Entity
public class SurveyResults {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String idankieta;
    private Date data;
    private String GroupOfRespondents;
    private String question;
    private String userAnswer;



}
