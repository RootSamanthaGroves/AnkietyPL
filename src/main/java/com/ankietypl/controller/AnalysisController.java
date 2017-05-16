package com.ankietypl.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import weka.associations.Apriori;
import weka.associations.AssociationRule;
import weka.associations.AssociationRules;
import weka.core.Instance;
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
    @ResponseBody
    @GetMapping("rules")
    public ResponseEntity<?> getRules() {
        Instances data;
        String result[] = new String[1];
        try {
            data = loadData("static/data/dataAnkietyweka.csv");
            result[0] = rulesAssociativ(data, "0.9", "10");
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
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

        for (AssociationRule rule : rules) {
            sb.append(rule.toString() + "\n");
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

    @GetMapping("/data")
    public static Instances loadData(String filePath)
            throws IOException {
//        Instances dataLoad = loadData("static/data/dataAnkietyweka.csv");
        CSVLoader loader = new CSVLoader(); //Utworzenie obiektu czytajacego dane z formatu CSV
        loader.setSource(new File(filePath)); //Ustawienie pliku do odczytania
        Instances data = loader.getDataSet(); //Odczytanie danych z pliku
        return data;
    }

    @GetMapping("/showdata")
    @ResponseBody
    //Wypisanie na ekran calej tablicy danych (wierszami)

    public static ResponseEntity<?> infoObj()
            throws Exception {
        Instances data;

         String [] result = null;

        try {
            data = loadData("static/data/dataAnkietyweka.csv");

            //result = new String[];
            result = new String[data.numInstances()];
            String textValue = "";
            String textValueW="";
            StringBuilder sb ;
            for (int i = 0; i < data.numInstances(); i++) //Przegladanie obiektow
            {
                sb =new StringBuilder();
//                System.out.println(i + " Wiersz numer " + i + ":");

                Instance instance = data.instance(i); //Pobranie obiektu (wiersza danych) o podanym numerze

                sb.append(i);
                sb.append(" ");
                for (int j = 0; j < instance.numAttributes(); j++) //Przegladanie atrybutow w obiekcie
                {


//                    textValue += instance.stringValue(j) + ", "; //Pobranie wartosci atrybutu o podanym numerze (tzn. pobranie tekstowej reprezentacji wartosci)
                    //textValueW= textValue+ instance.stringValue(j);
                    System.out.println(instance.stringValue(j));
                    sb.append(instance.stringValue(j));
                    sb.append(" ");
                }
                result[i]=sb.toString();
//                result.add(textValue);
//                System.out.println();


            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("Koniec");
        return ResponseEntity.ok(result);
    }


}

