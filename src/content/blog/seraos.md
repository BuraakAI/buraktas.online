---
title: "SeraOS: making a single pot autonomous"
description: "The architecture of SeraOS — an offline, self-watering plant system that manages its own light and climate."
date: 2026-08-18
tags: ["SeraOS", "embedded", "ESP32", "IoT"]
lang: "en"
---

SeraOS has one goal: **care for a plant fully autonomously, with no human in the loop.** Water, light, temperature and humidity are read by sensors and handled by actuators (pump, grow LED, fan). And it runs **without internet** — autonomy first; cloud and a mobile app come later.

## Core logic: problem → solution

- Plant runs dry → soil moisture is measured; if dry, the **pump** runs.
- Not enough light → a light sensor + calendar drive the **grow LED** by daily light integral (DLI).
- Too hot/humid → past a threshold, the **fan** kicks in.
- Water runs out → the level is watched; if empty, a **dry-run lock** engages.
- Power cut → a **LiPo UPS** keeps the brain alive and it resumes where it left off.

## The brain

At the center is an `ESP32` running the read → decide → act loop. An RTC for time, a microSD for logging, an OLED + encoder for phone-free monitoring. Everything sits under a **watchdog** and sensor fail-safes — if the device locks up it resets; if a sensor goes stale, it drops to a safe state.

```
[sensors] → ESP32 (hysteresis + thresholds) → [pump / LED / fan]
                  ↳ microSD log ↳ OLED status
```

Three modules work today (clock + UI, sensing, pump/fan). Next: LED lighting control, logging + UI, and the UPS. I'll write it up here as it progresses.
