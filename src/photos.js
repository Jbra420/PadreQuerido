// ════════════════════════════════════════════════════════════
//  CÓMO AGREGAR TUS FOTOS:
//
//  1. Copia tus fotos a esta carpeta:
//        src/assets/photos/
//
//  2. Renombra tus archivos como:
//        foto1.jpg   foto2.jpg   foto3.jpg
//     (también funciona .png, .jpeg, .webp)
//
//  3. Si quieres más o menos fotos, agrega o elimina
//     líneas de import y objetos en el array photos[]
//
//  4. Cambia el texto de caption al pie de cada foto
// ════════════════════════════════════════════════════════════

import foto1 from './assets/photos/foto1.jpg'
import foto2 from './assets/photos/foto2.jpg'
import foto3 from './assets/photos/foto3.jpg'

export const photos = [
  {
    src: foto1,
    caption: 'Siempre juntos 💙',
  },
  {
    src: foto2,
    caption: 'Mi mejor maestro',
  },
  {
    src: foto3,
    caption: 'De ti aprendí todo',
  },
]
