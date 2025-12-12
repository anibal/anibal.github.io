---
title: Backpressure - Rechazando las Alucinaciones Negativas en los Asistentes de Programación
draft: false
tags:
  - asistentes-de-programación
  - alucinaciones-negativas
  - código
  - backpressure
date: 2025-11-26
journal: Website
journal-date: 2025-11-26
slug: backpressure-rechazando-las-alucinaciones-negativas
---
En esta quinta y última entrega de la serie "Principios Fundamentales para el uso de Asistentes de Programación" vamos a reconciliarnos, incluso a abrazar el hecho de que no importa cuántas instrucciones y ejemplos (*steering*) le entreguemos a un LLM, no existe forma de que este no genere código que no sirve, es decir: alucinaciones negativas.

En artículos anteriores de esta serie establecimos que [las alucinaciones son el feature fundamental de los LLMs](/2025/10/20/la-alucinacion-es-el-feature-fundamental-de-los-llms), exploramos [las matemáticas del valor generado por estas interacciones](/2025/10/28/las-matematicas-del-codigo-asistido-por-ia), presentamos [una visión de sistemas para la programación asistida](/2025/11/03/una-vision-de-sistemas-para-la-programacion-asistida-por-ia), y detallamos el [steering como mecanismo para favorecer las alucinaciones positivas](/2025/11/06/steering-favoreciendo-las-alucinaciones-positivas).

Ahora vamos a definir **Backpressure** como el proceso y mecanismos que nos permiten *señalar* al asistente la presencia de alucinaciones negativas que deben ser corregidas *por el sistema*. Y con esto introducimos el feedback loop fundamental que estos sistemas necesitan para que el estado del codebase *converja* hacia las alucinaciones positivas.

**¿Por qué separar el Backpressure y dejarlo solo como una señal?** Porque si ya *alguna parte el sistema* tiene la capacidad de generar el código, agregar la *corrección* a la *detección* genera una *duplicidad* que automáticamente va a comprometer  el Contexto de la tarea sobrecargándolo con información y múltiples responsabilidades.

Desde este punto de vista, los sistemas de tipos, los compiladores, los linters, los test automatizados son todos *mecanismos de backpressure* **determinísticos** que tradicionalmente nos señalan que algo no está bien, es decir no estamos inventando nada nuevo. **En este contexto siempre que podamos atacar un problema de una forma determinística debemos aprovechar esa opción, porque muy eficaz y eficiente**.

Pero en este artículo nos vamos a concentrar en el **proceso** que se basa en el propio LLM que está en el núcleo de los asistentes de programación.

Muchas personas son escépticas en cuanto a la posibilidad de corregir los errores en el codebase introducidos por un asistente con el mismo asistente, y todos nos hemos reído con los memes en este sentido. Y efectivamente uno de los principios fundamentales que yo he propuesto en esta serie es que la probabilidad de que **no** ocurran errores cuando un modelo "echa código" nunca va a ser cero, y entonces lógicamente **usar un modelo para corregir errores tiene implícito introducir nuevos errores**.

**Pero**, si tenemos buenos mecanismos (**determinísticos**) y proceso de backpressure estos deberían reducir el *espacio de solución* de la corrección de errores muchísimo en comparación al proceso original de modificar el código, minimizando la posibilidad de introducir nuevas alucinaciones negativas. Y si aplicamos esta reducción del espacio de solución a través de un proceso iterativo, el sistema *en general debería converger* hacia un estado donde las alucinaciones negativas se minimicen.

Entonces vamos a describir una **I**nteracción (*i*) con un **A**sistente de Programación (*ap*) en un **E**ntorno (*e*) (codebase, etc) con un **C**ontexto (*c*) a través de un **P**rompt (*p*) de la siguiente forma:
 
```
i(ap,e,c,p) = (e',c',r)
```

En la tupla resultante *e'* es el entorno modificado, generalmente con cambios en el codebase, y *c'* es el contexto mutado que llevó a la modificación del entorno original *e* de acuerdo al prompt *p* y una respuesta *r* que la vamos a distinguir de la mutación del contexto.

Ese entorno *e'* puede ser descrito como:

```
e' = e ∪ A₊ ∪ A₋ 
```

Es decir, que el entorno resultante *e'* es igual al entorno sobre el que se aplicó la interacción *i* unido al conjunto de todas las alucinaciones positivas A₊ (que nos dan valor) y al conjunto de todas las alucinaciones negativas A₋ (que nos restan valor).

Ahora, vamos a postular que cualquier prompt puede expresarse mediante la siguiente estructura:

```
p = "Siguiendo las Instrucciones I realiza la Tarea T"
```

Entonces siempre puedo formular una familia de prompts de *backpressure* *p̃* en base a un prompt *p* donde cada uno tiene la forma:

```
p̃ = "Dado que se realizó Tarea T
     siguiendo las Instrucciones I,
     Sigue ahora las instrucciones I'
     para verificar F 
     "
```

Donde *F* es el **F**oco de la verificación, porque el backpressure puede, y debe, aplicarse en múltiples dimensiones. 

Hay dos ejemplos canónicos de *F*, el primero para verificar la *completitud* de la tarea encomendada al *ap*:

```
p̃ = "Dado que se realizó Tarea T
     siguiendo las Instrucciones I,
     Sigue ahora las instrucciones I'
     para verificar QUE LA TAREA SE REALIZÓ EN SU TOTALIDAD
     "
```

El segundo para verificar la *correctitud* de la implementación:
 
```
p̃ = "Dado que se realizó Tarea T
     siguiendo las Instrucciones I,
     Sigue ahora las instrucciones I'
     para verificar QUE LA TAREA SE REALIZÓ SIGUIENDO LAS INSTRUCCIONES
     "
```

La forma exacta no importa, **lo importante es que la formulación implica la detección de una alucinación negativa en alguna de las dimensiones en que estas pudieran haber ocurrido en nuestro entorno y contexto**. Es decir:
 
```
i(ap,e,c,p̃) = (e',c',r)
```

Donde `r ⊆ A₋`, es decir que la respuesta del `ap` al prompt de verificación es un subconjunto de las alucinaciones negativas introducidas en la interacción previa. *r* debería reducir el espacio de solución, darle un foco al *ap* a través de un contexto muy específico donde la detección de error ya ocurrió.

Entonces ahora podemos describir el proceso del backpressure como la secuencia:

```
❶ i(ap,e,c,p₁) = (e',c',r)
❷ i(ap,e',c',p̃₁(p₁)) = (e',c'',r')
❸ i(ap,e',c'',p₂(r')) = (e'',c''',r'')
❹ i(ap,e'',c''',p̃₂(p₂)) = (e'',c'ᵛ,r''')
❺ i(ap,e'',c'ᵛ,p₃(r''')) = (e'',cᵛ,r'ᵛ)
```

El momento ❶ representa la implementación inicial de la tarea T dadas las instrucciones I. Inmediatamente en ❷ aplicamos un prompt de verificación que nos arroja un conjunto de "errores" (alucinaciones negativas) en *r'*.

Esta información es retornada como feedback al sistema (*backpressure*) en ❸ a través de `p₂(r')` que es un prompt formulado para corregir *r'*, pero ya sabemos que esta interacción está sujeta a ser incompleta o errónea y por eso es necesario iterar.

En ❹ volvemos a aplicar un prompt de verificación `p̃₂(p₂)` para determinar qué tan lejos estamos de un estado donde hayamos eliminado las alucinaciones negativas y en ❺ de nuevo aplicamos correctivos.

Como en todo proceso iterativo, tiene que haber una condición de parada, y la realidad es que después de algunas iteraciones el valor de continuar el proceso debería ser marginal, o incluso generar ruido si el prompting no provee un "escape hatch" que permita reportar que todo está "bien".

En este ejemplo hemos estado operando sobre un contexto mutado, esto no es una recomendación, y muchas veces un proceso iterativo como el que describimos sea mucho más eficiente aplicando la familia de prompts `p̃` sobre un contexto limpio.

Y para finalizar pensemos en todos los mecanismos que nombramos al principio, y que pueden y deben ser integrados en este proceso porque aportan mucha información para generar el steering correctivo después de la detección.

---
## Otros artículos de la serie

1. [La Alucinación es el Feature Fundamental de los LLMs](/2025/10/20/la-alucinacion-es-el-feature-fundamental-de-los-llms)
2. [Las matemáticas del Código Asistido por IA](/2025/10/28/las-matematicas-del-codigo-asistido-por-ia)
3. [Una Visión de Sistemas para la Programación Asistida por IA](/2025/11/03/una-vision-de-sistemas-para-la-programacion-asistida-por-ia)
4. [Steering - Favoreciendo las Alucinaciones Positivas en los Asistentes de Programación](/2025/11/06/steering-favoreciendo-las-alucinaciones-positivas)