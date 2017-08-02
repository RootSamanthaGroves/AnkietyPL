package com.ankietypl.weka;

import weka.core.Instances;
import weka.core.converters.ArffLoader;
import weka.core.converters.ArffSaver;

import java.io.File;
import java.io.IOException;

/**
 * Created by Dominika on 2017-05-15.
 */
public class BasicDemo {




        //Odczytanie tablicy danych z dysku w formacie ARFF
        public static Instances loadData(String fileName)
                throws IOException
        {
            ArffLoader loader = new ArffLoader(); //Utworzenie obiektu czytajacego dane z formatu ARFF
            loader.setFile(new File(fileName)); //Ustawienie pliku do odczytania
            return loader.getDataSet(); //Odczytanie danych z pliku
        }





}
