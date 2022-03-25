package com.Barclays.newCafe;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class CafeController {
    private CafeRepo repo;

    public CafeController(CafeRepo repo) {
        this.repo = repo;
    }

    @PostMapping("/cafes")
    public Cafe createCafe(@RequestBody Cafe cafeData) {
        return repo.save(cafeData);
    }

    @GetMapping("/cafes")
    public List<Cafe> getAll() {
        return repo.findAll();
    }

    @GetMapping("/cafes/{id}")
    public Cafe getOne(@PathVariable Integer id) {
        return repo.findById(id).get();
    }

    @PutMapping("/cafes/{id}")
    public Cafe updateOne(@RequestBody Cafe updateCafe, @PathVariable Integer id) {
        return repo.findById(id).map(cafe -> {
            cafe.setName(updateCafe.getName());
            cafe.setImage(updateCafe.getImage());
            return repo.save(cafe);
        }).orElseThrow();
    }

    @DeleteMapping("/cafes/{id}")
    public void updateOne(@PathVariable Integer id) {
        repo.deleteById(id);
    }
}

