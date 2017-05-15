//package com.ankietypl.weka;
//
//import weka.associations.Apriori;
//import weka.associations.AssociationRules;
//import weka.associations.Item;
//import weka.core.Instances;
//import weka.core.converters.ArffSaver;
//import weka.core.converters.CSVLoader;
//import weka.core.pmml.jaxbbindings.AssociationRule;
//
//import java.io.File;
//import java.io.IOException;
//import java.util.Collection;
//import java.util.Iterator;
//import java.util.List;
//import weka.core.Utils;
//
///**
// * Created by Dominika on 2017-05-15.
// */
//public class weka {
//
//
//    //Importowanie danych z formatu CSV do formatu ARFF
//    public static void importCSVtoARFF(String fileNameCSV,String fileNameARFF)
//            throws IOException
//    {
//        CSVLoader loader = new CSVLoader(); //Utworzenie obiektu czytajacego dane z formatu CSV
//        loader.setSource(new File(fileNameCSV)); //Ustawienie pliku do odczytania
//        Instances data = loader.getDataSet(); //Odczytanie danych z pliku
//        saveData(data,fileNameARFF); //Zapis tablicy do pliku w romacie ARFF
//    }
//
//    //Zapis zbioru danych do formatu ARFF
//    public static void saveData(Instances data,String fileName)
//            throws IOException
//    {
//        ArffSaver saver = new ArffSaver(); //Utworzenie obiektu zapisujacego dane
//        saver.setFile(new File(fileName)); //Ustawienie nazwy pliku do zapisu
//        saver.setInstances(data);
//        saver.writeBatch(); //Zapis do pliku
//    }
//
//
//    //Generowanie regul asocjacyjnych
//    public static void regulyAsocjacyjne()
//            throws Exception
//    {
//        Instances data = BasicDemo.loadData("static/data/dataAnkietyweka.csv");
//
//        data.setClassIndex(data.numAttributes() - 1);
//
//        //Opcje liczenia regul asocjacyjnych
//        //-N ->Liczba regul do policzenia (standardowo: 10)
//        //-C ->Minmalna ufnosc reguly (standardowo: 0.9).
//        String[] options = Utils.splitOptions("-N 20 -C 0.6");
//        Apriori apriori = new Apriori();
//        apriori.setOptions(options);
//        apriori.buildAssociations(data); //Generowanie regul asocjacyjnych
//
//        System.out.println("Liczba regul=" + apriori.getNumRules());
//
//
//        //===== POBRANIE INFORMACJI O REGULACH ========
//
//        AssociationRules rules = apriori.getAssociationRules();
//        List<AssociationRule> ruleList = rules.getRules();
//
//        for (int i=0; i<ruleList.size(); i++)
//        {
//            AssociationRule rule = ruleList.get(i); //Pobranie pojedynczej reguly
//
//
//            //Pobranie opisu poprzednika reguly
//            Collection<Item> poprzednik = rule.getPremise();
//            Iterator<Item> iteratorPoprzednik = poprzednik.iterator();
//            String poprzednikText = new String();
//            while (iteratorPoprzednik.hasNext())
//            {
//                poprzednikText = poprzednikText + "("+iteratorPoprzednik.next().toString()+")";
//                if (iteratorPoprzednik.hasNext()) poprzednikText = poprzednikText +"&";
//            }
//
//
//            //Pobranie opisu nastepnika reguly
//            Collection<Item> nastepnik = rule.getConfidence();
//            Iterator<Item> iteratorNastepnik = nastepnik.iterator();
//            String nastepnikText = new String();
//            while (iteratorNastepnik.hasNext())
//            {
//                nastepnikText = nastepnikText + "("+iteratorNastepnik.next().toString()+")";
//                if (iteratorNastepnik.hasNext()) nastepnikText = nastepnikText +"&";
//            }
//
//
//            //Pobranie wsparcie i obliczenia ufnosci
//            int wsparciePoprzednika = rule.getPremiseSupport();
//            int wsparcieCalosci = rule.getTotalSupport();
//            double ufnosc = (double)wsparcieCalosci/wsparciePoprzednika;
//
//
//            System.out.print(poprzednikText+"=>"+nastepnikText+", ");
//            System.out.print("Wsparcie:"+wsparcieCalosci+", ");
//            System.out.println("Ufnosc:"+ufnosc);
//
//        }
//
//
//        //To jest niezbyt czytelne, ale wiarygodne
//        //System.out.println(apriori.toString()); //Wypisanie informacji o regulach
//    }
//
//
//}
