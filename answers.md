# * Parte 1 (Preguntas teoricas) *
# 1.- Explique la diferencia entre Middleware, Guard, Interceptor y Pipe en Nestjs 
- La diferencia entre estas son el acceso a los recursos especificos.

Middlewares se ejecuta antes que todo, incluso que el controlador.

El guard se ejecuta posterior al middleware y antes del handler
Y el interceptor se debe indicar, ya que puede ser después o antes del handler.
Por otro lado también hay que tener en cuenta que cada uno de estos tiene una funcionalidad mas común y especifica.

Middleware usualmente se utiliza para loggins, parsear body y otros.

Guards para la autenticación y además roles.
Interceptors Transformación de respuesta, caching y otros.


Pipes se utiliza para la transformación de un tipo de datos y verificar que corresponda.
Por ejemplo en el caso de enviar vía params un id tipo number y verificar que este lo sea,
posterior a esto realizar la transformación o poner un valor por defecto o en su defecto enviar un response correspondiente.


## 2. ¿Como implementaria autorización basada en roles?
- Crearia un enum con diferentes roles, uno de admin y otro de usuario. 
Admin permitiria editar las tareas incluso si no son de ese usuario, y usuario solamente podría editar sus tareas.
Implementaria JWT para la autenticación de los usuarios y el modulo bcrypt para el hash de las contraseñas y salt de estas,
ademas de la validación de que sea correcta la contraseña. 
Realizaría funciones que puedan ser reutilizadas para chequear la contraseña y enviar el token, además de validar este y evitar boilerplate.
Una vez seteada la información anterior crearia dos guards diferentes, uno para jwt y otro para roles. 
El de jwt verificara que el token sea correcto y que exista. Por otro lado el segundo guard verificara que este permitido el acceso al recurso según el rol.

## 3. ¿Que problemas aparecen cuando un backend crece mucho y como nestjs ayuda a resolverlos?
- Falta de modularidad, además de evitar boilerplate, también desorden en el código y confusión al leerlo.
- Facilidad en las pruebas unitarias

## 4. ¿Como manejaría configuración por ambiente (development, staging, production) ?
- Crearia 3 diferentes archivos .env, los cuales seran utilizados solamente si corresponde el tipo de variable en la app.
- Estos 3 env tendrán las credenciales según el ambiente correspondiente. 

## 5. ¿Cómo evitaría que dos usuarios compren el último producto disponible al mismo tiempo?
en caso de dos usuarios comprando el mismo artículo agregaría una columna locking en la base de datos, 
la cual ante el momento de seleccionar un producto de un usuario "x" lo bloquee hasta que su carro o su tiempo de compra expire.
Con el fin de que otro usuario no pueda seleccionar el mismo producto y tener conflictos.

# *PARTE 2 (analisis y debugging)*

## Problema número 1
Falta de constructor en el private orders.

## Problema número 2
Poca integridad en los datos ante la falta de un motor de base de datos y herramientas para alojar la información. Ante una eventual excepción no controlada por la aplicación esta puede terminar perdiendo la información recaudada.

## Problema número 3
Falta de DTO, lo cual permite envio de información erronea o inadecuada.

## Problema número 4
Capa de controlador inexistente, lo cual conlleva a una baja escabilidad y orden del código. 

## Problema número 5
Falta de manejo ante inmminentes errores, perjudicando el usuario final, ya que aunque nestjs maneje los errores los mensajes no entregaran la claridad esperada.

## Refactorización del código
1.- Aplicaria uso de un motor de base de datos, además de un ORM que pueda manejar la transacción de estos datos con el fin de tener integridad en los datos.

2.- Utilizaría constructores en el servicio detallado con el fin de utilizar la misma clase/objeto instanciado en la transacción y no crear una cantidad inadecuada de instancias que puedan realizar mayor gasto de recursos. 
 
3.- Implementaria DTO con el fin de tener claridad y restringir a su vez que no se envien datos erroneos.

4.- Ante cierta falta de contexto entro en la suposición de que no existe una capa de controlador. La cual puede reutilizar, filtrar y entregar una mayor orden al proyecto, el cual al momento de escalar o leer el código facilite las tareas mencionadas.

5.- Manejaría las posibles excepciones que se ven en el código escrito. Ya que ante una posible creación puede existir un error si en la base de datos el registro ya es existente, como también al realizar el update puede que no exista dicho registro. 
Con el chequeo de este se podría manejar una supuesta excepción, como también ahorrar recursos.

6.- Reutilizaría métodos, crearía un método para chequear si existe un registro mediante el filtro adecuado, el cual posteriormente reutilizaría en la misma clase para ahorrar código y boilerplate

# * Diseño de arquitectura (PARTE 4) *

## 1.- Como escalaria esta API para soportar 1000 request por segundo ?
## 2.- Que cambios haria si el sistema creciera a millones de tareas
(Respondo ambas en conjunto, ya que este crecimiento afectaria ambos casos)
- en primera instancia cambiaria el framework base de express a fastify, este entrega una mejorq de rendimiento que puede ser de gran impacto en escala.
- utilizaría doctorjs para identificar los modulos que mantienen una mayor cantidad de uso.
- integraria un load balancing, limitando la cantidad de solicitudes por minuto según la dirección ip.
- implementaria redis para el cache, utilizando este para las consultas costosas a la base de datos y reutilizando dicha información.
- Finalmente utilizaría el módulo de threads, el cual permite utilizar una mayor cantidad de hilos, ya que nodejs se ejecuta en un solo hilo. Dando mayor cantidad de recursos para ejecutar información 

## 3.- Como implementaría autenticación JWT en este sistema
Utilizaria en primera instancia bcrypt, para guardar la contraseña en hash en la bd.
Posterior a esto realizaria la comparación del string enviado por el usuario y el hash en mi bd.
En caso de que este sea correcto haría la firma del JWT y lo enviaría vía http en el header
Realizaria un modulo, el cual tenga las funcionalidades y el guard para la autenticación.
Ademas de las funcionalidades de firma, chequeo de password y el chequeo del jwt cuando sea enviado.

## 4.- Como manejaria procesamiento asincronico para tareas pesadas
- utilizaria bullMQ para el procesamiento asincronico de tareas pesada.
Distribuyendo así la cantidad de información procesada y reiniciando en caso de fallas.


