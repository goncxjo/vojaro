# vojaro

La solución se separa en dos principales proyectos:
- vojaro.api: backend (C#.Net Core 5)
- vojaro<span>.web: frontend (Angular 13)

<br />

## Primeros pasos
A continuación, detallamos cómo correr la solución en su totalidad:

<br />

### vojaro.api
Para el caso del backend, correr el proyecto desde Visual Studio, accediendo mediante el puerto indicado en `vojaro.api\Properties\launchSettings.json`. Por default, la URL asignada será `https://localhost:44394/api/public`

**En caso de utilizar Visual Studio Code** (suponiendo que se toman los valores por default), es probable que la url predeterminada sea `https://localhost:5001/api/public`.

<br />

### vojaro<span>.web
Para el caso del frontend, hay que abrir una terminal y ejecutar el comando `npm start` en la carpeta `vojaro.web\ClientApp`. Por default, la URL asignada será `http://localhost:4200`

<br />
