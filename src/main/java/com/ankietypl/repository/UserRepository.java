/**
 * Created by Dominika on 2016-12-14.
 */

package com.ankietypl.repository;


import com.ankietypl.model.User;
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
public class UserRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void save(User u) {
        entityManager.persist(u);
    }

    public List<User> findAll() {
        TypedQuery<User> query = entityManager.createQuery("select u from User u", User.class);
        return query.getResultList();
    }

    @Transactional
    public ResponseEntity removeOne(long id) {

        User u = entityManager.find(User.class, id);
        if (u == null) {
            return new ResponseEntity(new HttpHeaders(), HttpStatus.BAD_REQUEST);
        } else {
            entityManager.remove(u);
            return new ResponseEntity(u, new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }

    }

    @Transactional
    public User findOne(long id) {
        User u = entityManager.find(User.class, id);
        return u;
    }


    public User findOneByEmail(String email) {
        TypedQuery<User> query = entityManager.createQuery("select u from User u where u.email = :email", User.class);
        query.setParameter("email", email);
        List<User> userList = query.getResultList();
        if (userList.isEmpty())
            return null;
        return userList.get(0);
    }


    @Transactional
    public User update(long id, User u) {
        User user = entityManager.find(User.class, id);

        if (!u.getEmail().isEmpty()) {
            user.setEmail(u.getEmail());
        }

        if (!u.getPassword().isEmpty()) {
            user.setPassword(u.getPassword());
        }
        if (!u.getFirstName().isEmpty()) {
            user.setFirstName(u.getFirstName());
        }
        if (!u.getLastName().isEmpty()) {
            user.setLastName(u.getLastName());
        }

        entityManager.merge(user);


        return user;

    }

}
