# 🌍  Ciudades del Mundo - Desafío Práctico #03 (DPS441)

Ciudades del Mundo es una aplicación móvil desarrollada en **React Native** con **Expo** que funciona como un explorador global interactivo. La aplicación consume datos en tiempo real de múltiples APIs para mostrar información detallada de países, mapas de geolocalización y el estado climático actual de sus capitales, todo bajo una interfaz con diseño premium en modo oscuro.

---

## 🛠️ Arquitectura y Estructura de Carpetas

El proyecto sigue una **arquitectura modular limpia**, separando las responsabilidades de la lógica de negocio, el consumo de servicios y la capa de presentación:

```text
/
├── assets/               # Recursos estáticos locales
├── src/
│   ├── api/
│   │   └── weatherApi.js # Servicio aislado para el consumo de OpenWeatherMap
│   └── screens/
│       ├── HomeScreen.js # Vista principal (Listado de países y ordenamiento alfabético)
│       └── DetailScreen.js# Vista de detalle (Imagen dinámica, Clima y Google Maps)
├── App.js                # Punto de entrada de la app y configuración de React Navigation
├── package.json          # Dependencias y scripts del proyecto
└── README.md             # Documentación del sistema
