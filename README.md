        ORGANIZAR TODO EL README!!!!
●Relación 1:1 embebida: User ↔ Profile (profile embebido en User)
● Relación 1:N referenciada: User → Article (author referenciado)
● Relación 1:N referenciada: Article → Comment (article referenciado)
● Relación N:M referenciada: Article ↔ Tag (array de ObjectIds)

En el README.md incluir:
● Explicar con sus propias palabras por qué se eligió embebido o referenciado para
cada relación. Analizar ventajas y desventajas de cada decisión tomada en el diseño
del sistema.
● Documentación de endpoints con ejemplos de request/response.
● Instrucciones de instalación y configuración.
● Explicación de las validaciones personalizadas implementadas.

NOTAS 
- correccion del error de actualizar datos embebidos:
las rutas funcionan pero al actualizar la biografia no aparece en la respuesta aun cuando da un 200, lo que estoy haciendo es que trato de actualizar un campo q esta DENTRO de un objeto como si estuvieran al mismo nivel.

usuario es el padre, y el perfil esta DENTRO de usuario

* en el controlador tengo q identificar tambien los campos q estan dentro de este hijo.

* reestructurar los datos

* usar $set 

 "const updateQuery = {};" controlador de usuario, lin61:
 creo un objeto vacio donde guardare las instrucciones para mongo, la contraparte de esto es usar como estuve haciendo antes: 
 "await User.findByIdAndUpdate(userId, { $set: req.body });"

buscara los campos biografia y en el usuario no existe pq estan dentro de perfil

la solucion es usar updateQuery pq nos permite transformar mejor las consultas y permitiendo q mongo busque en donde debe ser.

y esto no sirve para los campos embebidos: 
const user = await userModel.findByIdAndUpdate(
      req.params.id, 
      req.body,  // biography no está en profile
      { new: true }
    );

* una referencia simple se usa solo en relaciones 1:1 o 1:N, cuando es de mucho a mucho se usa array de referencias

*TABLA QUE EXPLICA MEJER LAS DIFERENCIAS ENTRE RELACIONES* 

_______________________________________________________________________
RELACION | CARACTERISTICA | VENTAJA  | DESVENTAJA |   USAR CUANDO     |
---------|----------------|----------|------------|-------------------|
   1:1   | se tiene todo  | consulta |no se puede |datos q van siempre|
         | con una sola   | unica    |consultar x |juntos(perfil y    |
         | consulta       |          |separado    |user por ej)       |
---------|----------------|----------|------------|-------------------|
   1:N   | usapopulate y  | flexible |muchas con- |articulos indepen- |
         |       ref      |y claro   |sultas      |       dientes     |
---------|----------------|----------|------------|-------------------|
   N:M   | usa arrays de  | lo mismo |consultas + |                   |
         |     objetos    |q arriba  |complejas   |   relacion M:M    |
         |                |pero +comp|            |                   |
---------|----------------|----------|------------|-------------------|


*OTRA TABLA QUE EXPLICA MAS SOBRE LAS REFERENCIAS PQ NO ENTENDI BIEN*
diferencias entre arrays de objetos y referencias simples
_________________________________________________
CARACTERISTICA  |  REF SIMPLE  |  ARRAY DE REF  |
----------------|--------------|----------------|
      TIPO      |   objectId   |   [objectId]   |
----------------|--------------|----------------|
    RELACION    |   1:1 o 1:N  |    solo N:M    |
----------------|--------------|----------------|
    POPULATE    | trae 1 objeto| trae un array  |
----------------|--------------|----------------|
      USO       |  author: id  |tags: [id1, id2]|
----------------|--------------|----------------|
      ref       | ref: 'nombre'| ref:'nombre'   |
----------------|--------------|----------------|

el referente o ref siempre sera el nombre del modelo 

_POPULATE_

metofo de mongoose que reemplaza los objectsId por documentos completos a los q estan referenciados.

_EMBEBIDO_

otro metodo que trae una sola cosa por automatico, se usa cuando los hijos son limitados y con una sola consulta traes todo.po

* buscar mas:
● Validar que solo el autor pueda editar sus artículos/comentarios (excepto admin).
● Verificar existencia de etiquetas antes de asociarlas a artículos.
● Validar que el artículo exista antes de crear comentarios.

* Middleware y validaciones (notas :P)
un middle es una funcion que tiene acceso al objeto de solicitud(req), a la respuesta(res) y a la siguiente funcion del middle en el circulo de solicitud-respuesta(es lo q va en medio como dijo el profe).
no solo sirve para revisar las consultas y respuestas tambien ayuda a declarar los limites en las rutas, ej:
// Esta ruta REQUIERE autenticación
router.get('/profile', requireAuth, (req, res) => {
    res.json({ message: "Perfil del usuario" });
});
si no estas autenticado no podes parar o ver lo q hay en esa parte. Es una ruta PRIVADA o  que tiene LIMITES
//esta ruta NO requiere autenticacion
router.get('/public', (req, res) => {
    res.json({ message: "Información pública" });
});
es una ruta publica, pueden acceder todos los usuarios sin importar el role:P

Populate inverso(virtual populate):
En bases de datos relacionales, puedes hacer JOINs. En MongoDB, no existen los JOINs nativos. El populate inverso simula esta funcionalidad.
// Cuando haces:
article.populate('comments');

// Mongoose internamente hace:
Comment.find({ article: article._id })
    .then(comments => {
        article.comments = comments;
    });

Virtual vs embebido
// EMBEDDED (documentos dentro del documento)
{
    _id: "art123",
    title: "Mi artículo",
    comments: [  // ❌ Los comentarios vienen EMBEBIDOS
        { text: "Buen artículo", user: "user1" },
        { text: "Interesante", user: "user2" }
    ]
}

// VIRTUAL POPULATE (referencias + populate)
{
    _id: "art123", 
    title: "Mi artículo"
    //comments NO está aquí físicamente
}
//con populate, Mongoose busca los comentarios relacionados

ventajas y desventajas de populate: 
Separación de concerns: Comentarios independientes
Escalabilidad: No limita el tamaño del documento
Flexibilidad: Puedes traer solo algunos comentarios

_ORM y ODM_
* ORM (Object-Relational Mapping):
Problema que resuelve: El impedancia objeto-relacional - la diferencia entre el modelo orientado a objetos y el modelo relacional.

Cómo funciona:

text
Objeto JavaScript → ORM → Sentencia SQL → Base de datos
ej: 
// En tu código (JavaScript)
const user = new User();
user.name = "Ana";
user.save();

// El ORM traduce a:
INSERT INTO users (name) VALUES ('Ana');

* Características ORM:

Mapeo objeto-tabla: Cada clase → tabla

Relaciones: hasMany, belongsTo, etc.

Migraciones: Control de cambios en esquema

Transacciones: ACID properties

* ODM (Object-Document Mapping):
Problema que resuelve: Mapear objetos a documentos NoSQL.

Cómo funciona:

text
Objeto JavaScript → ODM → Documento BSON → MongoDB
diferencias: 
Aspecto	ORM (SQL)	ODM (MongoDB)
Estructura	Tablas y filas	Colecciones y documentos
Esquema	Fijo y rígido	Flexible y dinámico
Relaciones	JOINs explícitos	Referencias o embebido
Consistencia	ACID fuerte	Eventual consistency
Escalabilidad	Vertical	Horizontal

_JWT_
Es un estándar abierto (RFC 7519) que define un método compacto y autónomo para transmitir información de forma segura entre partes como un objeto JSON.
+ Flujo de autenticacion:
Login: Usuario envía credenciales

Verificación: Servidor valida credenciales

Generación: Servidor crea JWT con datos del usuario

Envío: JWT se envía al cliente

Almacenamiento: Cliente guarda JWT (localStorage, cookies)

Verificación posterior: Cliente envía JWT en cada request

Validación: Servidor verifica la firma del JWT

_OPERADORES_ 
* Operadores de Comparación:
 Permiten comparar valores según criterios específicos.
* Operadores Lógicos:
 Implementan álgebra booleana
* Operadores de Arrays:
 Manipulan conjuntos según teoría de conjuntos.
implementacion: Cómo MongoDB procesa los operadores internamente:
db.users.find({ age: { $gt: 18, $lt: 30 } });

// MongoDB internamente:
1. Escaneo de colección
2. Aplicación de predicados por cada documento
3. Filtrado según condiciones
4. Retorno de resultados
* Teoria nhotas:
Validación vs Verificación:
Validación: "¿Estamos construyendo el producto correcto?"

Ejemplo: El email tiene formato válido

Verificación: "¿Estamos construyendo el producto correctamente?"

Ejemplo: El usuario existe en la base de datos

Capas de Validación:
1. Validación del Cliente (Frontend):
Propósito: Mejorar experiencia de usuario

Ejemplo: Validación en tiempo real en formularios

Limitación: Fácil de eludir

2. Validación del Servidor (Backend):
Propósito: Seguridad e integridad de datos

Ejemplo: Express validator, Joi

Característica: Obligatoria

3. Validación de Base de Datos:
Propósito: Última línea de defensa

Ejemplo: Esquemas de Mongoose, constraints de SQL

Ventaja: Independiente del código de aplicación

Principios de Validación:
Defensa en profundidad: Múltiples capas de validación

Principio del menor privilegio: Validar solo lo necesario

Fail-fast: Fallar rápidamente ante entradas inválidas

Validación positiva: Definir lo que SÍ se permite

__________________
examen------------|
populate inverso  |
ord y odm         |
creacion de tokens|
------------------|
* como saber que las rutas son privadas y publicas:
Operación	|HTTP Method   |   publica o privada?  |  pq
Leer/Ver	|GET	         | Pública (generalmente)|	Porque cualquiera puede ver contenido
Crear	POST	|POST  	   |       Privada         | Porque modifica la base de datos
Actualizar	|PUT/PATCH	   |       Privada	   | Porque modifica datos existentes
Eliminar	|DELETE	   |       Privada	   | Porque es destructivo
------------|--------------|-----------------------|---------------------------------------------

ruta publica: sin middlewares
ruta protegido: autenticacion basica(validateToken, createArticle)
ruta con permisos: auterizaciones(validateToken, ownerOrAdmin(articleModel), updateArticle)

ownerOrAdmin(articleModel): 
// Esto es una "Fábrica de Middlewares"
export const ownerOrAdmin = (model) => {
    return async (req, res, next) => {
        // Este middleware se crea DINÁMICAMENTE
        // para el modelo específico que le pasemos
    };
};
cuando escribo ownerOrAdmin(articleModel) js lo ejecuta con el article como parametro, retorna una nueva funcion especifica para articles(preguntar mas) y esa funcion queda listo para usarlo en la ruta

_INSTALACION:_

1. clonar el repositorio
2. Instalar las dependencias con npm install
3.  Configura las variables de entorno:
   PORT=
   MONGODB_URI=
   JWT_SECRET=
4. Iniciar el servidor con npm run dev