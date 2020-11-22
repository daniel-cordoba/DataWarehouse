# Data Warehouse - BACKEND
Gestor de contactos para una compañía de Marketing, por medio del cual se administraran los contactos de los clientes para sus campañas.

## Requisitos locales para ejecutar la aplicación 
1. Para que la API REST de Data Warehouse funcione correctamente debe instalar lo siguiente en su ordenador:

    - [NodeJS](https://nodejs.org/es/).

    - `MariaDB`Para el cual le propongo la siguiente guía indicada justo despues de este parrafo, o puede simplemente descargarlo e instalarlo por medio de este link [MariaDB-Download](https://mariadb.org/download/).
        * [MariaDB-Guide](https://www.mariadbtutorial.com/getting-started/install-mariadb/)

2. Luego, debe crear la base de datos, para lo cual le recomiendo usar un gestor de bases de datos como `HeidySQL` o `MySQL Workbench`, una vez esté en la interfaz del gestor ejecutará el script `create.sql`. Para evitar errores, cargue el archivo en el gesto de base de datos y luego lo ejecuta (Lo anterior, porque en algunos casos, ejecutarlo directamente, antes de importarlo, puede generar errores).

3. Al tener lista la base de datos, procedemos a configurar las variables de entorno (Tener en cuenta que dentro de estas variables de entorno también vamos a configurar el usario administrador, el cual tendrá acceso a los Endpoint que requieran de su rol), para lo cual debe crear un archivo `.env` en la carpeta `backend`, la cual está ubicada en la carpeta principal de la aplicacion. Dentro del `.env` detallará sus variables de entorno reemplazando aquello que se encuentra entre `<>` (Incluyendo los símbolos) por las variables correspondientes a su entorno local:

```
U=<Usuario configurado en la base de datos que usualmente es root>
P=<Contraseña de la base de datos>
S=<Llave de seguridad para los tokens>
U_ADMIN=<Email del usuario administrador(Es importante que escriba bien el email y no olvide el símbolo @)>
P_ADMIN=<Contraseña de usuario administrador>
```

4. Instalar las dependencias de la aplicacion, ejecutando por medio de consola el comando `npm install` (Tener en cuenta que la ruta de la consola debe estar ubicada en la carpeta principal del proyecto).

5. Por último, ejecutar la aplicacion por medio de consola, usando el comando `npm start`.