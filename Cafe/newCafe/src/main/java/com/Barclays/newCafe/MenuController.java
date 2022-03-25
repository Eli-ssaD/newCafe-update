package com.Barclays.newCafe;


import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class MenuController {
    private CafeRepo cafeRepo;
    private MenuRepo menuRepo;

    public MenuController(CafeRepo cafeRepo, MenuRepo menuRepo) {
        this.cafeRepo = cafeRepo;
        this.menuRepo = menuRepo;
    }

    @PostMapping("/cafes/{cafe_id}/menus")
    public Cafe createMenu(@RequestBody Menu menuData, @PathVariable Integer cafe_id) {
        Cafe cafe = cafeRepo.findById(cafe_id).get();
        menuData.setCafe(cafe);
        menuRepo.save(menuData);
        return cafeRepo.findById(cafe_id).get();
    }
}
