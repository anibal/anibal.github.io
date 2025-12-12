---
title: La Alucinación es el Feature Fundamental de los LLMs
slug: la-alucinacion-es-el-feature-fundamental-de-los-llms
draft: false
tags:
  - programación
  - alucinaciones-positivas
  - alucinaciones-negativas
  - alucinaciones
  - software
  - llm
  - desarrollo-de-software
  - asistentes-de-programación
journal: Website
journal-date: 2025-10-20
date: 2025-10-20
---
Un LLM **no** puede **no** alucinar porque en esencia su funcionamiento es ese, *alucinar* esa siguiente palabra (tokens) dando como resultado un texto *plausible* (imagen, audio, etc), *que puede no tener un asiento en la realidad*.  Entonces, Cuando utilizamos un *Asistente de Programación* que integra un LLM para que nos ayude en la creación de software, en particular para programar, generar código, **siempre** existe la posibilidad que ese código no sirva para nada, lo que llamamos *alucinaciones*.

Las alucinaciones *tienden* a funcionar. El hecho de que hoy en día que el motor del texto predictivo de un IDE sea un LLM es la norma, y en general esto agrega mucho valor a los programadores; pero por otra parte sabemos que aún a este nivel de micro-asistencia los modelos cometen errores. 

Entonces, considerando esta realidad podemos decir que hay:

- **Alucinaciones Positivas:** Cuando nos *agregan* valor, esto va más allá de que el código compile, o que pueda ser interpretado, eso no es un valor en si mismo. Una alucinación positiva implica que haya un *impacto* positivo en nuestro trabajo desarrollando software y eventualmente la vida de las personas que lo utilizan. ^f28629

- **Alucinaciones Negativas**: Cuando nos *restan* valor, quitándonos tiempo, demandando nuestro esfuerzo para corregirlas o porque sencillamente aunque compilen no mejoran el estado del código ni contribuyen a moverlo hacia adelante. Un ejemplo de esto es un asistente haciendo un refactoring no solicitado que nos deja en el mismo sitio. ^1bb028

Cuando yo programaba, múltiples veces pasé por la experiencia de decir *"Ummm, seguro que yo puedo hacer algo como... "* y probar rápidamente en un REPL y tener "suerte" y que la sintaxis fuera correcta. Claro que esta "suerte" no era tal, sencillamente yo había internalizado los patrones del lenguaje de programación y esa "alucinación" estaba muy bien alineada con los mismos por lo que esta alucinación terminaba siendo **positiva**.

Hay escuelas de pensamiento que proponen que los humanos constantemente alucinamos el mundo. Efectivamente nuestra mente opera dentro de las limitaciones orgánicas del sistema nervioso central, y con ese modelo limitado del mundo nos toca funcionar, porque es imposible procesar y representar **toda** la información del mundo en nuestro cerebro limitado, con nuestros sentidos limitados.

Si alguna vez se han preguntado **"¡¿EN QUÉ MUNDO VIVE ESA PERSONA?!"**, la respuesta es simple, y es la misma para todos nosotros, *en su mundo*.

Cuando la *intersección* entre nuestro modelo del mundo, el propio mundo y el modelo del mundo de las personas con las que interactuamos es amplia, todo funciona bien; cuando esa intersección es muy pequeña, no nos entendemos y puede llegar al caso extremo donde necesitamos ayuda profesional porque terminamos en una psicosis. Si quieren verlo más fácil, podríamos decir que la **creatividad** es una forma de alucinación positiva en los humanos.

A efectos prácticos los LLMs "internalizan", "generalizan", **patrones del lenguaje**, entre ellos de los lenguajes de programación y las estructuras de los sistemas de software que en resumidas cuentas están descritos en diferentes tipos de documentos. Esto junto con otros mecanismos hacen que tengan la capacidad de generar respuestas *plausibles* cuando les pedimos que escriban código. 

Si yo estuviera creando un lenguaje de programación nuevo y estuviera explorando nuevos constructos para el mismo, la capacidad de alucinar una sintaxis inexistente también tendría un saldo neto **positivo**. Entonces podemos concluir que *el valor de las alucinaciones es contextual*, y no absoluto.

**¿Por qué este enfoque?** Porque somos humanos y es muy fácil caer en el error de atribuir *cognición*, incluso conciencia e intencionalidad a una entidad que tiene la capacidad de producir lenguaje.

Esto **no es útil** porque automáticamente le atribuimos una "falta" a un LLM, o a un asistente que integra uno o más LLMs, cuando su salida no cumple con las  expectativas en nuestra mente. Y no nos ocupamos de entender los principios fundamentales que gobiernan estas tecnologías ni a ajustar nuestras prácticas en torno a los mismos.

Este es el primer artículo de una serie enfocada en los principios y prácticas fundamentales alrededor del desarrollo de software asistido por Inteligencia Artificial Generativa.

En la segunda parte de la serie, [Las matemáticas del Código Asistido por IA](/2025/10/28/las-matematicas-del-codigo-asistido-por-ia), exploro de una forma más formal el impacto de las alucinaciones positivas y negativas en el valor del uso de los Asistentes de Programación.

Compartido y publicado en: 
- [LinkedIn el 27 de Octubre del 2025](https://www.linkedin.com/posts/anibalrojas_un-llmnopuedenoalucinar-porque-en-esencia-activity-7388654847971205120-6cmz?utm_source=share&utm_medium=member_desktop&rcm=ACoAAABYcI8BB_U41_Zfnth-a-K6afvWfwlghiM).
- [Substack el 27 de Octubre del 2025](https://open.substack.com/pub/anibal/p/la-alucinacion-es-el-feature-fundamental?r=7wicq&utm_campaign=post&utm_medium=web&showWelcomeOnShare=false).
- [(Twitter) el 27 de Octubre del 2025](https://x.com/anibal/status/1982917439898955921).

---
## Otros artículos de la serie

2. [Las matemáticas del Código Asistido por IA](/2025/10/28/las-matematicas-del-codigo-asistido-por-ia)
3. [Una Visión de Sistemas para la Programación Asistida por IA](/2025/11/03/una-vision-de-sistemas-para-la-programacion-asistida-por-ia)
4. [Steering - Favoreciendo las Alucinaciones Positivas en los Asistentes de Programación](/2025/11/06/steering-favoreciendo-las-alucinaciones-positivas)
5. [Backpressure - Rechazando las Alucinaciones Negativas en los Asistentes de Programación](/2025/11/26/backpressure-rechazando-las-alucinaciones-negativas)