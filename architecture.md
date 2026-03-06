# Análisis y debug arquitectura
Parte 2 (análisis y debugging)

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