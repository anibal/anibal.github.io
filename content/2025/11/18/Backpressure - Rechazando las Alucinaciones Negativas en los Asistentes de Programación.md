---
draft: true
tags:
  - 
date: 2025-11-18
journal: Website
journal-date: 2025-11-18
slug: backpressure-rechazando-las-alucinaciones
---
En Esta quinta y última entrega de la serie de Principios Fundamentales para el uso de Asistentes de Programación nos vamos a reconciliar, incluso a abrazar el hecho de que no importa cuantas instrucciones y ejemplos, steering, le entreguemos an un LLM este continuará generando código que no sirve.

Y este comportamiento de los asistentes es completamente normal, aunque no sea lo ideal, porque la alucinación es el feature fundamental de los LLMs en el núcleo de los mismos y la probabilidad de que generen una alucinación negativa, código que resta valor, nunca será cero.

Entonces en vez de frustrarnos porque el asistente "está perdido", o "no nos entiende", que al final es antropomorfizarlo, sencillamente tenemos que entender que esto es un llamado de atención para profundizar en nuestra visión de estas aplicaciones como sistemas y agregar de forma sistemática la pieza faltante: el backpressure. 

En su forma más sencilla el backpressure como los mecanismos que nos permiten al asistente la presencia de alucinaciones negativas que deben ser corregidas *por el sistema*. Y con esto consolidamos la necesidad de integrar un feedback loop en estos sistemas.

Desde este punto de vista, los sistemas de tipos, los compiladores, los linters, los test automatizados son todos sistemas de backpressure, es decir que ya eran parte nuestras procesos y herramientas.

## Human-in-the-loop

Por otra parte cuando empezamos a usar la auto-completación basada en LLMs, la forma más sencilla de asistencia, y aún hoy en día la más popular, *nosotros* nos convertimos en el mecanismo fundamental de backpressure, aceptando y rechazando sugerencias. Una forma de *human-in-the-loop* (HITL). 

Ahora, esta primera aproximación es fundamentalmente limitada porque un asistente es capaz de generar código 7x24, sin que su rendimiento se vea afectado por el uso, lo que nos convierte en un cuello de botella e implica que *cualquier ganancia derivada del uso de LLMs sea lineal en función de la cantidad de humanos ejerciendo el backpressure, así el mismo comportamiento para el costo asociado*. 

Adicionalmente esta aproximación es **pobre**, porque no hay un impacto positivo en el sistema más allá de corrección inmediata, si acaso una colección estadística asociada al asistente de turno para efectos de posteriores entrenamientos.

## "Si lo repites tres veces..." 

Un antigua máxima entre los desarrolladores de software es que si te encuentras haciendo la misma tarea tres veces entonces llegó el momento de automatizarla. Si tomamos esta recomendación en el contexto del *human-in-the-loop*, como lo acabamos de plantear, y nos encontramos con que que por tercera vez tenemos nosotros que **rechazar** el mismo artefacto, tipo de artefacto o estilo de artefacto de programación, entonces toca automatizar.

La lógica no dice que debemos ir aguas arriba en el sistema, preguntarnos cuál es el ajuste indispensable que podríamos hacer en el sistema para minimizar la posibilidad de que el LLM vuelva a generar este error, es decir ajusta el steering para favorecer reemplazar esta alucinación negativa con una positiva.

Un ejemplo trivial es cuando nuestra codebase sigue un estilo que puede estar reñido con la práctica promedio con la que se entrenó al modelo subyacente en el asistente y agregamos en algún `AGENTS.md` una instrucción en el estilo "*cuando hay que hacer X entonces hazlo de esta manera...*"

Lo otro que podríamos hacer es agregar algún tipo de validación automática para que la detección del anti-patrón sea automática y que no dependa de nosotros, por ejemplo ajustando una regla en un `linter`. Dependiendo de cómo sea nuestro proceso esto va a dar más o menos valor, pero para multiplicar el impacto de este tipo de automatizaciones toca ir al siguiente nivel y...

## Combatir fuego con fuego

La idea de que puedes usar un LLM para detectar y corregir los errores generados por un LLM sistemáticamente ha sido menospreciada, pero esto no solo es posible sino que funciona, y es solamente natural si nosotros vemos el desarrollo de software "tradicional" como un sistema que tiene ciclos de realimentación como ya afirmamos antes.

En un proceso saludable, el código nunca va a directo a producción sin pasar por un code review, entre otros procesos. En general eso no debería dejar de pasar, y es el mínimo de fricción que un human-in-the-loop debería proporcionar al sistema. <- BUENO, PERO REVISAR

Si describimos una serie de interacciones (*i*) con un Asistente de Programación (*ap*) de la siguiente forma:

```
i(ap,e,p₁) = e'
i(ap,e',p₂) = e''
i(ap,e'',p₃) = e'''
...
```

Donde *e* es el entorno, que abarca nuestro codebase y tooling, y *pᵢ* representa una serie de prompts de la forma:

```
pᵢ = "Siguiendo las instrucciones I realiza la tarea X" 
```

Entonces podemos decir que *p̃ᵢ* representa un prompt de la forma: 

```
p̃ᵢ = "Siguiendo las instrucciones Ĩ, 
      verifica que la tarea X haya sido realizada
      siguiendo las instrucciones I
```

De nuevo, no pretendo que esta formulación sea matemáticamente exacta, sencillamente la estoy usando como un mecanismo para facilitar la comprensión de los conceptos, tampoco se trata de un prompt de referencia. Si adicionalmente decimos que el estado *e'* es igual al esta anterior más las alucinaciones positivas *a₊* y las negativas *a₋*:

```
e' = e + a₊ + a₋
```

Entonces  podemos describir el mecanismo de backpressure basado en human-in-the-loop como la secuencia:

```
i(ap,e,p₁) = e + a₊ + a₋
i(ap,e',p̃₁) = e + a₊
i(ap,e'',p₂) = e' + a₊ + a₋
i(ap,e',p̃₂) = e' + a₊
...
```

Donde vemos como podemos sistematizar el uso de asistente para validar lo que este generó a través de un prompts nuevo. 

En esta formulación simplificada omitimos el contexto del modelo, que puede ser usado o no. Si le apuesto a aprovechar el contexto existente podría formular un prompt *p̃*  de la siguiente forma:

> Y ahora que ya realizaste la tarea X, y con el conocimiento que ya tienes, qué pudieras haber hecho mejor?

Lo que algunas personas llaman un prompt *reflexivo*, en caso contrario podemos limpiar el contexto y promptear de la siguiente forma:

> La tarea X acaba de ser realizada siguiente las instrucciones I, de una forma sistemática y metódica, con gran cuidado por el detalle revisa el resultado.

Incluso podemos usar un `git diff`, porque *Δ = e'- e*,  como una herramienta para este tipo de prompting, pero ya esto escapa de los principios fundamentales y entra en el ámbito de la aplicación práctica de estos.

## Las dimensiones del backpressure 


[ ] El code review como proceso de aprendizaje -> 



## 


