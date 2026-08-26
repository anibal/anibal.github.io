---
title: "Las matemáticas del Código Asistido por IA"
description: "De nuestro primer artículo en la serie, La Alucinación es el Feature Fundamental de los LLMs, tenemos que las alucinaciones de los LLMs pueden ser positivas o negativas según agreguen o sustraigan valor a nuestro trabajo, a “nuestro código”."
date: 2025-10-28
lang: es
translationOf: the-mathematics-of-ai-assisted-code
tags:
  - llm
  - asistentes-de-programación
  - matemáticas
  - alucinaciones-negativas
  - alucinaciones-positivas
  - contexto
  - prompting
  - valor
---
De nuestro primer artículo en la serie, [La Alucinación es el Feature Fundamental de los LLMs](/2025/10/20/la-alucinacion-es-el-feature-fundamental-de-los-llms/), tenemos que las alucinaciones de los  LLMs pueden ser positivas o negativas según agreguen o sustraigan *valor* a nuestro trabajo, a *"nuestro código"*.

Ahora vamos a dar un paso atrás para aproximarnos un poco más formalmente a qué significa usar un LLM, en particular un **Asistente de Programación** como Claude Code, Cursor, Gemini  CLI, Windsurf, etc en nuestro trabajo con:

```
f(modelo,contexto,prompt) = contexto'
```

Donde:

- **f**: Representa una interacción con el Asistente de Programación
- **modelo** (m): De forma *simplificada*, es un modelo como Claude Sonnet 4.5, Gemini Pro 2.5, ChatGPT 5, etc, pero esto suele ser un *sistema* más complejo como Warp, GitHub Copilot o Claude Code.
- **contexto** (c): Incluye el código existente, la documentación, *posiblemente las herramientas disponibles*, **no** la *ventana de contexto* que es irrelevante en esta discusión.
- **prompt** (p): Es la instrucción que le damos al Asistente, la cual usualmente implica modificar el código de alguna forma, pero puede ser realizar un commit, instalar un paquete, etc. Excluye hacer una pregunta que solo sea respondida en la UI del Asistente.
- **contexto'** (c'): El nuevo contexto, modificado a raíz del uso del Asistente , el código modificado, un commit, documentación actualizada, un deployment, etc.

Ya con esta base, y de nuevo de forma simplificada, podemos decir que una secuencia de interacciones se representa de esta forma:

```
f(m,c,p₁) = c'
f(m,c',p₂) = c''
f(m,c'',p₃) = c'''
...
```

Donde el contexto va mutando a medida que alimentamos al Asistente con diferentes prompts para el modelo y este "echa código" y/o ejecuta otras acciones. Esta secuencia podría representar lo que conocemos como una sesión.

Por otra parte podemos decir que *contexto'* es igual a *contexto* inicial más las alucinaciones que el Asistente aplicó sobre el mismo, positivas (*a₊*) o negativas (*a₋*). Si estas alucinaciones agregan o quitan LOCs es irrelevante en este momento. Entonces:

```
c' = c + ∑ a₊ + ∑ a₋
```

Por lo que, con una simple sustitución:

```
f(m,c,p) = c + ∑ a₊ + ∑ a₋
```

Y ahora podemos empezar a conectar con el tema del *valor* (*v*). Como las alucinaciones positivas nos agregan valor mientras que las negativas nos lo restan vamos a hacer explícito esto con el símbolo "*-*":

```
v(f(m,c,p)) = v(c) + v(∑ a₊) - v(∑ a₋)
```

Obviamente si las alucinaciones negativas son más que las positivas pues invertimos un montón de nuestro tiempo, generación de tokens, uso de GPUs y electricidad para poco o nada.

**PERO**, la "fórmula" anterior está incompleta, porque determinar si una alucinación es positiva o negativa tiene un costo no trivial. Más aún, descartar, rechazar, corregir las alucinaciones negativas se suma al costo de detectarlas, por esto:

```
v(f(m,c,p)) = v(c) + v(∑ a₊) - v(∑ a₋) - k(∑ a₋)
```

Donde *k(∑ a₋)* es el costo de detectar y remover las alucinaciones negativas porque nosotros solo queremos quedarnos con las alucinaciones positivas. Porque al final queremos aproximarnos lo máximo posible a:

```
f(m,c,p) = c + ∑ a₊
```

Que debido a que [La Alucinación es el Feature Fundamental de los LLMs](/2025/10/20/la-alucinacion-es-el-feature-fundamental-de-los-llms/) es no-trivial y siempre tendrá un costo asociado.

Obviamente no pretendo que esto sea un modelo matemático real, sino un artefacto  que nos ayude a entender el *sistema* que estamos operando en esta búsqueda de tener una aproximación sistemática y metódica, que *tienda* a producir código de calidad de forma repetible.

Más sobre este "sistema" y cómo podemos operarlo en el próximo post de la serie [Una Visión de Sistemas para la Programación Asistida por IA](/2025/11/03/una-vision-de-sistemas-para-la-programacion-asistida-por-ia/).

---
## Otros artículos de la serie

1. [La Alucinación es el Feature Fundamental de los LLMs](/2025/10/20/la-alucinacion-es-el-feature-fundamental-de-los-llms/)
3. [Una Visión de Sistemas para la Programación Asistida por IA](/2025/11/03/una-vision-de-sistemas-para-la-programacion-asistida-por-ia/)
4. [Steering - Favoreciendo las Alucinaciones Positivas en los Asistentes de Programación](/2025/11/06/steering-favoreciendo-las-alucinaciones-positivas/)
5. [Backpressure - Rechazando las Alucinaciones Negativas en los Asistentes de Programación](/2025/11/26/backpressure-rechazando-las-alucinaciones-negativas/)