/**
 * Created by Dominika on 2017-01-08.
 */
package com.ankietypl.repository;


import com.ankietypl.model.Message;
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
public class MessageRepository {


    @PersistenceContext
    private EntityManager entityManager;

    //dodawanie
    @Transactional
    public void save(Message m) {
        entityManager.persist(m);
    }


    //wyświetlanie
    public List<Message> findAll() {
        TypedQuery<Message> query = entityManager.createQuery("select m from Message m", Message.class);
        return query.getResultList();
    }

    //usuwanie
    @Transactional
    public ResponseEntity removeOne(long id) {

        Message m = entityManager.find(Message.class, id);
        if (m == null) {
            return new ResponseEntity(new HttpHeaders(), HttpStatus.BAD_REQUEST);
        } else {
            entityManager.remove(m);
            return new ResponseEntity(m, new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }

    }

    //wyszunikanie po id
    @Transactional
    public Message findOne(long id) {
        Message m = entityManager.find(Message.class, id);
        return m;
    }

    //wyszukiwanie po emailu
    public Message findOneByEmail(String email) {
        TypedQuery<Message> query = entityManager.createQuery("select u from Message u where u.email = :email", Message.class);
        query.setParameter("email", email);
        List<Message> messagesList = query.getResultList();
        if (messagesList.isEmpty())
            return null;
        return messagesList.get(0);
    }


}
