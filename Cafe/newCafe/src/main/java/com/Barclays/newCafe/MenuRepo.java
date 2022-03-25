package com.Barclays.newCafe;

import org.springframework.data.jpa.repository.JpaRepository;



interface MenuRepo extends JpaRepository<Menu, Integer> {
    
}