🐾 PetAdopt – Plataforma de Adopción de Mascotas

✨ PetAdopt es una aplicación moderna construida con Next.js 14 + TailwindCSS, que conecta a usuarios con mascotas disponibles para adopción.
Un diseño minimalista, responsivo y con autenticación incluida para que la experiencia sea rápida, segura y visualmente atractiva.  Extras: tiene una ruta /dashboard donde puedes ver las solicitudes de adopciones que hay, filtrarlas por estado o nombre, aceptar o rechazar, cada adopción que hacen los usuarios llega por email y se ve en dashboard.

🚀 Tecnologías Utilizadas

⚡ Next.js 14 (App Router) – Framework React de última generación

🎨 TailwindCSS – Estilos rápidos, responsivos y modernos

🔐 JWT & AuthContext – Autenticación segura con inicio de sesión y registro

🐕 MongoDB – Base de datos para almacenar usuarios, mascotas y solicitudes de adopción

✉️ Resend API – Envío automático de correos de confirmación

🌐 Vercel – Despliegue con hosting ultra rápido

✨ Features principales

✅ UI Responsive – Incluye un menú tipo hamburguesa para móviles 📱
✅ Autenticación completa – Registro, login y logout con persistencia de sesión
✅ Roles de usuario – Acceso especial al Dashboard de admin
✅ Gestión de Mascotas – Lista, creación y adopción de mascotas 🐶🐱
✅ Notificaciones por email – Confirmación de adopciones en tiempo real
✅ Estilo exótico – Animaciones, gradientes y componentes modernos con Tailwind

📸 Preview
💻 Desktop

📱 Mobile

⚙️ Instalación y uso
# Clonar repositorio
git clone https://github.com/Haiverhdz/PetAdoption.git

# Entrar al proyecto
cd petadopt

# Instalar dependencias
pnpm install   # o npm install

# Configurar variables de entorno
cp .env.example .env.local

# Levantar entorno de desarrollo
pnpm dev

🔑 Variables de entorno

En tu archivo .env.local agrega:

MONGODB_URI=mongodb+srv://...
JWT_SECRET=supersecreto123
RESEND_API_KEY=tu_api_key

🛠️ Scripts

pnpm dev → Modo desarrollo

pnpm build → Compilar proyecto

pnpm start → Producción

👨‍💻 Autor

Haiver Hernandez
📍 Medellín, Colombia
📧 haiverhercas@gmail.com

🐙 GitHub

💼 LinkedIn

📜 Licencia

Este proyecto está bajo la MIT License – puedes usarlo y mejorarlo libremente.

🔥🐾 ¡Adopta, no compres! PetAdopt une personas con mascotas que necesitan un hogar.