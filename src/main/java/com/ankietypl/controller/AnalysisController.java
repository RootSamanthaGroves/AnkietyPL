package com.ankietypl.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import weka.associations.Apriori;
import weka.associations.AssociationRule;
import weka.associations.AssociationRules;
import weka.core.*;
import weka.core.converters.CSVLoader;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

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

        String[] result = null;

        try {
            data = loadData("static/data/dataAnkietyweka.csv");

            //result = new String[];
            result = new String[data.numInstances()];
            String textValue = "";
            String textValueW = "";
            StringBuilder sb;
            for (int i = 0; i < data.numInstances(); i++) //Przegladanie obiektow
            {
                sb = new StringBuilder();
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
                result[i] = sb.toString();
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


    @GetMapping("/statystic/{numerAtribute}")
    @ResponseBody
    //Obliczanie statystyk dla atrybutow

    public static ResponseEntity<?> liczStatystyki(@PathVariable int numerAtribute)
            throws Exception {
        Instances data;
        numerAtribute++;
        String[][] result = null;
        try {
            data = loadData("static/data/dataAnkietyweka.csv");

//            for (int i = 0; i < data.numAttributes(); i++) {
            AttributeStats attributeStats = data.attributeStats(numerAtribute); //Wyliczenie statystyk atrybutu o podanym numerze

            System.out.println("Atrybut:" + data.attribute(numerAtribute).name()); //Wypisanie nazwy atrybutu

            if (data.attribute(numerAtribute).isNumeric()) {
                //Wypisanie statystyk dla atrybutu numerycznego
                System.out.println(" Max=" + attributeStats.numericStats.max); //Maksymalna wartosc
                System.out.println(" Min=" + attributeStats.numericStats.min); //Minimalna wartosc
                System.out.println(" Mean=" + attributeStats.numericStats.mean); //Srednia
                System.out.println(" StdDev=" + attributeStats.numericStats.stdDev); //Odchylenie standardowe
                System.out.println(" Count=" + attributeStats.numericStats.count); //Liczba wartosci atrybutu
            } else {
                //Wypisanie statystyk dla atrybutu symbolicznego

                System.out.println("Liczba roznych wartosci atrybutu=" + attributeStats.distinctCount);
                result = new String[attributeStats.distinctCount][2];

                //Wypisanie liczebnosci obiektow z poszczegolnymi wartosciami atrybutu symbolicznego
                for (int j = 0; j < attributeStats.nominalCounts.length; j++) {
                    Attribute attr = data.attribute(numerAtribute);//Pobranie atrybutu o podanym numerze
                    String attrValue = attr.value(j); //Pobranie wartosci atrybutu o podanym numerze (na liscie wartosci)
                    int attrValueCount = attributeStats.nominalCounts[j]; //Pobranie liczebnosci obiektow z wartoscia atrybutu o podanym numerze
                    System.out.print(attrValue + "(" + attrValueCount + ") ");
                    result[j][0] = attrValue;
                    result[j][1] = String.valueOf(attrValueCount);
                }
                System.out.println();
//                }
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

