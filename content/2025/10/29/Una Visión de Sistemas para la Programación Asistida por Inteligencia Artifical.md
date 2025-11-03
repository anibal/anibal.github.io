---
draft: true
tags:
  - sistemas
date: 2025-10-29
journal: Website
journal-date: 2025-10-29
slug: una-vision-de-sistemas-para-la-programacion-asistida-por-inteligencia-artificial
---
En nuestro segundo artículo en la serie, [Las matemáticas del Código Asistido por IA](/2025/10/28/las-matematicas-del-codigo-asistido-por-ia), dijimos que de una forma simplificada una interacción con un Asistente de Programación podía ser expresada como:

```
f(modelo,contexto,prompt) = contexto'
```

Vamos a iterar sobre esta simplificación, y acercarla un poco más a la realidad de sistemas los sistemas actuales como Claude Code, Gemini CLI, Github Copilot, etc diciendo que:

```
f(a,h,e,c,p) = (a ∨ a', h ∨ h', e ∨ e', c v c' )
```

Donde la ∨ es una disyunción lógica, un "*or*" lógico, de nuevo esto no pretende ser un modelo matemáticos preciso sino una herramienta útil para una primera aproximación sistemática. En la tupla resultante debe haber al menos una mutación de las variables de entrada, y el prompt como tal no es parte del resultado. Vamos al detalle de las entradas:

- **a**: Todo lo que comprende el **Asistente de Programación**, esto generalmente incluye uno o más modelos (LLMs), un sistema de agentes propio, prompts del sistema, alguna forma de UI, típicamente un IDE, un TUI o una interfaz web.
- **h**: Son las **Herramientas** disponibles al asistente (**a**) para 
	- Acceder al entorno (**e**), por ejemplo leer unas líneas de un archivo, listar el contenido de un directorio, buscar en internet
	- Transformar el entorno (**e**), típicamente editar un archivo, o ejecutar un comando que tiene un side efect en sistema de archivos `git commit` o un `rm`
- **e**: El **Entorno** sobre el que el asistente (**a**) puede operar las herramientas (**h**), esto generalmente comprende algún tipo de sistema de archivos local o en la nube, y acceso a internet.
- **c**: El **Contexto** de la sesión que incluye toda la secuencia de prompts (**p**) junto con las respuestas que se han obtenido, y muy importante las invocaciones y respuestas de las de las herramientas (**h**) que se traducen en información sobre el entorno (**e**) y/o el resultado de las modificaciones sobre el el mismo, el resultado textual de mecanismos de razonamiento y los reportes de los sub-agentes si estos son soportados por la arquitectura del asistente (**a**).
- **p**: Nuestros **Prompts** para el Asistente (**a**)

Entonces, cuando "prompteamos" (**p**) al contexto (**c**) de un Asistente de Programación (**a**), que tiene acceso a unas herramientas (**h**), que le permiten leer y modificar el entorno (**e**) esto puede tener como resultado una transformación en el contexto (**c'**), y/o una transformación en el entorno (**e'**), y/o una transformación en las herramientas (**h'**) disponibles y/o una transformación en el agente (**a'**).

Ejemplo:

Le pedimos a nuestro asistente *"Reemplaza todas las ocurrencias de la función 'nombre' por"* y le damos ⏎ antes de completar la frase, maldecimos pero lo dejamos pasar, y eso lo podemos expresar como:

```
 f( a, h, e, c, "Reemplaza... por"  ) = ( a, h , e, c' ) 
```

Y el asistente salva la patria respondiendo *"Con qué quieres que la reemplace?"*, y esto es una mutación en el contexto:

```
 c' = c +  p₁ + "Con qué quieres que la reemplace?" 
```

En este punto el nuevo contexto (*c'*) contiene lo que sea que tuviera *c*, nuestro prompt *p₁* y las respuesta del agente: "Con qué quieres que la reemplace?". Si le respondemos *"Con la función 'alias'"* ⏎ eso sería:

```
 f( a, h, e, c', "Con al... alias"  ) = ( a, h , e, c'' ) 
```

En este punto pasa algo interesante, y es que muy posiblemente el asistente (**a**) que está entrenado para usar herramientas va a hacer algo parecido a "razonar" un plan, y eso se ve como esto:

1. "Primero debo determinar las ocurrencias de la función 'nombre' en el file system"
2. "Para buscar la ocurrencia de textos en archivo puedo usar grep"
3. "Para usar grep tengo que invocar una herramienta"
4. "Y la herramienta se llama' bash_tool', y requiere de estos parámetros"
5. ...

Todo este "razonamiento" y plan terminan en el contexto, entonces 

```
 c'' = c'+ "Primero debo determinar las ocurrencias..." 
```

Por otra parte  '*bash_tool*' es una herramienta ∈ **h** y que el asistente **a** "conoce" porque la descripción de la misma es parte de contexto inicial **c** porque hay unos textos como estos:

- "Eres una asistente... y sabes usar la línea de comando..."
- "Cuando necesites usar la línea de comandos utiliza la herramienta  '*bash_tool*'"
- "La herramienta  '*bash_tool*' acepta los parámetros..."

Es decir que el contexto inicial **c**, no solo **no** estaba vacío sino que tenía un montón de instrucciones en esta onda:

```
c = "Eres un asistente... usas herramientas... 'bash_tool'..."
```

Entonces, **de forma simplificada**, el agente **a** *genera* un texto que es una llamada a la herramienta, que es al final es un nombre de función, un texto, y unos parámetros que que al final van a ser un texto que es un JSON:

```
 f( a, h, e, c'', "bash_tool( 'grep', ... )" ) = ( a, h , e, c''' ) 
```

y **el resultado** de esa llamada, la lista de archivos del código fuente con los números de línea donde se hizo match con "nombre"  termina en el contexto:

```
 c''' =  C''+ "❯ grep -Rniw "nombre" .
./file.ext:7: ... nombre ...
./other_file.ext:218: ... nombre ..."
```

Vamos a brincarnos pasos para llegar al a pieza que nos falta, y es que *eventualmente* el asistente **a** va a generar una llamada a otra herramienta, uno que le permite modificar archivos, imaginemos que se llama 'file_tool' con los parámetros adecuados para que reemplace el texto "nombre" por "alias". 

```
 f( a, h, e, cⁿ, "bash_tool( 'file_tool', ... )" ) = ( a, h , e', cⁿ⁺¹ ) 
```

Pero lo realmente importante aquí es que el uso de este tool, modificó el entorno, en particular el file system al que tiene acceso. Y en la tupla resultante en contexto **e'** tiene todas las ocurrencias de la función "nombre", reemplazadas con "alias". 