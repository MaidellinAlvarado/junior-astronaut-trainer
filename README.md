# Junior Astronaut Mission Trainer

> Un simulador web interactivo diseñado para misiones espaciales profundas, que conecta mecánicas de supervivencia de la tripulación con datos reales de clima espacial y protocolos científicos de la [NASA](https://www.nasa.gov/about/).

---

## Tabla de Contenidos
* [Acerca del Proyecto](#-acerca-del-proyecto)
* [Características Principales](#-características-principales)
* [Conexión con Datos Científicos Reales (NASA DONKI)](#-conexión-con-datos-científicos-reales-nasa-donki)
* [Tecnologías Utilizadas](#-tecnologías-utilizadas)
* [Instalación y Uso Local](#-instalación-y-uso-local)
* [Autor](#-autor)

---

## Acerca del Proyecto
**Junior Astronaut Mission Trainer** fue desarrollado para el [NASA Space Apps Challenge](https://www.spaceappschallenge.org/2026/challenges/junior-astronaut-mission-trainer/). El simulador pone a prueba las habilidades de jóvenes comandantes (de 7 a 13 años) en una travesía de 10 Soles a través del espacio profundo, gestionando recursos críticos como **Oxígeno** y **Energía** mientras enfrentan emergencias cósmicas en tiempo real.

---

## Características Principales
*  **Sistema de Tiempo Dinámico:** Cuenta regresiva por cada Sol con avance continuo de la misión.
*  **Gestión de Recursos Vitales:** Monitoreo en tiempo real de niveles de oxígeno y energía con botones interactivos de reparación y reciclaje.
*  **Alertas de Emergencia Científicas (NASA DONKI):** Pop-ups interactivos con sonido de alarma y explicaciones sencillas (adaptadas para niños) sobre tormentas solares y polvo estelar.
* **Enfoque Educativo:** Pasos de protocolos espaciales claros para comprender la ciencia detrás de las misiones espaciales reales.

---

## Conexión con Datos Científicos Reales (NASA DONKI)
Este proyecto integra recursos oficiales recomendados por el hackathon:
* **[NASA Space Weather Database (DONKI)](https://ccmc.gsfc.nasa.gov/DONKI/):** Proporciona la base para las alertas de eyecciones de masa coronal (CME) y condiciones de clima espacial que afectan la nave en órbita.

---

## Tecnologías Utilizadas
* **React** (Componentes interactivos y gestión de estados)
* **TypeScript** (Tipado seguro para la lógica del juego)
* **Vite** (Entorno de desarrollo ultrarrápido)
* **Tailwind CSS** (Diseño de interfaz espacial inmersiva y animaciones personalizadas)
* **Web Audio API** (Efectos de sonido de alarmas espaciales generados de forma nativa)

---

## Instalación y Uso Local

Sigue estos pasos para clonar y ejecutar el proyecto en tu computadora:

```bash
# 1. Clona el repositorio
git clone [https://github.com/MaidellinAlvarado/junior-astronaut-trainer.git](https://github.com/MaidellinAlvarado/junior-astronaut-trainer.git)

# 2. Entra a la carpeta del proyecto
cd junior-astronaut-trainer

# 3. Instala las dependencias
npm install

# 4. Inicia el servidor de desarrollo
npm run dev
