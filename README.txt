# Sagrada Orden Awards 2026

Primera versión funcional de la página.

## Qué incluye
- Diseño medieval/fantasía responsive para celular y computadora.
- 16 miembros.
- 28 categorías.
- Top 3 por categoría: 3, 2 y 1 punto.
- Impide repetir a una persona dentro del mismo Top 3.
- Código de votante.
- Guardado mediante `localStorage`.
- Cálculo de resultados y podios.
- Catálogo completo de categorías.
- Botón para borrar los datos locales.

## Cómo probarla
1. Abre `index.html` en Chrome/Edge/Firefox.
2. En "Identificación del miembro", escribe cualquier código de prueba, por ejemplo `ORDEN-01`.
3. Completa las categorías.
4. Ve a "Resultados".

## Importante
Esta versión es un prototipo funcional local. Los votos se guardan SOLO en el navegador/dispositivo donde se realizó la votación.

Para que los 16 amigos voten desde sus propios teléfonos y todos los votos lleguen a una sola base de datos, el siguiente paso es conectar esta interfaz a un backend (por ejemplo Supabase/Firebase) y crear un sistema real de códigos únicos. No se debe usar `localStorage` como sistema definitivo para una elección compartida.

## Datos cargados
16 miembros y 28 categorías proporcionados para Sagrada Orden Awards 2026.
