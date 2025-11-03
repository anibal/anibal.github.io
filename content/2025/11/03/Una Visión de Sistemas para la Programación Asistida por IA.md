---
slug: una-vision-de-sistemas-para-la-programacion-asistida-por-ia
draft: false
tags:
  - llm
  - asistentes-de-programación
  - contexto
  - prompting
  - sistemas
date: 2025-11-03
journal: Website
journal-date: 2025-11-03
---
En el segundo artículo de esta serie, [Las matemáticas del Código Asistido por IA](/2025/10/28/las-matematicas-del-codigo-asistido-por-ia/) planteamos una aproximación formal a un modelo muy simplificado de lo que significa el uso de im Asistente de Programación como Claude Code, Cursor, Gemini  CLI, Windsurf, etc cuando desarrollamos software:

```
f(m,c,p) = c + ∑ a₊ + ∑ a₋
```

(Una interacción con un asistente es una transformación que opera sobre un )
Este modelo nos permitió enfocarnos en cuál es el valor del uso de estas herramientas, y de las implicaciones (el costo) de producir este valor, ahora vamos a enfocarnos en proceso desde una perspectiva de sistemas:

![[CleanShot 2025-11-03 at 16.20.01@2x.png]]

Lo primero es que este sistema que describe de forma simplificada el uso de un  "**Asistente de Programación**" está dividido en cinco grandes sub-sistemas:

- **Entorno**: De alguna u otra forma esto involucra un file-system, en el sandbox de un programador o en un ambiente virtualizado, normalmente con un clon de un repositorio, internet y cualquier otro servicio que pudiera ser útil al **modelo**. Incluye información propia del problema que se quiere resolver, el code base; e incluye información específica para el asistente como los archivos `AGENTS.md`
- **Usuario**: Generalmente se trata de un humano, pero existen múltiples mecanismos para que un Asistente de Programación "use" otro, ya sea vía SDK o línea de comando. El valor puede ser cuestionable para complejidad introducida, pero no dejar de ser posible y eventualmente interesante.
- **Modelo**: En general un LLM optimizado para poder utilizar este sistema a su alrededor. En este momento, y dependiendo de preferencias, estamos hablando de un Sonnet 4.5 (Anthropic), GPT-5-Codex (OpenAI), Gemini 2.5 Pro, Kimi K2 (Moonshoot), GLM-4.5 (Z.ai), etc... o una combinación de diversos modelos en diferentes momentos o incluso un sub-sistema de agentes.
- **Herramientas**: Típicamente se dividen en dos grandes grupos, las intrínsecas al asistente como el acceso al file system, la capacidad de realizar búsquedas en  internet o la capacidad para ejecutar comandos en una terminal; y MCPs (Model Context Protocol) que ofrecen acceso estructurado a servicios de terceros a través de una interfaz estándar, dos ejemplos muy conocidos son Context 7 (documentación actualizada) y Playwright (acceso programático a navegadores). 
- **Contexto**: A efectos prácticos un log de todos los textos escritos por el usuario, generados por el **modelo** y las **herramientas** que este pudiera haber invocado, es importante tener en cuanta que:
	- El **contexto** no empieza vacío, al menos incluye un *prompt del sistema*, las instrucciones en archivos como `AGENTS.md` o `CLAUDE.md`, descripciones de herramientas disponibles y en el caso específico de Claude Code: `SKILLs` que son una forma de documentación basada en el principio del *progressive disclosure* para "cuidar" el **contexto**.
	- La longitud del **contexto** crece con cada interacción del usuario, con la respuesta de cada herramienta invocada por el modelo, con cada respuesta generada por el mismo.
	- El **contexto** es *limitado* y su tamaño tiene un impacto directo en la capacidad del modelo de prestar atención a lo que es importante y dar respuestas que nos aporten valor, es decir [alucinaciones positivas](/2025/10/20/la-alucinacion-es-el-feature-fundamental-de-los-llms).

Con respecto al **entorno**, como yo parto de la idea de que nada es obvio entonces hay que puntualizar que:

- **A**: Como **usuarios** nosotros consultar directamente el **entorno** en el que opera el asistente, podemos leer archivos, lista directorios, chequear el estado de nuestra copia de un sandbox, buscar en internet. 
- **C**: Adicionalmente, como usuarios nosotros podemos modificar directamente el mismo **entorno**, crear y modificar archivos, hacer un commit, descargar un archivo de internet, instalar una herramienta.

Aquí se empieza poner interesante el tema de nuestro rol como usuarios del sistema porque desde el punto de vista de las herramientas:

* **B***: Nosotros afectamos las **herramientas** disponibles para el **modelo**, y eso va desde qué aplicaciones instalemos nosotros en la terminal, hasta los MCPs que estarán configurados y a qué herramientas intrínsecas le damos acceso al modelo (permisos).

Ahora que ya tenemos cubiertas las bases, un flujo "típico" a través de este sistema podría ser descrito a través de los siguientes pasos que están numerados en el diagrama:

1. Como **usuario** escribo un **prompt**.
2. En términos prácticos ese **prompt** se agrega al **contexto** ya existente.
3. Se le pasa el control al **modelo**, que va a operar con el **contexto** disponible, típicamente este puede decidir que necesita información del **entorno** para continuar con la tarea asociada y esto implica usar una **herramienta**.
4. El uso de una **herramienta** no es mucho más que "escribir" una llamada a una función que mapea a alguna de las que están disponibles.
5. La **herramienta** se ejecuta, puede tener algún efecto lateral sobre el **entorno**, o solo devolver información del mismo
6. Siempre la ejecución de las la **herramienta** va a implicar la actualización del contexto, tanto con la información que pudo haber sido requerida, como el status de la ejecución.
7. Finalmente en algún momento, el **modelo** tomará la decisión de que finalizó la tarea o que necesita más información del **usuario** y actualizará el **contexto** con una respuesta.
8. El usuario lee la respuesta el **modelo**, típicamente la última entrada en el contexto.

Y el ciclo continua de regreso en **1.**

De nuevo, este es un modelo simplificado y los puntos claves son:

- El asistente opera en un entorno y este comprende información que es:
	- Propia del problema que se quiere resolver, aka "el código"
	- Específica al asistente para facilitar su labor
- El usuario es parte del sistema
	- Tiene acceso a todo el entorno
	- Decide las herramientas disponibles al modelo
- El modelo solo conoce el contexto, en el que se agregan:
	- El prompt del sistema
	- Las instrucciones para el asistente (AGENTS.md etc)
	- Los requerimientos del usuario
	- Los resultados de las llamadas a las herramientas
	- Las respuestas del modelo para el usuario
- El modelo conoce y opera sobre el entorno a través de herramientas

Con estos tres artículos tenemos las bases, en las próximas entrega en la serie vamos definir dos procesos claves con los que podemos incidir en este sistema para maximiar la generación de valor: steering y backpressure.