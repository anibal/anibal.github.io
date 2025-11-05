---
slug: una-vision-de-sistemas-para-la-programacion-asistida-por-ia
draft: false
tags:
  - llm
  - asistentes-de-programación
  - contexto
  - prompting
  - sistemas
  - steering
  - backpressure
  - procesos
  - flujos
date: 2025-11-04
journal: Website
journal-date: 2025-11-03
---
En el primer artículo de esta serie concluimos [que las **alucinaciones** son *el feature fundamental de los LLMs*](/2025/10/20/la-alucinacion-es-el-feature-fundamental-de-los-llms) sobre los que están construidos los Asistentes de Programación como Claude Code, Cursor, Gemini CLI, Windsurf, etc y que estas alucinaciones pueden ser positivas o negativas según aportan valor a nuestro código o no. 

Por otra parte en el segundo artículo de esta serie, [las matemáticas del Código Asistido por IA](/2025/10/28/las-matematicas-del-codigo-asistido-por-ia),  concluimos que las alucinaciones negativas son inevitables y que hay un costo no-trivial en detectarlas y rechazarlas para que el ROI del uso de estas herramientas se justifique al maximizar las alucinaciones positivas.

Ahora vamos a explorar estos asistentes, y el loop fundamental en el que los usamos, y esto lo exploraremos a través de este diagrama que define varios sub-sistemas y flujos de una forma extremadamente simplificada para enfocarnos en lo fundamental:

![[CleanShot 2025-11-04 at 12.56.59@2x.png]]

Vamos a revisar primero los sub-sistemas:

- **Entorno**: De alguna u otra forma esto involucra un sistema de archivos, local o en un ambiente virtualizado, normalmente con un clon de un repositorio, internet y cualquier otro servicio que pudiera ser útil al **modelo**. Es importante distinguir que aquí hay dos grandes categorías de información:
	- La **intrínseca al problema** que se quiere resolver, el código de interés sobre el que operamos a través del asistente.
	- La de **soporte para el asistente** como los archivos `AGENTS.md` o `CLAUDE.md` 
- **Usuario**: Generalmente se trata de un humano, pero existen múltiples mecanismos para que un Asistente de Programación "use" otro, ya sea vía SDK o línea de comando. 
- **Modelo**: En general un LLM *optimizado para poder utilizar este sistema a su alrededor*. En este momento, y dependiendo de preferencias, estamos hablando de un Sonnet 4.5 (Anthropic), GPT-4o (OpenAI), Gemini 2.5 Pro, Kimi K2 (Moonshoot), GLM-4.5 (Z.ai), etc... o una combinación de diversos modelos en diferentes momentos o incluso un sub-sistema de agentes.
- **Herramientas**: Típicamente se dividen en dos grandes grupos:
	- Las propias del asistente como el acceso al file system, la capacidad de realizar búsquedas en  internet o la capacidad para ejecutar comandos en una terminal
	- **MCPs** (Model Context Protocol) que ofrecen acceso estructurado a servicios de terceros a través de una interfaz estándar. Dos ejemplos muy conocidos son Context 7 (docs) y Playwright (uso de un navegador local). 
- **Contexto**: A efectos prácticos un log de todos los textos escritos por el usuario, generados por el **modelo** y por las **herramientas** que este pudiera haber invocado, es importante tener en cuenta que:
	- El **contexto** no empieza vacío, al menos incluye un *prompt del sistema*, las instrucciones en archivos como `AGENTS.md` o `CLAUDE.md`, descripciones de herramientas disponibles y en el caso específico de Claude Code: `SKILLs` que son una forma de documentación basada en el principio del *progressive disclosure* para "cuidar" el **contexto**.
	- La longitud del **contexto** crece con cada interacción del usuario, con la respuesta de cada herramienta invocada por el modelo y con cada respuesta generada por el mismo.
	- El **contexto** es *limitado* y su tamaño tiene un impacto directo en la capacidad del modelo de prestar atención a lo que es importante y dar respuestas que nos aporten valor, es decir [alucinaciones positivas](/2025/10/20/la-alucinacion-es-el-feature-fundamental-de-los-llms).

Con respecto al **entorno**, como yo parto de la idea de que nada es obvio entonces hay que puntualizar que:

- **A**: Como **usuarios** nosotros podemos consultar directamente el **entorno** en el que opera el asistente, podemos leer archivos, lista directorios, chequear el estado de nuestra copia de un sandbox, buscar en internet. 
- **B**: Adicionalmente, como usuarios nosotros podemos modificar directamente el mismo **entorno**, crear y modificar archivos, hacer un commit, descargar un archivo de internet, instalar una herramienta.

Aquí se empieza poner interesante el tema de nuestro rol como usuarios del sistema porque:

* **C**: Es muy común que podamos seleccionar qué **modelo** queremos correr, o bajo qué condiciones, por ejemplo en el caso de Claude Code activar el "reasoning mode", incluso especificar la famosa opción "*ultrathink*" con el consiguiente consumo de tokens.
* **D**: Nosotros afectamos las **herramientas** disponibles para el **modelo**, y eso va desde qué aplicaciones instalemos nosotros en la terminal, hasta los MCPs que estarán configurados y a qué herramientas intrínsecas le damos acceso al modelo (permisos).

Ahora que ya tenemos cubiertas las bases, un flujo "típico" a través de este sistema podría ser descrito a través de los siguientes pasos que están numerados en el diagrama:

1. Como **usuario** escribo un **prompt**.
2. En términos prácticos, ese **prompt** se agrega al **contexto** ya existente.
3. Se le pasa el control al **modelo**, que va a operar con el **contexto** disponible. Típicamente este puede decidir que necesita información del **entorno** para continuar con la tarea asociada y esto implica usar una o más **herramientas**.
4. El uso de una **herramienta** no es mucho más que "escribir" una llamada a una función que mapea a alguna de las que están disponibles.
5. La **herramienta** se ejecuta, puede tener algún efecto lateral sobre el **entorno**, o solo devolver información del mismo
6. Siempre la ejecución de la **herramienta** va a implicar la actualización del contexto, tanto con la información que pudo haber sido requerida, como el status de la ejecución.
7. Finalmente en algún momento, el **modelo** tomará la decisión de que finalizó la tarea o que necesita más información del **usuario** y actualizará el **contexto** con una *respuesta*.
8. El usuario lee la respuesta del **modelo**, la última entrada en el contexto.

Y el ciclo se vuelve a iniciar en **1.**

De nuevo, *este es un modelo simplificado*. Los puntos claves que nos tenemos que llevar de este artículo son:

- El **asistente** opera en un **entorno**, que solo conoce a través del uso de **herramientas** 
- El **entorno** comprende información que es:
	- Propia del problema que se quiere resolver, aka "nuestro código"
	- Específica al asistente para facilitar su labor
- El **usuario** es parte del sistema
	- Tiene acceso a todo el **entorno**
	- Decide las **herramientas** disponibles al modelo
	- Incluso decide qué **modelo** correr y cómo
- El modelo solo conoce el **contexto**, en el que se agregan:
	- El prompt del sistema
	- Las instrucciones para el asistente (`AGENTS.md`, `CLAUDE.md`,  etc)
	- Los requerimientos del usuario, **prompts**
	- Los resultados de las llamadas a las **herramientas**
	- Las respuestas del **modelo** para el **usuario**

Con esta visión de sistema podemos ver con claridad un nuevo factor que potencia el rol de las alucinaciones en los Asistentes de Programación: **El contexto no solo es limitado, sino que es una representación fragmentaria del entorno construida en base a llamadas a herramientas, en particular del código que es nuestro objeto fundamental de interés**.

Cada invocación de una herramienta para agregar información al contexto, o modificar el entorno, eventualmente reportando al contexto, lo cual va a tener un impacto en la calidad de las alucinaciones que el modelo genera aguas abajo en el proceso de inferencia.

No es suficiente solo pensar en la calidad nuestros prompts, *estos son solo una parte pequeña del contexto*. Nuestra aproximación a estos sistemas tiene que ser **intencional** y es indispensable alinear los diferentes sub-sistemas y procesos que los conectan para *favorecer* las [alucinaciones positivas por encima de las negativas](/2025/10/28/las-matematicas-del-codigo-asistido-por-ia).

En las próximas entregas de la serie vamos a definir dos procesos claves con los que podemos ejercer ese control sistemáticamente para maximizar la generación de valor: el **steering**, cómo guiar al modelo hacia alucinaciones positivas, y el **backpressure**, cómo detectar y rechazar las negativas eficientemente.

Compartido y publicado en: 
- [LinkedIn el 4 de Noviembre del 2025].
- 
