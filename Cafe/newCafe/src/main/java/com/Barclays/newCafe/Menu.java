package com.Barclays.newCafe;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    
    private String title;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "menu_id")
    private List<Drink> drinks;

    @ManyToOne
    private Cafe cafe;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Drink> getDrinks() {
        return this.drinks;
    }

    public void setCafe(Cafe cafe) {
        this.cafe = cafe;
    }
}
