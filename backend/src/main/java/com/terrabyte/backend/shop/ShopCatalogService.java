package com.terrabyte.backend.shop;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ShopCatalogService {

    public List<ShopProductResponse> findAll() {
        return List.of(
                new ShopProductResponse("grow-light", "parts", "식물 성장등 (LED)", "💡", "실내 재배 공간에 설치하기 좋은 LED 조명", 29900, "추천"),
                new ShopProductResponse("watering-kit", "parts", "자동 관수 키트", "💧", "설정한 주기에 맞춰 물을 공급하는 관수 키트", 39900, null),
                new ShopProductResponse("soil-probe", "parts", "토양 수분 센서 프로브", "🌡️", "기존 기기에 연결해 교체할 수 있는 센서 프로브", 12900, null),
                new ShopProductResponse("power-adapter", "parts", "USB-C 전원 어댑터", "🔌", "센서와 관수 장치에 사용하는 전원 어댑터", 9900, null),
                new ShopProductResponse("herb-soil", "soil", "실내 허브용 배양토 10L", "🪴", "허브와 잎채소에 바로 사용할 수 있는 배양토", 12500, "인기"),
                new ShopProductResponse("perlite", "soil", "펄라이트 3L", "🪨", "배수성과 통기성을 보완하는 토양 개량재", 6900, null),
                new ShopProductResponse("coco-peat", "soil", "코코피트 블록 5L", "🧱", "수분을 흡수하면 부피가 늘어나는 가벼운 배지", 7500, null),
                new ShopProductResponse("gravel", "soil", "마사토 자갈 5L", "🪨", "화분 바닥 배수층에 사용하는 자갈", 8900, null),
                new ShopProductResponse("vermiculite", "soil", "버미큘라이트 3L", "🪨", "수분과 양분 보유력을 높이는 토양 개량재", 7900, null),
                new ShopProductResponse("basil-seeds", "seeds", "바질 씨앗", "🌿", "실내에서 키우기 좋은 허브 씨앗", 2500, "초보 추천"),
                new ShopProductResponse("lettuce-seeds", "seeds", "상추 씨앗", "🥬", "재배기에서 키우기 좋은 잎채소 씨앗", 2500, null),
                new ShopProductResponse("arugula-seeds", "seeds", "루꼴라 씨앗", "🌱", "향이 좋은 잎채소 씨앗", 2800, null));
    }
}
