import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Download,
  MapPin,
  Mail,
  MessageSquare,
  ChevronRight,
  Code2,
  Database,
  Wrench,
  Globe,
  Home,
  Moon,
  Sparkles,
  Sun,
  Send,
  X,
  LayoutTemplate,
  Server,
} from "lucide-react";

const dict = {
  es: {
    nav: { about: "SOBRE MÍ", stack: "STACK", projects: "PROYECTOS" },
    role: "Frontend Developer",
    location: "Santiago, Chile",
    cv: "Descargar CV",
    aboutTitle: "Sobre mí",
    aboutText:
      "Desarrollador junior con experiencia en proyectos personales en Python, JavaScript y C#. Interesado en desarrollo web/backend. He construido aplicaciones completas con bases de datos y APIs REST.",
    stackTitle: "Stack Tecnológico",
    frontend: "Frontend",
    backend: "Backend",
    database: "Base de Datos",
    tools: "Herramientas",
    projectsTitle: "Proyectos",
    viewCode: "Ver Código",
    photoPlaceholder: "ESPACIO PARA FOTO",
    contact: {
      button: "Contáctame",
      title: "Contáctame",
      name: "Nombre",
      email: "Correo",
      message: "Mensaje",
      send: "Enviar",
      sending: "Enviando...",
      sent: "Mensaje enviado. Gracias por escribir.",
      successTitle: "Mensaje enviado",
      successText:
        "Gracias por escribirme. Te responderé apenas pueda revisar tu mensaje.",
      successClose: "Perfecto",
      error: "No pude enviar el mensaje. Intenta nuevamente en un momento.",
      cancel: "Cancelar",
    },
  },
  en: {
    nav: { about: "ABOUT ME", stack: "STACK", projects: "PROJECTS" },
    role: "Frontend Developer",
    location: "Santiago, Chile",
    cv: "Download CV",
    aboutTitle: "About me",
    aboutText:
      "Junior developer with experience in personal projects using Python, JavaScript, and C#. Interested in web/backend development. I have built full-stack applications with databases and REST APIs.",
    stackTitle: "Tech Stack",
    frontend: "Frontend",
    backend: "Backend",
    database: "Databases",
    tools: "Tools",
    projectsTitle: "Projects",
    viewCode: "View Code",
    photoPlaceholder: "PHOTO SPACE",
    contact: {
      button: "Contact me",
      title: "Contact me",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send",
      sending: "Sending...",
      sent: "Message sent. Thanks for reaching out.",
      successTitle: "Message sent",
      successText:
        "Thanks for reaching out. I will reply as soon as I can review your message.",
      successClose: "Great",
      error: "I couldn't send the message. Please try again in a moment.",
      cancel: "Cancel",
    },
  },
};

const mailtoProtocolCodes = [109, 97, 105, 108, 116, 111, 58];
const contactEmailCodes = [
  103, 46, 118, 105, 101, 105, 114, 97, 98, 101, 114, 116, 64, 103, 109, 97,
  105, 108, 46, 99, 111, 109,
];

const decodeCharCodes = (codes) =>
  codes.map((code) => String.fromCharCode(code)).join("");

const getMailClientUrl = ({ subject, body } = {}) => {
  const query = [
    subject ? `subject=${encodeURIComponent(subject)}` : "",
    body ? `body=${encodeURIComponent(body)}` : "",
  ]
    .filter(Boolean)
    .join("&");

  return `${decodeCharCodes(mailtoProtocolCodes)}${decodeCharCodes(
    contactEmailCodes,
  )}${query ? `?${query}` : ""}`;
};

const stackData = [
  {
    id: "frontend",
    icon: <LayoutTemplate className="w-5 h-5" />,
    items: [
      "JavaScript",
      "React",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Bulma CSS",
      "Electron",
    ],
  },
  {
    id: "backend",
    icon: <Server className="w-5 h-5" />,
    items: ["Node.js", "PHP", "Python", "C#"],
  },
  {
    id: "database",
    icon: <Database className="w-5 h-5" />,
    items: ["MongoDB", "MySQL", "SQL Server", "SQLite"],
  },
  {
    id: "tools",
    icon: <Wrench className="w-5 h-5" />,
    items: ["VS Code", "Visual Studio", "Unity", "Windows Forms", "Git"],
  },
];

const techIconClasses = {
  JavaScript: "devicon-javascript-plain colored",
  React: "devicon-react-original colored",
  HTML: "devicon-html5-plain colored",
  CSS: "devicon-css3-plain colored",
  "Tailwind CSS": "devicon-tailwindcss-original colored",
  "Bulma CSS": "devicon-bulma-plain colored",
  Electron: "devicon-electron-original colored",
  "Node.js": "devicon-nodejs-plain colored",
  PHP: "devicon-php-plain colored",
  Python: "devicon-python-plain colored",
  "C#": "devicon-csharp-plain colored",
  MongoDB: "devicon-mongodb-plain colored",
  MySQL: "devicon-mysql-original colored",
  "SQL Server": "devicon-microsoftsqlserver-plain colored",
  SQLite: "devicon-sqlite-plain colored",
  "VS Code": "devicon-vscode-plain colored",
  "Visual Studio": "devicon-visualstudio-plain colored",
  Unity: "devicon-unity-plain text-white",
  "Windows Forms": "devicon-windows8-original colored",
  Git: "devicon-git-plain colored",
};

const projectsData = [
  {
    id: 1,
    title: "E-commerce API REST",
    descES:
      "API completa para comercio electrónico. Incluye sistema de autenticación de usuarios, gestión de inventario de productos y un módulo de procesamiento de pagos simulado.",
    descEN:
      "Complete e-commerce API. Includes user authentication system, product inventory management, and a simulated payment processing module.",
    tech: ["Node.js", "MongoDB", "Express"],
  },
  {
    id: 2,
    title: "Gestor de Tareas de Escritorio",
    descES:
      "Aplicación de escritorio enfocada en la productividad. Permite organizar tareas diarias utilizando almacenamiento local eficiente para acceso sin conexión.",
    descEN:
      "Desktop application focused on productivity. Allows organizing daily tasks using efficient local storage for offline access.",
    tech: ["C#", "Windows Forms", "SQLite"],
  },
];

const sectionKeys = ["about", "stack", "projects"];

function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrame;
    let particles = [];

    const createParticle = (width, height) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.4,
      opacity: Math.random() * 0.45 + 0.18,
      speedX: (Math.random() - 0.5) * 0.18,
      speedY: Math.random() * 0.22 + 0.05,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const baseParticleCount = Math.floor((width * height) / 13000);
      const particleCount = Math.min(
        156,
        Math.max(72, Math.floor(baseParticleCount * 1.3)),
      );
      particles = Array.from({ length: particleCount }, () =>
        createParticle(width, height),
      );
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.y > height + 8) particle.y = -8;
        if (particle.x < -8) particle.x = width + 8;
        if (particle.x > width + 8) particle.x = -8;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        const isLightTheme = document.documentElement.dataset.theme === "light";
        ctx.fillStyle = isLightTheme
          ? `rgba(42, 39, 68, ${particle.opacity * 0.95})`
          : `rgba(245, 245, 245, ${particle.opacity})`;
        ctx.fill();
      });

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-60"
      aria-hidden="true"
    />
  );
}

export default function App() {
  const [lang, setLang] = useState("es");
  const [theme, setTheme] = useState(() => {
    try {
      return window.localStorage.getItem("portfolio-theme") === "light"
        ? "light"
        : "dark";
    } catch {
      return "dark";
    }
  });
  const [activeSection, setActiveSection] = useState("about");
  const [isProfileFlipped, setIsProfileFlipped] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showContactSuccess, setShowContactSuccess] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState("idle");
  const [contactError, setContactError] = useState("");
  const t = dict[lang];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;

    try {
      window.localStorage.setItem("portfolio-theme", theme);
    } catch {
      // Ignore storage errors in restricted browser contexts.
    }
  }, [theme]);

  useEffect(() => {
    if (!isContactOpen && !showContactSuccess) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsContactOpen(false);
        setShowContactSuccess(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isContactOpen, showContactSuccess]);

  // Manejar el scroll para actualizar el menú activo
  useEffect(() => {
    const handleScroll = () => {
      let current = "about";
      const header = document.querySelector("header");
      const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
      const isDesktopLayout = window.matchMedia("(min-width: 700px)").matches;
      const activationLine = headerBottom + (isDesktopLayout ? 160 : 56);

      for (const section of sectionKeys) {
        const element = document.getElementById(section);
        if (element && element.getBoundingClientRect().top <= activationLine) {
          current = section;
        }
      }

      // Si llegamos al final de la página, forzar "Proyectos"
      if (
        window.innerHeight + Math.round(window.scrollY) >=
        document.body.offsetHeight - 50
      ) {
        current = "projects";
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Función para hacer scroll suave a la sección
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const header = document.querySelector("header");
      const headerOffset = (header?.offsetHeight ?? 100) + 24;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      setActiveSection(id);
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    setActiveSection("about");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  const openMailClient = () => {
    // window.location.href = getMailClientUrl();
    window.open(getMailClientUrl(), "_blank", "noopener,noreferrer");
  };

  const updateContactField = (event) => {
    const { name, value } = event.target;
    setContactStatus("idle");
    setContactError("");
    setContactForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const closeContactModal = () => {
    setIsContactOpen(false);
  };

  const closeContactSuccess = () => {
    setShowContactSuccess(false);
  };

  const openContactModal = () => {
    setShowContactSuccess(false);
    setContactStatus("idle");
    setContactError("");
    setIsContactOpen(true);
  };

  const sendContactMessage = async (event) => {
    event.preventDefault();

    setContactStatus("sending");
    setContactError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || t.contact.error);
      }

      setContactForm({
        name: "",
        email: "",
        message: "",
      });
      setContactStatus("idle");
      setContactError("");
      setIsContactOpen(false);
      setShowContactSuccess(true);
    } catch (error) {
      setContactError(error.message || t.contact.error);
      setContactStatus("error");
    }
  };

  return (
    <div className="portfolio-root relative isolate min-h-screen bg-[#050505] text-neutral-300 font-sans selection:bg-neutral-200 selection:text-black">
      <ParticlesBackground />
      <div className="portfolio-shell relative z-10 flex min-h-screen flex-col lg:flex-row max-w-[1800px] mx-auto">
        {/* TARJETA IZQUIERDA (Fija en Desktop) */}
        <aside className="profile-sidebar w-full max-w-full p-4 flex-shrink-0 z-20">
          <div className="h-full w-full max-w-full overflow-hidden bg-[#111111]/95 rounded-[2rem] border border-neutral-800 p-5 lg:p-6 xl:p-7 flex flex-col shadow-2xl backdrop-blur-sm">
            {/* Espacio para Foto */}
            <button
              type="button"
              onClick={() => setIsProfileFlipped((isFlipped) => !isFlipped)}
              className={`profile-photo-frame w-full aspect-[16/10] lg:aspect-auto lg:h-[38%] lg:min-h-[220px] shrink-0 bg-gradient-to-b from-neutral-900 to-[#111111] rounded-2xl mb-5 lg:mb-6 relative overflow-hidden border border-neutral-700/50 ${
                isProfileFlipped ? "is-flipped" : ""
              }`}
              aria-label="Cambiar foto de perfil"
              aria-pressed={isProfileFlipped}
            >
              <span className="profile-photo-flip">
                <span className="profile-photo-face">
                  <img
                    src="/profile1.png"
                    alt="Foto de perfil principal"
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="profile-photo-face profile-photo-face--back">
                  <img
                    src="/profile2.png"
                    alt="Foto de perfil alternativa"
                    className="h-full w-full object-cover"
                  />
                </span>
              </span>
            </button>

            {/* Información Personal */}
            <div className="min-w-0 flex-1 flex flex-col">
              <h1 className="max-w-full text-3xl xl:text-4xl font-bold text-white mb-1 tracking-tight break-words leading-tight">
                Gaspar <span className="text-[#9D9DCC]">Vieira Bert</span>
              </h1>
              <h2 className="text-base xl:text-lg text-neutral-400 font-medium mb-6">
                {t.role}
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex min-w-0 items-center gap-3 text-neutral-300">
                  <div className="p-2 bg-neutral-800/50 rounded-lg">
                    <MapPin className="w-4 h-4 text-neutral-200" />
                  </div>
                  <span className="min-w-0 text-sm font-medium break-words">
                    {t.location}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={openMailClient}
                  className="group flex max-w-full items-center gap-3 text-neutral-300 transition-colors"
                  aria-label="Enviar correo"
                >
                  <span className="p-2 bg-neutral-800/50 rounded-lg group-hover:bg-[#9D9DCC]/15 transition-colors">
                    <Mail className="w-4 h-4 text-neutral-200" />
                  </span>
                  <span className="min-w-0 text-sm font-medium text-neutral-400 group-hover:text-[#9D9DCC] transition-colors break-words">
                    Enviar correo
                  </span>
                </button>
                <button
                  type="button"
                  onClick={openContactModal}
                  className="group flex max-w-full items-center gap-3 text-neutral-300 transition-colors"
                  aria-label={t.contact.button}
                >
                  <span className="p-2 bg-neutral-800/50 rounded-lg group-hover:bg-[#9D9DCC]/15 transition-colors">
                    <MessageSquare className="w-4 h-4 text-neutral-200" />
                  </span>
                  <span className="min-w-0 text-sm font-medium text-neutral-400 group-hover:text-[#9D9DCC] transition-colors break-words">
                    {t.contact.button}
                  </span>
                </button>
              </div>

              {/* Botones Redes y CV */}
              <div className="mt-auto pt-2 flex flex-col gap-3">
                <div className="flex gap-3">
                  <a
                    href="https://github.com/MalasTripas123?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-neutral-800/50 hover:bg-[#9D9DCC]/15 rounded-xl transition-all hover:scale-[1.02] active:scale-95 text-white hover:text-[#9D9DCC] flex-1 flex justify-center items-center border border-neutral-700/50 hover:border-[#9D9DCC]/70"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/gaspar-vieira-bert-62675637b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-neutral-800/50 hover:bg-[#9D9DCC]/15 rounded-xl transition-all hover:scale-[1.02] active:scale-95 text-white hover:text-[#9D9DCC] flex-1 flex justify-center items-center border border-neutral-700/50 hover:border-[#9D9DCC]/70"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
                <button className="w-full py-3 bg-white text-black hover:bg-[#9D9DCC] rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-white/5 hover:shadow-[#9D9DCC]/20">
                  <Download className="w-4 h-4" />
                  {t.cv}
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-[#9D9DCC] opacity-90">
                <Sparkles className="text-[#9D9DCC] w-7 h-7 opacity-90" />
              </div>
            </div>
          </div>
        </aside>

        {/* SECCIÓN DERECHA (Con Scroll) */}
        <main className="portfolio-main flex-1 min-w-0 relative">
          {/* Header Fijo */}
          <header className="portfolio-header sticky top-0 z-50 backdrop-blur-xl bg-[#050505]/80 border-b border-neutral-800 px-4 sm:px-6 lg:px-12 py-4 lg:py-5 flex flex-col min-[700px]:flex-row justify-between items-stretch min-[700px]:items-center gap-3 transition-all">
            <nav className="flex w-full min-[700px]:w-auto justify-center min-[700px]:justify-start gap-2 lg:gap-4 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={scrollToTop}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-800 bg-transparent text-neutral-400 transition-all hover:border-[#9D9DCC]/70 hover:bg-[#9D9DCC]/15 hover:text-[#9D9DCC] min-[700px]:hidden"
                aria-label="Volver al inicio"
              >
                <Home className="h-4 w-4" />
              </button>
              {sectionKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className={`px-3.5 sm:px-5 py-2.5 rounded-full text-[0.68rem] sm:text-xs lg:text-sm font-bold tracking-wider sm:tracking-widest transition-all whitespace-nowrap border ${
                    activeSection === key
                      ? "bg-[#9D9DCC] text-black border-[#9D9DCC] shadow-[0_0_18px_rgba(157,157,204,0.2)]"
                      : "bg-transparent text-neutral-400 border-neutral-800 hover:text-[#9D9DCC] hover:border-[#9D9DCC]/70"
                  }`}
                >
                  {t.nav[key]}
                </button>
              ))}
            </nav>

            <div className="flex w-full justify-center gap-2 min-[700px]:w-auto min-[700px]:justify-end">
              <button
                onClick={() => setLang(lang === "es" ? "en" : "es")}
                className="px-4 py-2.5 rounded-full bg-neutral-800/40 hover:bg-[#9D9DCC]/15 border border-neutral-700/50 hover:border-[#9D9DCC]/70 text-xs font-bold text-white hover:text-[#9D9DCC] transition-colors flex items-center justify-center gap-2"
              >
                <Globe className="w-4 h-4" />
                {lang.toUpperCase()}
              </button>
              <button
                type="button"
                onClick={toggleTheme}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700/50 bg-neutral-800/40 text-white transition-colors hover:border-[#9D9DCC]/70 hover:bg-[#9D9DCC]/15 hover:text-[#9D9DCC]"
                aria-label={
                  theme === "dark"
                    ? "Cambiar a tema claro"
                    : "Cambiar a tema oscuro"
                }
                title={
                  theme === "dark"
                    ? "Cambiar a tema claro"
                    : "Cambiar a tema oscuro"
                }
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
            </div>
          </header>

          {/* Cuerpos de Contenido */}
          <div className="portfolio-content px-6 lg:px-16 py-12 lg:py-24 flex flex-col gap-32">
            {/* SOBRE MÍ */}
            <section id="about" className="scroll-mt-32 max-w-4xl">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-8 flex items-center gap-4">
                <span className="w-8 h-[3px] bg-[#9D9DCC] rounded-full"></span>
                {t.aboutTitle}
              </h3>
              <p className="text-lg lg:text-xl text-neutral-400 leading-relaxed font-light">
                {t.aboutText}
              </p>
            </section>

            {/* STACK */}
            <section id="stack" className="scroll-mt-32 max-w-5xl">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-10 flex items-center gap-4">
                <span className="w-8 h-[3px] bg-[#9D9DCC] rounded-full"></span>
                {t.stackTitle}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {stackData.map((category) => {
                  const isFeatured = category.id === "frontend";

                  return (
                    <div
                      key={category.id}
                      className={`stack-category group min-w-0 rounded-[2rem] border transition-colors ${
                        isFeatured
                          ? "md:col-span-2 bg-[#151515]/95 border-[#9D9DCC]/55 p-7 lg:p-9 shadow-[0_0_40px_rgba(157,157,204,0.1)] hover:border-[#9D9DCC]"
                          : "bg-[#111111]/95 border-neutral-800/80 p-7 lg:p-8 hover:bg-neutral-900 hover:border-[#9D9DCC]/70"
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-4 mb-7">
                        <div className="shrink-0 p-3 bg-neutral-800 rounded-xl text-white group-hover:text-[#9D9DCC] group-hover:scale-110 transition-all">
                          {category.icon}
                        </div>
                        <h4 className="stack-category-title min-w-0 text-xl font-bold text-white tracking-wide">
                          {t[category.id]}
                        </h4>
                      </div>
                      <div
                        className={`tech-grid grid gap-3 ${isFeatured ? "tech-grid--featured" : ""}`}
                      >
                        {category.items.map((item) => (
                          <div
                            key={item}
                            className="tech-card group/tech rounded-2xl border border-neutral-700/50 bg-black/85 text-center font-medium text-neutral-300 transition-colors hover:border-[#9D9DCC]/70 hover:text-[#9D9DCC] hover:bg-[#9D9DCC]/5"
                          >
                            <div
                              className="tech-icon-frame mx-auto flex items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900/90 transition-colors group-hover/tech:border-[#9D9DCC]/60"
                              aria-hidden="true"
                            >
                              <i
                                className={`tech-icon ${techIconClasses[item] ?? "devicon-devicon-plain colored"} leading-none`}
                              ></i>
                            </div>
                            <span className="tech-name">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* PROYECTOS */}
            <section id="projects" className="scroll-mt-32 max-w-5xl pb-20">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-10 flex items-center gap-4">
                <span className="w-8 h-[3px] bg-[#9D9DCC] rounded-full"></span>
                {t.projectsTitle}
              </h3>

              <div className="space-y-8">
                {projectsData.map((project) => (
                  <div
                    key={project.id}
                    className="group p-6 lg:p-8 bg-[#111111] border border-neutral-800/80 rounded-[2rem] hover:border-[#9D9DCC]/70 hover:shadow-[0_0_34px_rgba(157,157,204,0.1)] transition-all flex flex-col md:flex-row gap-8 items-center md:items-start"
                  >
                    <div className="w-full md:w-2/5 aspect-video bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-700 relative">
                      <div className="absolute inset-0 bg-gradient-to-tr from-neutral-800 to-neutral-700 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                        <Code2 className="w-12 h-12 text-neutral-500 opacity-50 group-hover:text-[#9D9DCC] transition-colors" />
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col h-full">
                      <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-[#9D9DCC] transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-neutral-400 mb-6 leading-relaxed flex-1">
                        {lang === "es" ? project.descES : project.descEN}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-bold px-3 py-1.5 bg-neutral-800 text-neutral-300 rounded-lg group-hover:bg-[#9D9DCC]/10 group-hover:text-[#9D9DCC] transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <button className="self-start flex items-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-[#9D9DCC] hover:text-black rounded-xl text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_rgba(157,157,204,0.18)]">
                        {t.viewCode} <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      {isContactOpen && (
        <div
          className="contact-modal fixed inset-0 z-[90] flex items-center justify-center px-4 py-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeContactModal();
            }
          }}
        >
          <form
            className="contact-modal__panel max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-[1.75rem] p-5 shadow-2xl sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            onSubmit={sendContactMessage}
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <h3
                id="contact-modal-title"
                className="text-2xl font-bold text-white"
              >
                {t.contact.title}
              </h3>
              <button
                type="button"
                onClick={closeContactModal}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-700/50 bg-neutral-800/60 text-neutral-300 transition-colors hover:border-[#9D9DCC]/70 hover:bg-[#9D9DCC]/15 hover:text-[#9D9DCC]"
                aria-label={t.contact.cancel}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-neutral-300">
                  {t.contact.name}
                </span>
                <input
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={updateContactField}
                  className="contact-modal__input"
                  autoComplete="name"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-neutral-300">
                  {t.contact.email}
                </span>
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={updateContactField}
                  className="contact-modal__input"
                  autoComplete="email"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-neutral-300">
                  {t.contact.message}
                </span>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={updateContactField}
                  className="contact-modal__input contact-modal__textarea"
                  rows="6"
                  required
                />
              </label>
            </div>

            {contactStatus === "error" && (
              <p
                className="contact-modal__feedback is-error"
                aria-live="polite"
              >
                {contactError || t.contact.error}
              </p>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeContactModal}
                className="rounded-xl border border-neutral-700/50 px-5 py-3 text-sm font-bold text-neutral-300 transition-colors hover:border-[#9D9DCC]/70 hover:bg-[#9D9DCC]/10 hover:text-[#9D9DCC]"
              >
                {t.contact.cancel}
              </button>
              <button
                type="submit"
                disabled={contactStatus === "sending"}
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-black shadow-lg shadow-white/5 transition-all hover:bg-[#9D9DCC] hover:shadow-[#9D9DCC]/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Send className="h-4 w-4" />
                {contactStatus === "sending"
                  ? t.contact.sending
                  : t.contact.send}
              </button>
            </div>
          </form>
        </div>
      )}

      {showContactSuccess && (
        <div
          className="contact-modal fixed inset-0 z-[90] flex items-center justify-center px-4 py-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeContactSuccess();
            }
          }}
        >
          <div
            className="contact-modal__panel contact-success__panel w-full max-w-md rounded-[1.75rem] p-6 text-center shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-success-title"
          >
            <div className="contact-success__icon mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl">
              <Sparkles className="h-7 w-7" />
            </div>
            <h3
              id="contact-success-title"
              className="mb-3 text-2xl font-bold text-white"
            >
              {t.contact.successTitle}
            </h3>
            <p className="mx-auto mb-6 max-w-sm text-sm leading-relaxed text-neutral-400">
              {t.contact.successText}
            </p>
            <button
              type="button"
              onClick={closeContactSuccess}
              className="w-full rounded-xl bg-white px-5 py-3 text-sm font-bold text-black shadow-lg shadow-white/5 transition-all hover:bg-[#9D9DCC] hover:shadow-[#9D9DCC]/20 active:scale-95 sm:w-auto"
            >
              {t.contact.successClose}
            </button>
          </div>
        </div>
      )}

      <nav className="section-rail" aria-label="Navegación por secciones">
        {sectionKeys.map((key) => {
          const isActive = activeSection === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => scrollToSection(key)}
              className={`section-rail__item ${isActive ? "is-active" : ""}`}
              aria-current={isActive ? "true" : undefined}
            >
              <span className="section-rail__star" aria-hidden="true">
                ✦
              </span>
              <span>{t.nav[key]}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
