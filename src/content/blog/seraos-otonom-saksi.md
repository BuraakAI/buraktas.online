---
title: "SeraOS: tek saksıyı otonom yapmak"
description: "İnternetsiz çalışan, kendi kendine sulayıp ışığını ve iklimini yöneten otonom bitki sistemi SeraOS'un mimarisi."
date: 2026-08-18
tags: ["SeraOS", "gömülü", "ESP32", "IoT"]
---

SeraOS'un tek bir hedefi var: **bir bitkiyi, insan müdahalesi olmadan tam otonom bakmak.** Su, ışık, sıcaklık ve nem sensörlerle ölçülür; pompa, grow LED ve fan gibi aktüatörlerle karşılanır. Üstelik **internet olmadan** çalışır — otonomi önce gelir, bulut ve mobil app sonradan.

## Temel mantık: sorun → çözüm

- Bitki susuz kalıyor → toprak nemi ölçülür, kuruysa **pompa** çalışır.
- Işık yetersiz → ışık sensörü + takvim ile **grow LED** günlük ışık dozuna (DLI) göre sürülür.
- Aşırı sıcak/nemli → eşik aşılınca **fan** devreye girer.
- Su bitince pompa yanmasın → su seviyesi izlenir, boşsa **kuru-çalışma kilidi** devreye girer.
- Elektrik kesilince sistem unutmasın → **LiPo UPS** ile beyin ayakta kalır, gelince kaldığı yerden sürer.

## Beyin

Merkezde bir `ESP32` var: oku → karar ver → uygula döngüsünü yürütüyor. Zaman için RTC, kayıt için microSD, telefonsuz izleme için OLED + encoder. Hepsi bir **watchdog** ve sensör-failsafe altında — cihaz kilitlenirse resetlenir, sensör bayatlarsa güvenli duruma geçer.

```
[sensörler] → ESP32 (histerezis + eşikler) → [pompa / LED / fan]
                     ↳ microSD log ↳ OLED durum
```

Şimdilik 3 modül çalışıyor (saat + arayüz, sensör okuma, pompa/fan). Sıradaki: LED ışık kontrolü, log + UI, ve UPS. İlerledikçe buraya yazacağım.
