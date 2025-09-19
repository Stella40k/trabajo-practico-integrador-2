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