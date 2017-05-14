package com.ankietypl.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import weka.associations.Apriori;
import weka.associations.AssociationRule;
import weka.associations.AssociationRules;
import weka.core.Instances;
import weka.core.Utils;
import weka.core.converters.CSVLoader;

import java.io.File;
import java.io.IOException;
import java.util.List;

/**
 * Created by Dominika on 2017-03-24.
 */

@RestController
@RequestMapping("analysis")
public class AnalysisController {

    /**
     * Metoda przedkazuje wygenerowane reguły asocjacyjne.
     *
     * @return
     */
//    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @GetMapping("rules")
    public ResponseEntity<?> getRules() {
        Instances data;
        String result = "";
        try {
            data = loadData("dataAnkietyweka.csv");
            result = rulesAssociativ(data, "0.9", "10");
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(result);
        return ResponseEntity.ok(result);
    }

    /**
     * Generowanie reguł Asocjacyjnych algorytmem Apriori
     *
     * @param data
     * @param n    Liczba regul do policzenia (standardowo: 10)
     * @param c    Minmalna ufnosc reguly (standardowo: 0.9).
     * @return
     * @throws Exception
     */
    public String rulesAssociativ(Instances data, String c, String n)
            throws Exception {
        Apriori apriori;
        data.setClassIndex(data.numAttributes() - 1);

        String[] options = Utils.splitOptions("-N " + n + " -C " + c);
        apriori = new Apriori();
        apriori.setOptions(options);
        apriori.buildAssociations(data); //Generowanie regul asocjacyjnych
        AssociationRules associationRules = apriori.getAssociationRules();
        List<AssociationRule> rules = associationRules.getRules();
        StringBuilder sb = new StringBuilder();

        for (AssociationRule rule: rules) {
            sb.append(rule.toString()+"\n");
        }
        return sb.toString();
    }

    /**
     * Odczytanie tablicy danych z pliku w formacie CSV
     *
     * @param filePath
     * @return
     * @throws IOException
     */
    public static Instances loadData(String filePath)
            throws IOException {
        CSVLoader loader = new CSVLoader(); //Utworzenie obiektu czytajacego dane z formatu CSV
        loader.setSource(new File(filePath)); //Ustawienie pliku do odczytania
        Instances data = loader.getDataSet(); //Odczytanie danych z pliku
        return data;
    }

}

