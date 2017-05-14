
/**
 * Created by Dominika on 2017-01-08.
 */

package com.ankietypl.repository;

import com.ankietypl.model.Answer;
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
public class AnswerRepository {


    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void save(Answer a) {
        entityManager.persist(a);
    }

    public List<Answer> findAll() {
        TypedQuery<Answer> query = entityManager.createQuery("select a from Answer a", Answer.class);
        return query.getResultList();
    }


    @Transactional
    public ResponseEntity removeOne(long id) {

        Answer a = entityManager.find(Answer.class, id);
        if (a == null) {
            return new ResponseEntity(new HttpHeaders(), HttpStatus.BAD_REQUEST);
        } else {
            entityManager.remove(a);
            return new ResponseEntity(a, new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }

    }

    @Transactional
    public Answer findOne(long id) {
        Answer a = entityManager.find(Answer.class, id);
        return a;
    }


    @Transactional
    public Answer update(long id, Answer a) {
        Answer answer = entityManager.find(Answer.class, id);

        if (!a.getAnswer().isEmpty()) {
            answer.setAnswer(a.getAnswer());
        }
        if (!a.getAnswer().isEmpty()) {
            answer.setAnswer(a.getAnswer());
        }
        entityManager.merge(answer);
        return answer;
    }
}


