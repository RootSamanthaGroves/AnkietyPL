package com.ankietypl.model;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by Dominika on 2016-12-07.
 */
@Entity
public class UsersData {

    @Id
    private long id;
    private int age;
    private String profession;
    private String placeOfResidence;

    public UsersData() {
    }

    public UsersData(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public String getPlaceOfResidence() {
        return placeOfResidence;
    }

    public void setPlaceOfResidence(String placeOfResidence) {
        this.placeOfResidence = placeOfResidence;
    }
}
