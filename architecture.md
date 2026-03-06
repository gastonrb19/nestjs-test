# Analisis arquitectura
## Arquitectura empleada por capas
- La arquitectura utilizada es simple y limpia. Común en el desarrollo de api rest con Nestjs.
Lo cual permite escalar de manera adecuada y a su vez comprender el código.

## Modularidad
- Nestjs y el modelo empleado por defecto permite ordenar mediante entidades, controladores, servicios y entidades
Lo cual adecua el proyecto a una arquitectura modular y ordenada.

## Dependency injection
- Como mencione anteriormente el hecho de utilizar modularidad ayuda al orden del proyecto, pero a su vez entrega la capacidad de
realizar inyección de depedencias. Lo cual nos permite escalabilidad y flexibilidad en el código.

## Capa de servicio
- Mediante la capa de servicio se permite la reutilización de código, además de evitar el boilerplate, como también
introducir mayor orden al código.

## Decoradores
- Facilita la lectura del código y a su vez integra funcionalidades.

## Capa Data transfer object (DTO)
- La capa mencionada (DTO) facilita la transferencia y limitación de los objetos enviados vía http.
Ya que, solamente aceptara los campos esperados e ignorará los que no corresponden. 
Como también asegurara que los tipos de datos sean los correspondientes establecidos
A esto se le agrega class validator, lo cual acrecenta mediante decoradores la validación de los campos esperados.

## Capa controlador
- La capa mencionada establece contacto entre el usuario final que envia la petición http y el servicio.
Integrando la capa de DTO, lo cual permite como se menciono anteriormente filtrar los datos correspondientes.
Este controlador se comunica con la capa de servicio, la cual genera una solicitud a la base de datos mediante el entity.

## Posible escalabilidad
- Además de las capas y filtros mencionados se podrían agregar más funcionalidades que vienen integradas con el framework nestjs.
- Guards para la autenticación, pipes para la conversión y validación de datos de parametros, como también middlewares para funcionalidades intermediarias entre la solicitud y respuesta http.


