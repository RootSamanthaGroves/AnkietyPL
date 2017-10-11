package com.ankietypl.controller;


import com.ankietypl.model.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.ankietypl.repository.AnswerRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

/**
 * Created by Dominika on 2017-03-07.
 */

@RestController
@RequestMapping("answer")
public class AnswerController {


    @Autowired
    private AnswerRepository answerRepository;


    @GetMapping("all")
    public ResponseEntity<?> getAll() {
        List<Answer> answersList = answerRepository.findAll();
        if (answersList.isEmpty())
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        return ResponseEntity.ok(answersList);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') or hasAnyAuthority('ROLE_USER')")
    @PostMapping("/add")
    public ResponseEntity<Answer> postAnswer(@RequestBody Answer answer) {
        answerRepository.save(answer);
        return ResponseEntity.ok(answer);
    }


//    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @DeleteMapping("delete/id/{id}")
    public ResponseEntity<Answer> deleteAnswer(@PathVariable Optional<Long> id) {
        if (!id.equals(null)) {
            Answer a = answerRepository.findOne(id.get());
            answerRepository.removeOne(id.get());
            if (a != null) {
                return new ResponseEntity(a, new HttpHeaders(), HttpStatus.OK);
            } else {
                return new ResponseEntity(new HttpHeaders(), HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity(new HttpHeaders(), HttpStatus.BAD_REQUEST);

        }
    }


    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @RequestMapping(value = "/id/{id}")
    public ResponseEntity<Answer> getDetailsOfAnswer(@PathVariable Optional<Long> id) {
        if (id.isPresent()) {
            Answer answer = answerRepository.findOne(id.get());
            if (answer != null) {
                return new ResponseEntity<Answer>(answer, new HttpHeaders(), HttpStatus.OK);
            } else {
                return new ResponseEntity<Answer>(HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<Answer>(HttpStatus.BAD_REQUEST);
    }


    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @PostMapping("/put/{id}/{answer}")
    public ResponseEntity<Answer> update(@PathVariable long id, @RequestBody Answer answer) {
        System.out.println(id+ " "+ answer.toString());
        answerRepository.update(Long.valueOf(id), answer);
        return new ResponseEntity<Answer>(answer, new HttpHeaders(), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN') or hasAnyAuthority('ROLE_USER')")
    @Transactional
    @PostMapping("/update/")
    public ResponseEntity<Answer> updateAnswer(@RequestBody Answer answer) {
        System.out.println(answer);
        answerRepository.updateA(answer.getId(), answer.getAnswer());
        return new ResponseEntity<Answer>(answer, new HttpHeaders(), HttpStatus.OK);
    }

}

