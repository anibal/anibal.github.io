---
draft: false
tags:
  - prompting
  - prompt-injection
  - llms
  - tokens
  - seguridad
  - "#vector-de-ataque"
date: 2025-11-13
journal: Website
journal-date: 2025-11-13
slug: todo-prompting-es-prompt-injection
---
No existe tal cosa como el "Prompt Injection" como un mecanismo de ataque, ni una vulnerabilidad. No existe porque todos los prompts son "inyectados" en el contexto "plano" de un LLM, un espacio de tokens donde *por diseño* cada token tiene los mismos "privilegios" que cualquier otro token, y los tokens no diferencian entre instrucciones y datos. 

Tus instrucciones para el LLM **son datos**, los datos que tus usuarios ingresan y que tu pasas al LLM **son instrucciones**.

Este post es una versión condensada del de [Garret Galoway](https://www.linkedin.com/posts/garrettgalloway_repeat-after-me-i-do-not-trust-the-ai-share-7394415231411593216-ZbKk?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAABYcI8BB_U41_Zfnth-a-K6afvWfwlghiM&utm_campaign=share_via) que me encantó cuando lo leí y si a tu cabeza se viene argumentar con OWASP LLM01:2025, es que no logré explicar el punto.
