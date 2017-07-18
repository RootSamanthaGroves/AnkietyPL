/**
 * Created by Dominika on 2016-12-14.
 */
package com.ankietypl.repository;

import com.ankietypl.model.Question;
import com.ankietypl.model.Survey;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;


@Repository
public class SurveyRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void save(Survey s) {
        entityManager.persist(s);
    }

    public List<Survey> findAll() {
        TypedQuery<Survey> query = entityManager.createQuery("select s from Survey s", Survey.class);
        return query.getResultList();
    }


    @Transactional
    public ResponseEntity removeOne(long id) {

        Survey s = entityManager.find(Survey.class, id);
        if (s == null) {
            return new ResponseEntity(new HttpHeaders(), HttpStatus.BAD_REQUEST);
        } else {
            entityManager.remove(s);
            return new ResponseEntity(s, new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    public Survey findOne(long id) {
        Survey s = entityManager.find(Survey.class, id);
        return s;
    }

    @Transactional
    public Survey update(long id, Survey s) {
        Survey survey = entityManager.find(Survey.class, id);

        if (!s.getQuestion().isEmpty()) {
            survey.setQuestion(s.getQuestion());
        }
        entityManager.merge(survey);
        return survey;

    }
}