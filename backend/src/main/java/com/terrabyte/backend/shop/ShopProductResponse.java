package com.terrabyte.backend.shop;

public record ShopProductResponse(
        String id,
        String category,
        String name,
        String emoji,
        String desc,
        int price,
        String badge) {
}
