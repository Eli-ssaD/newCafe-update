package com.Barclays.newCafe;

import org.springframework.data.jpa.repository.JpaRepository;



interface DrinkRepo extends JpaRepository<Drink, Integer> {
    
}
