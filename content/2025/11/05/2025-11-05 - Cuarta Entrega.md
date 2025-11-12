---
draft: true
tags:
  - 
date: 2025-11-05
journal: Website
journal-date: 2025-11-05
---
En el artículo previo de esta serie describimos un Asistentes de Programación, como un sistema conformado por entorno, usuario, modelos, herramientas y contexto con un flujo que conecta estos sub-sistemas y explica como el prompt de un usuario desencadena una serie de transformaciones que tienen como resultado agregar una nueva funcionalidad, corregir un bug u optimizar el rendimiento por nombrar algunas de las tareas más comunes que estamos delegando en herramientas como Windsurf, Codex, Claude Code o Gemini CLI.

El problema es que el modelo anterior no incluye ningún mecanismo que nos permita maximizar la posibilidad de que se generen alucinaciones positivas, ni de rechazar las negativas, porque partimos de que las alucinaciones son el feature fundamental de los LLMs que están en el corazón de los Asistentes de Programación.

En este artículo nos vamos a enfocar en el *steering*, no en que son los mecanismos y prácticas que nos permiten promover las las alucinaciones positivas y por consiguiente minimizar las negativas. 

Históricamente la primera práctica de steering práctica que implementamos fue el Prompt Engineering, y esto empezó con los primers experimentos de gente copiando y pegando código desde su IDE ChatGPT. La necesidad de escribir buenos prompts sigue vigente pero como ya sabemos que esto es un sistema entonces tenemos muchas más partes móviles.

Pero los dos elementos que tienen el mayor impacto sobre la calidad de las alucinaciones de nuestros modelos son el **contexto**, incluye los prompts del usuario, y el **entorno**, lo demás es accesorio.

La característica más importante del contexto es que es limitado, y que mientras más información contenga menos útil 


---

## Modelos

No tenemos incidencia real sobre la data de entrenamiento y proceso de reforzamiento, el proceso de destilación y/o fine-tuning en la práctica tenemos dos intervenciones en este aspecto:

 - **Escoger el modelo que queremos que el sistema utilice para el proceso de inferencia**, y esta decisión tiende a ser económica y asociada al costo por token de los modelos disponibles en el sistema. Mientras "mejor" el modelo, su costo por token tiende a ser superior y nuestros créditos rinden menos.
 - **El "budget de razonamiento" que queremos darle al modelo**, y esta si es una decisión que potencialmente incide en la calidad de la respuesta y cada casa le un nombre distinto. 

### Heurísticas

* **Por omisión tu modelo debe ser el mejor modelo disponible**, tu tiempo siempre es más costoso que la generación tokens.
* **Métele thinking budget a las tareas de planificación**, ya sean implícitas como el "planning mode" de Claude Code o explícitas como cuando prompteamos la creación de un documento con un plan, ese costo se paga aguas abajo.
## Herramientas

Las herramientas que permiten que los asistentes obtenga información del entorno y que lo modifique se dividen en dos grandes categorías.

* **Las "propias" del sistema**, por ejemplo `bash tool` que permite ejecutar comandos en una sesión persistente la terminal, `text editor tool` que permite modificar partes de un archivo o `web fetch tool` para recuperar el contenido de una página en internet (estoy tomando como referencia el tooling del Claude Code SDK), el modelo tiene la capacidad de usar estos tools sin la necesidad de que nosotros hagamos nada. 
* **Los MCPs**, *Model Context Protocol*, exponen servicios de terceros a través de una descripción de capacidades y sintaxis extendiendo las capacidades con habilidades. Unos de los más famosos fue Context 7 que en su momento fue la alternativa indispensable para que los modelos tuvieran acceso a docs actualizados sin los problemas asociados a una búsqueda "genérica" en internet. 

En ambo casos tenemos dos opciones, la primera es favorecer su uso, incluso nombrándolas de forma explícita en nuestros prompts. Otra menos obvia es *restringir* su uso, que puede ser realizado de forma explícita en el caso de los sub-agentes de Claude Code o de nuevo a través del prompting. 

¿Cómo puede ser útil prevenir el uso de una herramienta? Imagina que forkeo una biblioteca (librería) y que le pido al asistente que cree una documentación en base al código, 

---

Los modelos que se utilizan en los Asistentes de Programación son modelos generalistas cuyo entrenamiento incluye código y arquitectura, capacidades multi-modales, lo que les permite entender diagramas y screenshots y caen en tres grandes categorías:

- **SOTA**: Entre los más nombrados tenemos Claude Sonnet 4.5 de Anthropic, GPT‑5 de OpenAI y Gemini Pro 2.5, cada uno tiene sus favoritos y sus detractores. En general Sonnet 4.5 es el modelo referencia en benchmarks.
- **"Los Chinos"**: Modelos de pesos abiertos de laboratorios chinos, probablemente destilados de SOTAs y que están tuneados para agentic coding. Ejemplos son Kimi K2 de Moonshot o GLM 4.6 de Z.ai, le llegan muy cerca en los SOTAs en los benchmarks, pero a una fracción *muy* pequeña del costo.
- **Fine Tunings de Pesos Abiertos**: Recientemente Cursor y Windsurf lanzaron sus propios modelos, Composer y SWE-1.5 respectivamente, y se ha sugerido que son modelos fine-tuned de "Los Chinos". Lo interesante de estos modelos es que su propuesta de valor está más orientada a ser modelos rápidos que promuevan el estado de flow del humano a cargo en el IDEA, y no en su ejecución independiente.

Obviamente es poco el control que tenemos nosotros en el entrenamiento, destilamiento y refinamiento de los modelos y hay dos grandes palancas que podemos 


| Sub-SIstema | Steering                                                                                                                    |
| ----------- | --------------------------------------------------------------------------------------------------------------------------- |
| Modelo      | Entrenamiento, y en particular tuning para el uso de herramientas y el desempeño "autónomo" dentro de un "agentic harness". |
| Contexto    | Prompt del Sistema                                                                                                          |
|             |                                                                                                                             |
