package com.Barclays.newCafe;

import org.springframework.data.jpa.repository.JpaRepository;


interface CafeRepo extends JpaRepository<Cafe, Integer> {
    
}
