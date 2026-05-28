import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Download,
  MapPin,
  Mail,
  ChevronRight,
  Code2,
  Database,
  Wrench,
  Globe,
  Sparkles,
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
  },
};

const stackData = [
  {
    id: "frontend",
    icon: <LayoutTemplate className="w-5 h-5" />,
    items: ["JavaScript", "React", "HTML", "CSS", "Tailwind CSS", "Bulma CSS"],
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
    items: ["VS Code", "Visual Studio", "Unity", "Windows Forms"],
  },
];

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

      const particleCount = Math.min(
        120,
        Math.max(55, Math.floor((width * height) / 13000)),
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
        ctx.fillStyle = `rgba(245, 245, 245, ${particle.opacity})`;
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
  const [activeSection, setActiveSection] = useState("about");
  const t = dict[lang];

  // Manejar el scroll para actualizar el menú activo
  useEffect(() => {
    const handleScroll = () => {
      let current = "about";
      const header = document.querySelector("header");
      const scrollPosition = window.scrollY + (header?.offsetHeight ?? 0) + 160;

      for (const section of sectionKeys) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop) {
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
  }, [sectionKeys]);

  // Función para hacer scroll suave a la sección
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const openMailClient = () => {
    const protocol = [109, 97, 105, 108, 116, 111, 58]
      .map((code) => String.fromCharCode(code))
      .join("");
    const email = [
      103, 46, 118, 105, 101, 105, 114, 97, 98, 101, 114, 116, 64, 103,
      109, 97, 105, 108, 46, 99, 111, 109,
    ]
      .map((code) => String.fromCharCode(code))
      .join("");

    window.location.href = `${protocol}${email}`;
  };

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[#050505] text-neutral-300 font-sans selection:bg-neutral-200 selection:text-black">
      <ParticlesBackground />
      <div className="portfolio-shell relative z-10 flex min-h-screen flex-col lg:flex-row max-w-[1800px] mx-auto">
        {/* TARJETA IZQUIERDA (Fija en Desktop) */}
        <aside className="profile-sidebar p-4 flex-shrink-0 z-20">
          <div className="h-full bg-[#111111]/95 rounded-[2rem] border border-neutral-800 p-5 lg:p-6 xl:p-7 flex flex-col shadow-2xl backdrop-blur-sm">
            {/* Espacio para Foto */}
            <div className="profile-photo-frame w-full aspect-[16/10] lg:aspect-auto lg:h-[38%] lg:min-h-[220px] shrink-0 bg-gradient-to-b from-neutral-900 to-[#111111] rounded-2xl mb-5 lg:mb-6 relative overflow-hidden flex flex-col items-center justify-center border border-neutral-700/50">
              <img
                src="/profile.png"
                alt="Foto de perfil"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Información Personal */}
            <div className="flex-1 flex flex-col">
              <h1 className="text-3xl xl:text-4xl font-bold text-white mb-1 tracking-tight">
                Gaspar <span className="text-[#9D9DCC]">Vieira Bert</span>
              </h1>
              <h2 className="text-base xl:text-lg text-neutral-400 font-medium mb-6">
                {t.role}
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-neutral-300">
                  <div className="p-2 bg-neutral-800/50 rounded-lg">
                    <MapPin className="w-4 h-4 text-neutral-200" />
                  </div>
                  <span className="text-sm font-medium">{t.location}</span>
                </div>
                <button
                  type="button"
                  onClick={openMailClient}
                  className="group flex w-fit items-center gap-3 text-neutral-300 transition-colors"
                  aria-label="Enviar correo"
                >
                  <span className="p-2 bg-neutral-800/50 rounded-lg group-hover:bg-[#9D9DCC]/15 transition-colors">
                    <Mail className="w-4 h-4 text-neutral-200" />
                  </span>
                  <span className="text-sm font-medium text-neutral-400 group-hover:text-[#9D9DCC] transition-colors">
                    Enviar correo
                  </span>
                </button>
              </div>

              {/* Botones Redes y CV */}
              <div className="mt-auto pt-2 flex flex-col gap-3">
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="p-3 bg-neutral-800/50 hover:bg-[#9D9DCC]/15 rounded-xl transition-all hover:scale-[1.02] active:scale-95 text-white hover:text-[#9D9DCC] flex-1 flex justify-center items-center border border-neutral-700/50 hover:border-[#9D9DCC]/70"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
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
          <header className="portfolio-header sticky top-0 z-50 backdrop-blur-xl bg-[#050505]/80 border-b border-neutral-800 px-6 lg:px-12 py-5 flex justify-between items-center transition-all">
            <nav className="flex gap-2 lg:gap-4 overflow-x-auto no-scrollbar">
              {sectionKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className={`px-5 py-2.5 rounded-full text-xs lg:text-sm font-bold tracking-widest transition-all whitespace-nowrap border ${
                    activeSection === key
                      ? "bg-[#9D9DCC] text-black border-[#9D9DCC] shadow-[0_0_18px_rgba(157,157,204,0.2)]"
                      : "bg-transparent text-neutral-400 border-neutral-800 hover:text-[#9D9DCC] hover:border-[#9D9DCC]/70"
                  }`}
                >
                  {t.nav[key]}
                </button>
              ))}
            </nav>

            <button
              onClick={() => setLang(lang === "es" ? "en" : "es")}
              className="ml-4 px-4 py-2.5 rounded-full bg-neutral-800/40 hover:bg-[#9D9DCC]/15 border border-neutral-700/50 hover:border-[#9D9DCC]/70 text-xs font-bold text-white hover:text-[#9D9DCC] transition-colors flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              {lang.toUpperCase()}
            </button>
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
                      className={`group rounded-[2rem] border transition-colors ${
                        isFeatured
                          ? "md:col-span-2 bg-[#151515]/95 border-[#9D9DCC]/55 p-7 lg:p-9 shadow-[0_0_40px_rgba(157,157,204,0.1)] hover:border-[#9D9DCC]"
                          : "bg-[#111111]/95 border-neutral-800/80 p-7 lg:p-8 hover:bg-neutral-900 hover:border-[#9D9DCC]/70"
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-7">
                        <div className="p-3 bg-neutral-800 rounded-xl text-white group-hover:text-[#9D9DCC] group-hover:scale-110 transition-all">
                          {category.icon}
                        </div>
                        <h4 className="text-xl font-bold text-white tracking-wide">
                          {t[category.id]}
                        </h4>
                      </div>
                      <div
                        className={`grid gap-3 ${isFeatured ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2"}`}
                      >
                        {category.items.map((item) => (
                          <div
                            key={item}
                            className="group/tech min-h-24 rounded-2xl border border-neutral-700/50 bg-black/85 px-3 py-3 text-center text-sm font-medium text-neutral-300 transition-colors hover:border-[#9D9DCC]/70 hover:text-[#9D9DCC] hover:bg-[#9D9DCC]/5"
                          >
                            <div
                              className="mx-auto mb-3 h-9 w-9 rounded-lg border border-neutral-700 bg-neutral-900/90 transition-colors group-hover/tech:border-[#9D9DCC]/60"
                              aria-hidden="true"
                            ></div>
                            <span>{item}</span>
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
