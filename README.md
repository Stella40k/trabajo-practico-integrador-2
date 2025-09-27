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
__________________
examen------------|
populate inverso  |
ord y odm         |
creacion de tokens|
------------------|