package com.terrabyte.backend.shop;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ShopController {

    private final ShopCatalogService catalogService;

    public ShopController(ShopCatalogService catalogService) {
        this.catalogService = catalogService;
    }

    @GetMapping
    public List<ShopProductResponse> findAll() {
        return catalogService.findAll();
    }
}
