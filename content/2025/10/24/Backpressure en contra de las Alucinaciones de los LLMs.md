---
draft: true
tags:
  - llms
  - backpressure
  - alucinaciones-negativas
  - asistentes-de-programación
  - desarrollo-de-software
journal: Website
journal-date: 2025-10-24
date: 2025-10-24
---
> Este es el segundo artículo en la serie Principios Fundamentales para el Desarrollo de Software Asistido por IA, el primero está disponible en [[La Alucinación es el Feature Fundamental de los LLMs]]

No recuerdo cuando fue la primera vez que leí el termino "**backpressure**" usado para englobar los mecanismos que permiten contrarrestar las [[La Alucinación es el Feature Fundamental de los LLMs#^1bb028|Alucinaciones Negativas]] que generan los Asistentes de Programación, es decir las alucinaciones que *no agregan valor* en el contexto, code base, en el que estamos trabajando.

**Backpressure** es un termino que originalmente viene de la dinámica de fluidos, y que se refiere a resistencia de un fluido, un gas o un líquido, a fluir cuando se encuentra con una presión "en contra" en su recorrido. Es un término que se ha adoptado también en sistemas de software para describir mecanismos que permiten regular el flujo de datos para evitar la sobrecarga de un sistema "aguas abajo". 

Yo una vez me enfrenté a un sistema "aguas abajo" que era un programa *antiguo* que corría en un mainframe y que estaba escrito en Fortran, y solo podía realizar muy pocas operaciones por segundo. Funcionaba, aunque nadie entendía el código, era un cálculo muy complejo, y había que vivir con él y tuvimos que hacer un  ajuste para que nuestro sistema no lo destruyera a punta de peticiones.

Como es axiomático que los LLMs van a producir [[La Alucinación es el Feature Fundamental de los LLMs#^1bb028|Alucinaciones Negativas]] entonces tenemos que implementar mecanismos que nos permitan minimizarlas y/o contrarrestarlas aka **backpressure**. El mecanismo más obvio en este sentido es el ***human-in-the-loop***, cuando un programador *humano*, con experiencia, revisa el código generado por un AI Assistant y lo acepta o no. Esto tradicionalmente asociado a un Pull Request, Code Review o QA.

Si sacamos al humano del proceso, y lo hemos estado haciendo por mucho tiempo, entonces podemos entender que un Test Suite es un mecanismo de backpressure también.

Otro mecanismo, diferente en su naturaleza, tiene que ver con "aterrizar" al modelo ("grounding") inyectando en el contexto información que promueve las [[La Alucinación es el Feature Fundamental de los LLMs#^f28629|Alucinaciones Positivas]] durante al proceso de inferencia y no a posteriori. Similar a lo que un manager o tech lead hace cuando se preocupa porque su equipo tenga a acceso a materiales y cursos de calidad y actualizados, o asegurándose de que la documentación del sistema se mantenga al día.

