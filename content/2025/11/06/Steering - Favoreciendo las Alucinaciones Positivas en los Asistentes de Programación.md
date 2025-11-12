---
slug: steering
date: 2025-11-06
draft: true
tags:
  - asistentes-de-programación
journal: Website
journal-date: 2025-11-06
---
En esta cuarta entrega de la serie de Principios Fundamentales para el uso de Asistentes de Programación, está enfocada en el "steering", con lo que me refiero a las prácticas que nos permiten que el un [Asistente de Programación](/2025/11/03/una-vision-de-sistemas-para-la-programacion-asistida-por-ia) favorezca de forma consistente la producción de [alucinaciones positivas](/2025/10/20/la-alucinacion-es-el-feature-fundamental-de-los-llms), alucinaciones que aportan valor a los desarrolladores y a los usuarios de nuestra aplicación.

En esencia el *steering* consiste en crear y mantener el entorno *mínimo indispensable* de *instrucciones* y *ejemplos* (patrones) *alineados* que se integran contexto en el *momento necesario* y *propician* que el modelo genere "buen software".

Aquí tenemos que ampliar nuestra perspectiva del sistema para abarcar tanto el asistente como el código y tooling existente, por que este steering opera en dos dimensiones que son complementarias y alineadas:

- Nuestro propio software y tooling que es nuestro objeto de interés, y...

- Toda la información específica al asistente con el fin de alinearlo mejor con nuestro código y entorno de desarrollo, el ejemplo más conocido y sencillos de esto son los archivos `AGENTS.md` o `CLAUDE.md`

Y la realidad más brutal del desarrollo de software es que **el grueso del código se hereda y de alguna u otra forma hay que vivir con las decisiones del pasado hayan sido nuestras o no**. Y estemos claros de que estamos agregando una nueva dimensión a esta "herencia" y la punta del iceberg es `AGENTS.md` 
## Lo que se hereda no se hurta

Si nuestro código ya sigue buenas prácticas de forma consistente, entonces cuando este código se cargue en el contexto va a servir como un patrón de referencia para el modelo.

Este steering puede ocurrir "naturalmente", porque el asistente siempre va a leer y a cargar código existente en contexto, pero es aún mejor si nosotros lo fomentamos al pedirle de forma explícita que busque ejemplos dentro del código y que los analice antes de planificar o moverse adelante con alguna tarea.

Como política es útil favorecer cambios al código que no solo tengan un impacto positivo *inmediato*, sino que sirvan como retroalimentación positiva al sistema y que en el futuro ayudan a favorecer nuestras necesidades. 
## La espiral descendente del Vibecoding

Ni que decir que si nuestro código no sigue buenas prácticas, no es consistente o tiene deuda técnica no explícita y no atendida, su sola presencia en el contexto es un driver potente para continuar en una espiral descendente de calidad en cada generación.

Y esta es la explicación de por qué a medida que los proyectos "vibecoded" crecen tienden a colapsar bajo el efecto compuesto de todas las malas prácticas, practicas contradictorias y errores, llegando a un punto donde no importa cuanto código se agregue es imposible reconciliarla toda esta mala herencia en algo que funcione.

**Aclaratoria**: Cuando Karpathy acuña el término "Vibecoding" se refiere a software desechable, del tipo prueba de concepto (PoC), que permite explorar una idea y del que no se espera un uso ni desarrollo continuado en el tiempo.
## Mientras tanto del lado del Asistente

El steering está distribuido entre todos estos artefactos que son específicos a los asistentes. En la lista a continuación algunos son específicos a Claude Code que es el sistema con el que tengo más experiencia, pero muchos están en el roadmap otras compañías o pueden ser emulados de diferentes formas, en particular *sub-agentes* y *skills*:

| Artefacto       | Definición y problemas asociados                                                                                                                                                                                                                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `modelo`        | Los modelos son entrenados, reforzados, destilados, fine tuneados, etc y entre sus capacidades como *generalistas* está  desarrollar software en sus diferentes dimensiones; **pero todo este proceso sigue siendo limitado, sujeto a sesgos y a una fecha de corte para su conocimien                                         |
| `AGENTS.md`     | `CLAUDE.md` o `WHATEVER.md` se mantienen como un estándar para dar instrucciones específicas  a los asistentes en la dirección en que nosotros creemos que es la mejor forma de desarrollar software; **pero es un solo archivo, tiende a volverse monolítico, y no es contextual a diferentes tipos de                        |
| `dir/AGENTS.md` | Ofreció una primera aproximación a *contextualizar* las instrucciones para el  asistente en base a la jerarquía de directorios; **el problema es que la organización de los archivos no necesariamente hace match con las diferentes tareas, y la lectura de estos archivos no es deter                                        |
| `/commands`     | Son prompts almacenados por ser frecuentemente utilizados y que invocamos de forma explícita mediando un atajo `/nombre-del-comando`, nos ahorran repetir instrucciones y pueden ser orientados a la tarea; **sin embargo somos nosotros quienes tenemos que                                                                   |
| `SKILL.md`      | Hasta donde sé son únicos a Claude Code, y permiten dar acceso al asistente a un sistema estructurado de conocimientos bajo el principio de "*progressive disclosure*" aka diferentes niveles de profundidad; **suena bonito, es potente y muy lejos de ser triviales de c                                                      De nuevo un feature único a Claude Code, creo, permite *que el agente en el main-thread* **delegue** *tareas específicas* a diferentes agentes con sus propios contextos aislados; **permite una ejecución autónoma pero agrega la complejidad de la *orquestración*, al esfuerzo de definir los agentes y mantenerlos.***  s.* **  s.* **  s * **  |

Esto nos da una visión mucho más granular del sistema de contexto on-demand en el que se apoya un asistente, y nos revela un nuevo nivel de complejidad en nuestro objetivo de *generar* software de calidad de una forma repetible y mejorable en el tiempo.

Esto sucede porque el desarrollo de software implica una diversidad de tareas en diferentes contextos, arquitectura, diseño, QA, etc, "programar" es una simplificación muy básica de lo que significa desarrollo de software. Todos estos artefactos mencionados anteriormente obedecen a diferentes estrategias para construir una aproximación a este proceso complejo de transformar una idea en algo que le da valor a los usuarios.
## La nueva tarea

Entonces nuestro trabajo no solo consiste en determinar cuál es la mejor combinación de instrucciones, ejemplos, "textos", distribuidos entre los diferentes artefactos, que alimentan el **contexto** para que el proceso de inferencia tienda a generar **alucinaciones positivas**; sino que adicionalmente nos enfrentamos al desafío de refinar este sub-sistema para mantenerlo alineado con el código y que cada vez sea más eficiente.

El primer caso es obvio, pero el segundo no tanto, aquí un ejemplo sencillo: Actualizamos de una forma *significativa* una dependencia en nuestro proyecto, y si no actualizamos los artefactos de soporte para el asistente entonces el código generado, las alucinaciones, van a sufrir un bias hacia la versión de la librería que teníamos en el pasado introduciendo errores ([alucinaciones negativas](/2025/10/20/la-alucinacion-es-el-feature-fundamental-de-los-llms)).

## Revisemos el valor de la alucinaciones

Vamos a crear una nueva versión de la "fórmula" del valor de las interacciones con el asistente que introdujimos en Las matemáticas del Código Asistido por IA donde `v(i(ap,e,p))` representa:

- El valor (*v*) que nos da...
- Una interacción (*i*)... 
- Con un asistente de programación (*ap*)...
- En nuestro entorno (*e*)...
- Con el  prompt (*p*)

 Y es igual a:
 
  - El valor (*v*)...
  - Del entorno anterior (*e*)...
  - Más el valor de la suma del valor todas alucinaciones positivas  v(∑a₊)...
  - Menos la suma del valor de todas las alucinaciones negativas `v(∑a₋)`
  - Menos el **costo** (*k*) de detectar y rechazar las alucinaciones negativas `k(∑a₋)`

Es decir:

```
v(i(ap,e,p)) = v(e) + v(∑a₊) - v(∑a₋) - k(∑a₋)
```

**Pero** ya descubrimos que el steering *no es gratuito*, que implica mantener un sub-sistema nuevo, por lo tanto podemos decir que:

```
v(f(ap,e,p)) = v(e) + v(∑a₊) - k(∑a₊) - v(∑a₋) - k(∑a₋)
```

Donde `- k(∑a₊)` es el costo (negativo) de "*promover*" esas alucinaciones positivas, que llamamos *steering* y que acabamos de entender que tiene un costo no-trivial. De nuevo, esto no pretende ser una formulación matemática sino un mecanismo que nos ayude a sistematizar nuestra aproximación a estas herramientas.

## En conclusión

No hay **una** solución buena para esto, siempre hay un tradeoff, y en los extremos está la persona que ignora por completo los artefactos y que prompt a prompt revisa el resultado y acepta o rechaza las alucinaciones; y en el otro extremo está la persona que se dedica a componer los diferentes artefactos para maximizar al autonomía y eficiencia del sistema.

Como después de muchísimos años como manager aún estoy lejos de ser programador, yo le estoy apostando a la segunda, que es bastante más compleja y cuyo ROI aún están por verse.

En el próxima entrega vamos a enfocarnos en entender qué significa detectar y rechazar las alucinaciones negativas (`- k(∑a₊)`) a lo que a mi me gusta llamar **backpressure**.