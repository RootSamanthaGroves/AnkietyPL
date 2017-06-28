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
//        ListResults.add(rule);
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

        String[] options = Utils.splitOptions("-N " + n + " -C " + c);
        apriori = new Apriori();
        apriori.setOptions(options);
        apriori.buildAssociations(data); //Generowanie regul asocjacyjnych
        AssociationRules associationRules = apriori.getAssociationRules();
        List<AssociationRule> rules = associationRules.getRules();
        System.out.println(rules);
        StringBuilder sb = new StringBuilder();
//        (String[] attribName, AssociationRule associationRule, String[][] instances, int numRule)
        String[][] dataInTable = dataFromInnstancesToTable(data);
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
//            ruleTab[numRule-1]=rulesAsString.toString();
            rulesAsString.append("<br>");
            numRule++;
            Rule rr = new Rule(rulesAsString.toString());
            rulesList.add(rulesAsString.toString());
        }

        //  System.out.println(rr.getRule(result[0]));

//        System.out.println(rulesAsString.toString()+"oiuytre");
//        for (AssociationRule rule : r) {
//
//            sb.append(rule.toString());
//            System.out.print(rule.getPremise() + " ");
//            System.out.println(rule.getConsequence());
//
//            System.out.println(rule.getPremiseSupport());
//            System.out.println(rule.getTotalSupport() + " ");
//
//            System.out.print(rule.getPrimaryMetricValue() + " ");
//
//
//        }


//        if (rulesList.isEmpty())
//            return new ResponseEntity(HttpStatus.NO_CONTENT);
        return rulesList;

    }


    /**
     * Metoda Sprawdza czy dana reguła jest wspierana przez obiekty Dzieli
     * regule na premise i consequence i sprawdza czy następniki i poprzedniki
     * reguły mają takie same wartości w sprawdzanym obiekcie
     *
     * @param attribName      tablica z nazwami atrybutów
     * @param associationRule reguła do sprawdzenia
     * @param instances       zbiór obiektów danych
     * @param numRule         numer sprawdzanej reguły
     * @return tablica jednowymiarowa z wartościami typu String przechwującymi
     * numery wspieranych przez obiekt reguł
     */
    public static String[] ruleCheck(String[] attribName, AssociationRule associationRule, String[][] instances, int numRule) {
        String[] tabCompatibility = new String[instances.length];
        for (int j = 0; j < tabCompatibility.length; j++) {
            tabCompatibility[j] = " ";
        }

        Collection<Item> premise = associationRule.getPremise();
        Collection<Item> consequence = associationRule.getConsequence();
        for (int i = 0; i < instances.length; i++) {// przechodzi po calej tablicy danych
            for (Item item : premise) {
                int index = 0;
                for (int j = 0; j < attribName.length; j++) {
                    if (item.getAttribute().name().equals(attribName[j])) {
                        index = j;
                    }
                }
                String instValueOnAtrrib = instances[i][index];
                if (!instValueOnAtrrib.equals(item.getItemValueAsString())) {// przyrownanie czy czesc z regulu jest spełniona z wartoscia z kolumny
                    tabCompatibility[i] = "niezgodny";
                    break;
                }
            }
            for (Item item : consequence) {
                int index = 0;
                for (int j = 0; j < attribName.length; j++) {
                    if (item.getAttribute().name().equals(attribName[j])) {
                        index = j;
                    }
                }
                String instValueOnAtrrib = instances[i][index];
                if (/*instValueOnAtrrib.equals(item.getItemValueAsString()) &&*/!tabCompatibility[i].equals("niezgodny")) {
                    tabCompatibility[i] = (numRule + 1) + "";
                } else {
                    tabCompatibility[i] = "niezgodny";
                }
            }
        }
        return tabCompatibility;
    }

    /**
     * Przpisuje dane z obiektu instances do tablicy dwuwymiarowej
     *
     * @param data
     * @return
     */
    public String[][] dataFromInnstancesToTable(Instances data) {
        String buf[];
        String[] obj;
        List<String[]> listObj = new ArrayList<>();
        for (int i = 0; i < data.numInstances(); i++) {
            buf = data.instance(i).toString().split(",");
            obj = new String[buf.length];
            for (int k = 0; k < buf.length; k++) {
                obj[k] = String.valueOf(buf[k]);
            }
            listObj.add(obj);
        }
        return listObj.toArray(new String[][]{});
    }

//dddddddddddddddddddddddddddddddddddddddddddddddddd
//    public void loadDataToTable(String[][] dataInTable, String[] acceptRules, String[] contradictoryTheRules) {
//        try {
//            int numberRow = numOfNewInstance;
//            int numberColumn = newData.numAttributes() + 2;
//            jTabData = new JTable(numberRow, numberColumn);
//
//            DefaultTableModel dtm = new DefaultTableModel(0, 0);
//            String header[] = new String[numberColumn];
//            for (int i = 0; i < numberColumn - 2; i++) {
//                header[i] = newData.attribute(i).name();
//                LIST_OF_HEADER.add(header[i]);
//            }
//            header[numberColumn - 2] = "Supports rules";
//            header[numberColumn - 1] = "Contradictory the rules";
//            tabHeaders = header;
//            dtm.setColumnIdentifiers(header);
//            jTabData.setModel(dtm);
//
//            List<String[]> listWithInstance = new ArrayList<>();
//            for (int i = 0; i < dataInTable.length; i++) {////poprawić
//                Instance instance = newData.instance(i);
//                String[] row = new String[instance.numAttributes() + 2];
//                String[] row2 = instance.toString().split(Pattern.quote(","));
//                System.arraycopy(row2, 0, row, 0, row2.length);
//                row[row.length - 1] = contradictoryTheRules[i];
//
//                row[row.length - 2] = acceptRules[i];
//
//                listWithInstance.add(row);
//            }
//            for (int i = 0; i < numberRow; i++) {
//                dtm.addRow(listWithInstance.get(i));
//            }
//            jTabData.setVisible(true);
//
//            Insets insets = this.getInsets();
//            JScrollPane jp = new JScrollPane(jTabData);
//            jp.setSize(new Dimension(100, 60));
//
//            jp.setBounds(10 + insets.left, 180 + insets.top, this.getWidth() - insets.right - 30, this.getHeight() - 190);
//            jp.setVisible(true);
//
//            try {
//                this.add(jp);
//
//            } catch (Exception e) {
//                System.out.println("Już nie kwiczy magia JAVY :D");
//            }
//            this.repaint();
//        } catch (Exception ex) {
//            Logger.getLogger(windowWEKA.class.getName()).log(Level.SEVERE, null, ex);
//        }
//    }
//
//


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

//                System.out.println("Liczba roznych wartosci atrybutu=" + attributeStats.distinctCount);
                result = new String[attributeStats.distinctCount][2];

                //Wypisanie liczebnosci obiektow z poszczegolnymi wartosciami atrybutu symbolicznego
                for (int j = 0; j < attributeStats.nominalCounts.length; j++) {
                    Attribute attr = data.attribute(numerAtribute);//Pobranie atrybutu o podanym numerze
                    String attrValue = attr.value(j); //Pobranie wartosci atrybutu o podanym numerze (na liscie wartosci)
                    int attrValueCount = attributeStats.nominalCounts[j]; //Pobranie liczebnosci obiektow z wartoscia atrybutu o podanym numerze
//                    System.out.print(attrValue + "(" + attrValueCount + ") ");
                    result[j][0] = attrValue;
                    result[j][1] = String.valueOf(attrValueCount);
                }
//                System.out.println();
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

