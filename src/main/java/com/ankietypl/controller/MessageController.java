package com.ankietypl.controller;


import com.ankietypl.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ankietypl.repository.MessageRepository;

import java.util.List;
import java.util.Optional;

/**
 * Created by Dominika on 2017-01-08.
 */
@RestController
@RequestMapping("message")
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;


    //  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @GetMapping("all")
    public ResponseEntity<?> getAll() {
        List<Message> messageList = messageRepository.findAll();
        if (messageList.isEmpty())
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        return ResponseEntity.ok(messageList);
    }



    @PostMapping("add")
    public ResponseEntity postMessage(@RequestBody Message message) {
        messageRepository.save(message);
        if (message.getId() != 0)
            return ResponseEntity.ok(message);
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }


    // @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @DeleteMapping("delete/id/{id}")
    public ResponseEntity<Message> deleteEmployee(@PathVariable Optional<Long> id) {
        if (!id.equals(null)) {
            Message m = messageRepository.findOne(id.get());
            messageRepository.removeOne(id.get());
            if (m != null) {
                return new ResponseEntity(m, new HttpHeaders(), HttpStatus.OK);
            } else {
                return new ResponseEntity(new HttpHeaders(), HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity(new HttpHeaders(), HttpStatus.BAD_REQUEST);

        }
    }

    // @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @RequestMapping(value = "/id/{id}")
    public ResponseEntity<Message> getDetailsOfMessage(@PathVariable Optional<Long> id) {
        if (id.isPresent()) {
            Message message = messageRepository.findOne(id.get());
            if (message != null) {
                return new ResponseEntity<Message>(message, new HttpHeaders(), HttpStatus.OK);
            } else {
                return new ResponseEntity<Message>(HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<Message>(HttpStatus.BAD_REQUEST);
    }


    @RequestMapping(value = "/email/{email}")
    public ResponseEntity<Message> getOfUsersByEMail(@PathVariable String email) {
        if (!email.isEmpty()) {
            Message message = messageRepository.findOneByEmail(email);
            if (message != null) {
                return new ResponseEntity<Message>(message, new HttpHeaders(), HttpStatus.OK);
            } else {
                return new ResponseEntity<Message>(HttpStatus.NO_CONTENT);
            }
        }
        return new ResponseEntity<Message>(HttpStatus.BAD_REQUEST);
    }

}

