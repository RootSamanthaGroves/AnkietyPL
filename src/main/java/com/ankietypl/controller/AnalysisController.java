package com.ankietypl.controller;

import com.ankietypl.model.Rule;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import weka.associations.Apriori;
import weka.associations.AssociationRule;
import weka.associations.AssociationRules;
import weka.associations.Item;
import weka.core.*;
import weka.core.converters.CSVLoader;

import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.List;

/**
 * Created by Dominika on 2017-03-24.
 */


@RestController
@RequestMapping("analysis")
public class AnalysisController {


  public static double [][] tabOfSupportAndTrust;
//  public static double

    /**
     * Metoda przedkazuje wygenerowane reguły asocjacyjne.
     *
     * @return
     */
//    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @ResponseBody
    @GetMapping("rules/{c}/{n}")
    public ResponseEntity<?> getRules(@PathVariable double c, @PathVariable int n) {
        Instances data;

        List<String> result = null;
        try {
            data = loadData("static/data/dataAnkietyweka.csv");
            result = rulesAssociativ(data, c, n);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(result.size() + "  reg ");

        return ResponseEntity.ok(result);
    }

    /**
     * Generowanie reguł Asocjacyjnych algorytmem Apriori
     *
     * @param data
     * @param c    Minmalna ufnosc reguly (standardowo: 0.9).
     * @param n    Liczba regul do policzenia (standardowo: 10)
     * @return
     * @throws Exception
     */
    public List<String> rulesAssociativ(Instances data, double c, int n)
            throws Exception {
        Apriori apriori;
        data.setClassIndex(data.numAttributes() - 1);
        int count = data.numInstances() + 1;

        double w = 0.0;
        double u = 0.0;
        double lift = 0.0;
        double uO = 0.0;
        double totalS;
        double premiseS;
        double premiseC;

        String[] options = Utils.splitOptions("-N " + n + " -C " + c);
        apriori = new Apriori();
        apriori.setOptions(options);
        apriori.buildAssociations(data); //Generowanie regul asocjacyjnych
        AssociationRules associationRules = apriori.getAssociationRules();
        List<AssociationRule> rules = associationRules.getRules();
        System.out.println(" reguly" + rules);
        StringBuilder sb = new StringBuilder();


        String[] nameAtributes = new String[data.numAttributes()];
        List<String> rulesList = new ArrayList<>();

        StringBuilder rulesAsString = new StringBuilder("");
        List<AssociationRule> r = apriori.getAssociationRules().getRules();
        int numRule = 1;
        for (AssociationRule rule : r) {
            Collection<Item> premise = rule.getPremise();
            Collection<Item> consequence = rule.getConsequence();
            rulesAsString.append(numRule);
            rulesAsString.append(". ");
            premise.stream().map((item) -> {
                rulesAsString.append(item.getAttribute().name());
                return item;
            }).map((item) -> {
                rulesAsString.append(" = ");
                rulesAsString.append(item.getItemValueAsString());
                return item;
            }).forEach((_item) -> {
                rulesAsString.append(" ");
            });
            rulesAsString.append(" ==> ");
            consequence.stream().map((item) -> {
                rulesAsString.append(item.getAttribute().name());
                return item;
            }).map((item) -> {
                rulesAsString.append(" = ");
                rulesAsString.append(item.getItemValueAsString());
                return item;
            }).forEach((_item) -> {
                rulesAsString.append(" ");

            });

            rulesAsString.append("<br>");
            numRule++;
            Rule rr = new Rule(rulesAsString.toString());
            rulesList.add(rulesAsString.toString());
        }

       tabOfSupportAndTrust = new double[n][4];
        System.out.println(rulesAsString.toString() + "oiuytre");
        int i = 0;
        for (AssociationRule rule : r) {
            totalS = Integer.valueOf(rule.getTotalSupport());
            premiseS = Integer.valueOf(rule.getPremiseSupport());
            premiseC= Integer.valueOf(rule.getConsequenceSupport());

            w = Double.valueOf(totalS / count);
            System.out.println("wsparcie =" + w + " " + count + " " + totalS + " " + premiseS);
            u = totalS / premiseS;
            uO = Double.valueOf(premiseC / count);
            lift = u / uO;

//            System.out.println("ufnosc =" + u);
//            tabOfSupportAndTrust[i][0] = w;
            tabOfSupportAndTrust[i][1] = u;
            tabOfSupportAndTrust[i][0]= w;
            tabOfSupportAndTrust[i][2] = uO;
            tabOfSupportAndTrust[i][3]= lift;

            sb.append(rule.toString());
//            System.out.print(rule.getPremise() + " ");
//            System.out.println(rule.getConsequence());
//
//            System.out.println("  " + rule.getPremiseSupport());
//            System.out.println(rule.getTotalSupport() + " ");
//
//            System.out.println(" primary metric to" + rule.getPrimaryMetricValue() + " ");
//            System.out.println(" consequence suport to" + rule.getConsequenceSupport() + " ");
//            System.out.println(" total supprot to" + rule.getTotalSupport() + " ");
//            System.out.println(" premise supprot to" + rule.getPremiseSupport() + " ");
            i++;
        }


        return rulesList;

    }


    @ResponseBody
    @GetMapping("/supportAndTrust")
    public  ResponseEntity<?> getsupportAndTrust() {
        double [][] result = new double[tabOfSupportAndTrust.length][tabOfSupportAndTrust[0].length];
        for (int i = 0; i < result.length; i++) {
            System.out.println(tabOfSupportAndTrust[i][0]+ " "+ tabOfSupportAndTrust[i][1]+ " "+ tabOfSupportAndTrust[i][2]+ " "+ tabOfSupportAndTrust[i][3]);
            result[i][0] = tabOfSupportAndTrust[i][0];
            result[i][1] = tabOfSupportAndTrust[i][1];
            result[i][2] = tabOfSupportAndTrust[i][2];
            result[i][3] = tabOfSupportAndTrust[i][3];
        }

        return ResponseEntity.ok(result);
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
//                    System.out.println(instance.stringValue(j));
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

                result = new String[attributeStats.distinctCount][2];

                //Wypisanie liczebnosci obiektow z poszczegolnymi wartosciami atrybutu symbolicznego
                for (int j = 0; j < attributeStats.nominalCounts.length; j++) {
                    Attribute attr = data.attribute(numerAtribute);//Pobranie atrybutu o podanym numerze
                    String attrValue = attr.value(j); //Pobranie wartosci atrybutu o podanym numerze (na liscie wartosci)
                    int attrValueCount = attributeStats.nominalCounts[j]; //Pobranie liczebnosci obiektow z wartoscia atrybutu o podanym numerze

                    result[j][0] = attrValue;
                    result[j][1] = String.valueOf(attrValueCount);
                }

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

