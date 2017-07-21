/**
 * Created by Dominika on 2017-01-07.
 */
package com.ankietypl.controller;

import com.ankietypl.model.Question;
import com.ankietypl.model.Survey;
import com.ankietypl.repository.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
    @RequestMapping("survey")

    public class SurveyController {

        @Autowired
        private SurveyRepository surveyRepository;


        @GetMapping("all")
        public ResponseEntity<?> getAll() {
            List<Survey> surveysList = surveyRepository.findAll();
            if (surveysList.isEmpty())
                return new ResponseEntity(HttpStatus.NO_CONTENT);
            return ResponseEntity.ok(surveysList);
        }


    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<Survey> postSurvey(@RequestBody Survey survey) {
        surveyRepository.save(survey);
        return ResponseEntity.ok(survey);
    }


    @DeleteMapping("delete/id/{id}")
    public ResponseEntity<Survey> deleteEmployee(@PathVariable Optional<Long> id) {
        if (!id.equals(null)) {
            Survey s = surveyRepository.findOne(id.get());
            surveyRepository.removeOne(id.get());
            if (s != null) {
                System.out.println(HttpStatus.OK);
                return new ResponseEntity(s, new HttpHeaders(), HttpStatus.OK);
            } else {
                System.out.println(HttpStatus.NOT_FOUND);

                return new ResponseEntity(new HttpHeaders(), HttpStatus.NOT_FOUND);
            }
        } else {
            System.out.println(HttpStatus.BAD_REQUEST);
            return new ResponseEntity(new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("id/{id}")
    public ResponseEntity<Survey> getDetailsOfSurvey(@PathVariable Optional<Long> id) {
        if (id.isPresent()) {
            Survey survey = surveyRepository.findOne(id.get());
            if (survey != null) {
                return new ResponseEntity<Survey>(survey, new HttpHeaders(), HttpStatus.OK);
            } else {
                return new ResponseEntity<Survey>(HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<Survey>(HttpStatus.BAD_REQUEST);
    }

//    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @PostMapping("/put/{id}")
    public ResponseEntity<Survey> update(@PathVariable long id, @RequestBody Survey survey) {
//        System.out.println(survey.toString());
        surveyRepository.update(Long.valueOf(id), survey);
        return new ResponseEntity<Survey>(survey, new HttpHeaders(), HttpStatus.OK);
    }

}
