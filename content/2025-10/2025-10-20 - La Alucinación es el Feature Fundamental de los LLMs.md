---
title: La Alucinación es el Feature Fundamental de los LLMs
description: "Principios Fundamentales, No 1: Alucinaciones como Feature"
permalink: 2025-10-20-la-alucinacion-en-llms-como-feature
draft: false
tags:
  - alucinación
  - feature
  - llm
  - llms
  - código
  - programación
  - alucinaciones-positivas
  - alucionaciones-negativas
  - programar
journal: Website
journal-date: 2025-10-20
---
Un  LLM no puede no alucinar porque en esencia su funcionamiento es esa, alucinar esa siguiente palabra (tokens) dando como resultado un texto *plausible* (imagen, audio, etc) que puede no ser real.  Entonces, Cuando utilizamos un Asistente de IA que integra un LLM para que nos ayude en la creación de software, en particular para generar código **siempre** existe la posibilidad que ese código no funcione.

Debido a esto podemos *clasificar* las alucinaciones de los Asistentes de IA de la siguiente forma:

- **Alucinaciones Positivas:** Cuando nos agregan valor, esto va más allá de que el código compile, o que pueda ser interpretado, eso no es un valor en si mismo. Una alucinación positiva implica que haya un impacto positivo en nuestro trabajo desarrollando software y eventualmente la vida de las personas que que lo utilizan.

- **Alucinaciones Negativas**: Cuando nos restan valor, quitándonos tiempo, demandando nuestro esfuerzo para corregirlas o porque sencillamente aunque compilen no mejoran el estado del código ni contribuyen a moverlo hacia adelante. Un ejemplo de esto es un asistente haciendo un refactoring no solicitado que nos deja en el mismo sitio.

En mi experiencia personal reconozco que cuando programaba, porque *yo solía programar*, múltiples veces pasé por la experiencia de decir *"Ummm, seguro que yo puedo hacer algo como... "* y probar a ejecutarlo rápidamente en un REPL y tener "suerte" y que la sintaxis fuera correcta. Claro que esta "suerte" no era tal, sencillamente yo había internalizado los patrones del lenguaje de programación y esa "alucinación" estaba muy bien alineada con los mismos por lo que esta alucinación terminaba siendo **positiva**.

A efectos prácticos los LLMs internalizan, *generalizan*, patrones del lenguaje, entre ellos de los lenguajes de programación y las estructuras de los sistemas de software que al final son un montón de documentos. Esto junto con otros mecanismos hacen que tengan esta capacidad de generar respuesta plausibles cuando les pedimos que escriban código. 

Si yo estuviera creando un lenguaje de programación nuevo y estuviera explorando nuevos constructos para el el mismo, la capacidad de alucinar una sintaxis inexistente también tendría un saldo neto **positivo**. De esta forma podemos concluir que *el valor de las alucinaciones es contextual*, y no absoluto.

---
Este texto fue redactado en su totalidad por un ser humano.