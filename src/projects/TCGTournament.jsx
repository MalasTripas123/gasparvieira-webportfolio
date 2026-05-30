import {
  ProjectBulletList,
  ProjectMediaGrid,
  ProjectReadme,
  ProjectSection,
} from "./ProjectDetailLayout.jsx";

export function TCGTournamentDetail({ lang }) {
  const isES = lang === "es";

  return (
    <div className="project-detail-flow">
      <ProjectSection title={isES ? "Visión general" : "Overview"}>
        <p>
          {isES
            ? "TCG-Tournament está planteado como una plataforma SaaS para ordenar la operación diaria de torneos de cartas coleccionables. El foco está en reducir la carga administrativa de las tiendas y dar a los jugadores una experiencia más clara antes, durante y después de cada evento."
            : "TCG-Tournament is designed as a SaaS platform for organizing the daily operation of trading card game tournaments. Its focus is reducing administrative work for stores while giving players a clearer experience before, during, and after each event."}
        </p>
      </ProjectSection>

      <ProjectSection title={isES ? "Qué cubre" : "What it covers"}>
        <ProjectBulletList
          items={
            isES
              ? [
                  "Modelo pensado para una beta con múltiples tiendas locales.",
                  "Gestión logística de eventos, jugadores y flujo competitivo.",
                  "Arquitectura backend con Node.js, Express y MongoDB.",
                ]
              : [
                  "Model intended for a beta with multiple local stores.",
                  "Logistical management for events, players, and competitive flow.",
                  "Backend architecture using Node.js, Express, and MongoDB.",
                ]
          }
        />
      </ProjectSection>

      <ProjectMediaGrid
        items={[
          {
            src: "/tcg-tournament-preview.png",
            alt: "TCG-Tournament preview",
            caption: isES
              ? "Vista previa principal del proyecto."
              : "Main project preview.",
          },
        ]}
      />

      <ProjectSection title={isES ? "README breve" : "Short README"}>
        <ProjectReadme>
          <p>
            {isES
              ? "Este archivo puede crecer con capturas del panel, diagramas del modelo de datos, instrucciones de despliegue, GIFs del flujo de inscripción o notas sobre decisiones técnicas."
              : "This file can grow with dashboard screenshots, data model diagrams, deployment notes, signup-flow GIFs, or notes about technical decisions."}
          </p>
        </ProjectReadme>
      </ProjectSection>
    </div>
  );
}
