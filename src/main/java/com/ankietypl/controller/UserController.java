/**
 * Created by Dominika on 2016-12-14.
 */

package com.ankietypl.controller;


import com.ankietypl.model.Role;
import com.ankietypl.model.User;
import com.ankietypl.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


//@Controller
//@RequestMapping
@RestController
@RequestMapping("user")
public class UserController {


    @Autowired
    private UserRepository userRepository;



    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @GetMapping("all")
    //ta metoda nie moze byc prywatna bo wtedy @Preatuhroize nie dziala
    public ResponseEntity<?> getAll() {
        List<User> usersList = userRepository.findAll();
        if (usersList.isEmpty())
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        return ResponseEntity.ok(usersList);
    }

    /*  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")*/
    @GetMapping("current")
    public ResponseEntity currentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User u = userRepository.findOneByEmail(auth.getName());
        if (u != null)
            return ResponseEntity.ok(u);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

//    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<User> postUser(@RequestBody User user) {
        user.setRole(Role.ROLE_USER);
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok(user);


    }



@PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @DeleteMapping("delete/id/{id}")
    public ResponseEntity<User> deleteEmployee(@PathVariable Optional<Long> id) {
        if (!id.equals(null)) {
            User u = userRepository.findOne(id.get());
            userRepository.removeOne(id.get());
            if (u != null) {
                return new ResponseEntity(u, new HttpHeaders(), HttpStatus.OK);
            } else {
                return new ResponseEntity(new HttpHeaders(), HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity(new HttpHeaders(), HttpStatus.BAD_REQUEST);

        }
    }

@PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @RequestMapping(value = "/id/{id}")
    public ResponseEntity<User> getDetailsOfUsers(@PathVariable Optional<Long> id) {
        if (id.isPresent()) {
            User user = userRepository.findOne(id.get());
            if (user != null) {
                return new ResponseEntity<User>(user, new HttpHeaders(), HttpStatus.OK);
            } else {
                return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
    }



@PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @PostMapping("/put/{id}")
    public ResponseEntity<User> update(@PathVariable long id, @RequestBody User user) {
        userRepository.update(id, user);
        return new ResponseEntity<User>(user, new HttpHeaders(), HttpStatus.OK);
    }

    @RequestMapping(value = "/email/{email}")
    public ResponseEntity<User> getOfUsersByEMail(@PathVariable String email) {
        if (!email.isEmpty()) {
            User user = userRepository.findOneByEmail(email);
            if (user != null) {
                return new ResponseEntity<User>(user, new HttpHeaders(), HttpStatus.OK);
            } else {
                return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
            }
        }
        return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping("user")
    public String view() {
        return "redirect:/views/index.html";
    }

    @RequestMapping( value = "account", method = RequestMethod.GET)
    public String viewAccount() {
        return "redirect:views/user-account.html";
    }

}
