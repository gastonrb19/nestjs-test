# Test Nestjs 06 marzo
Prueba técnica 06/03/2026 Nestjs/Expressjs

## Descripción
Test Nest.js 06/03/2026
En el siguiente .md encontraras instrucciones para ejecutar el código.

# Pasos para la ejecución de la app
- 0.- instalar las dependencias
- 1.- Correr docker en tu equipo (fijate que este funcionando el demon de docker)
- 2.- utilizar el comando de docker para levantar la imágen en la base del proyecto (Revisar docker sección)
- 3.- correr la aplicación con el comando de ejecución mencionado (Revisar Aplicación sección)
- 4.- Para correr los test, debes parar la ejecución del código y ejecutar los comandos de test (revisar test sección)

### Instalación de dependencias
Ejecutar el comando para instalar las dependencias
- pnpm install 

### Docker
Ejecutar comando para el uso de base de datos pg en docker (.env.example incluido en la raiz del proyecto)
- docker compose up -d

### Aplicación
Ejecutar el comando para utilizar la aplicación
- pnpm run start:dev

### Test
Ejecutar el siguiente comando para correr los test
- pnpm run test 

## Documentación
Se puede revisar la documentación una vez el proyecto esta ejecutandose.

URL
- /api

Full url
- localhost:3000/api
