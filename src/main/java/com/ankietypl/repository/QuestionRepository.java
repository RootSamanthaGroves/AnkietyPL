
/**
 * Created by Dominika on 2017-01-08.
 */

package com.ankietypl.repository;


import com.ankietypl.model.Answer;
import com.ankietypl.model.Question;
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
public class QuestionRepository {


    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void save(Question q) {
        entityManager.persist(q);
    }

    public List<Question> findAll() {
        TypedQuery<Question> query = entityManager.createQuery("select q from Question q", Question.class);
        return query.getResultList();
    }


    @Transactional
    public ResponseEntity removeOne(long id) {

        Question q = entityManager.find(Question.class, id);
        if (q == null) {
            return new ResponseEntity(new HttpHeaders(), HttpStatus.BAD_REQUEST);
        } else {
            entityManager.remove(q);
            return new ResponseEntity(q, new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }

    }

    @Transactional
    public Question findOne(long id) {
        Question q = entityManager.find(Question.class, id);
        return q;
    }


    @Transactional
    public Question update(long id, Question q) {
        Question question = entityManager.find(Question.class, id);

        if (!q.getAnswers().isEmpty()) {
            question.setAnswers(q.getAnswers());
        }
        entityManager.merge(question);
        return question;

    }


    @Transactional
    public Question updateQ(long id, String q) {
        System.out.println(q);
        Question question = entityManager.find(Question.class, id);
        question.setQuestion(q);
        entityManager.merge(question);
        return question;

    }

}


