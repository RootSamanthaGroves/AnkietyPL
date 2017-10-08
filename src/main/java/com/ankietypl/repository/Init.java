package com.ankietypl.repository;

/**
 * Created by DiiES on 2017-06-15.
 */


import com.ankietypl.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.JpaSort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;


/**
 * Created by DiiES on 2017-06-05.
 */

import java.io.*;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.lang.reflect.Array;
import java.net.URL;
import java.util.*;


@Component
public class Init {

    @Autowired
    UserRepository userRepository;
    @Autowired
    SurveyRepository surveyRepository;
    @Autowired
    AnswerRepository answerRepository;
    @Autowired
    QuestionRepository questionRepository;

    @PostConstruct
    public void init() throws IOException {
        User user1 = userRepository.findOneByEmail("user@o2.pl");
        User admin = userRepository.findOneByEmail("admin@o2.pl");
        if (user1 == null) {
            User user = new User();
            user.setEmail("user@o2.pl");
            user.setFirstName("User");
            user.setLastName("User");
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            user.setPassword(encoder.encode("user123"));
            user.setRole(Role.ROLE_USER);
            userRepository.save(user);
        }
        if (admin == null) {
            User user = new User();
            user.setEmail("admin@o2.pl");
            user.setFirstName("Dominika");
            user.setLastName("Sporzyńska");
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            user.setPassword(encoder.encode("admin"));
            user.setRole(Role.ROLE_ADMIN);
            userRepository.save(user);
        }


        Survey s = surveyRepository.findOne(1);
        if (s == null) {
            Survey survey = new Survey();
            survey.setTitle("Negatywne aspekty komputeryzacji w życiu współczesnego człowieka");
            //survey.setQuestion();
            surveyRepository.save(survey);

            System.out.println("DZIAłA");
            File file = new File("./src/main/resources/static/data/danedobazy/answers.csv");
            System.out.println("nadal działa");
            Scanner in = new Scanner(file);
            FileReader fileReader = new FileReader(file);
            BufferedReader bufferedReader = new BufferedReader(fileReader);
            Answer answer;
            String q = "";
//            try {
//                String textLine = bufferedReader.readLine();
//                while (textLine != null && textLine.length() > 0) {
//                    int index1 = textLine.indexOf(",");
//                    q = textLine.substring(index1 + 1);
//                    System.out.println(q);
//                    answer = new Answer(q);
//                    answerRepository.save(answer);
//                    textLine = bufferedReader.readLine();
//                }
//            } catch (IOException e) {
//                e.printStackTrace();
//            } finally {
//                try {
//                    bufferedReader.close();
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//            }
//ffffffffffffffffffffffffffffffffffffffff

//            file = new File("./src/main/resources/static/data/danedobazy/question.csv");
//
//            in = new Scanner(file);
//            fileReader = new FileReader(file);
//            bufferedReader = new BufferedReader(fileReader);
//            Question question;
//            ArrayList<Question> listOfQuestion = new ArrayList<Question>();
//
//            q = "";
//         //   String k="";
//            try {
//                String textLine = bufferedReader.readLine();
//                while (textLine != null && textLine.length() > 0) {
//                    int index1 = textLine.indexOf(",");
//                    int index2 = textLine.lastIndexOf(",");
//                    q = textLine.substring(index1 + 1);
//                 //   k= textLine.substring(index2,textLine.length());
//                   System.out.println(q);
//                    question = new Question(q);
//                    questionRepository.save(question);
//                    listOfQuestion.add(question);
//
//                    textLine = bufferedReader.readLine();
//                }
//            } catch (IOException e) {
//                e.printStackTrace();
//            } finally {
//                try {
//                    bufferedReader.close();
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//            }

            String csvFile = "./src/main/resources/static/data/danedobazy/questionanswer.csv";
            BufferedReader br = null;
            String line;
            String cvsSplitBy = ",";

            try {

                br = new BufferedReader(new FileReader(csvFile));
                while ((line = br.readLine()) != null) {

                    // use comma as separator
                    String[] country = line.split(cvsSplitBy);

                    System.out.println("Country [code= " + country[0] + " , name=" + country[1] + "]");

                }

            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                if (br != null) {
                    try {
                        br.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }


//            System.out.println(new File());
            file = new File("./src/main/resources/static/data/danedobazy/questionanswer.csv");

//             in = new Scanner(file);
            fileReader = new FileReader(file);
            bufferedReader = new BufferedReader(fileReader);


            Answer answer1;

            ArrayList<Answer> listOfAnswer = new ArrayList<Answer>();

            q = "";
            String id = "";
            try {
                String textLine = bufferedReader.readLine();
                while (textLine != null && textLine.length() > 0) {
                    int index1 = textLine.indexOf(",");
//                    q = textLine.substring(index1 + 1);
//                    id = textLine.substring(0,index1) ;
//                   System.out.println(q+" " +id);
//                    question = new Question(q);
//                    answerRepository.save();
//                    listOfAnswer.add(answer);
                    System.out.println(textLine);
                    textLine = bufferedReader.readLine();
                }
            } catch (IOException e) {
                e.printStackTrace();
                bufferedReader.close();
            }


//            survey.setQuestion(listOfQuestion);
//            surveyRepository.update(1, survey);

        }
    }


    public void listFilesForFolder(final File folder) {
        for (final File fileEntry : folder.listFiles()) {
            if (fileEntry.isDirectory()) {
                listFilesForFolder(fileEntry);
            } else {
                System.out.println(fileEntry.getName());
            }
        }
    }


}





