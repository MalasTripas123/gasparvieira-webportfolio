import {
  ProjectBulletList,
  ProjectMediaGrid,
  ProjectReadme,
  ProjectSection,
} from "./ProjectDetailLayout.jsx";

export function ArtifactMinmaxingDetail({ lang }) {
  const isES = lang === "es";

  return (
    <div className="project-detail-flow">
      <ProjectSection title={isES ? "Visión general" : "Overview"}>
        <p>
          {isES
            ? "Artifact Minmaxing es una herramienta para analizar equipamiento de Genshin Impact a partir del UID del jugador. El objetivo es mostrar de forma legible cuánto margen de mejora tiene cada personaje según builds predeterminadas."
            : "Artifact Minmaxing is a tool for analyzing Genshin Impact equipment from a player's UID. Its goal is to show, in a readable way, how much room for improvement each character has according to preset builds."}
        </p>
      </ProjectSection>

      <ProjectSection title={isES ? "Qué analiza" : "What it analyzes"}>
        <ProjectBulletList
          items={
            isES
              ? [
                  "Obtención de datos mediante la API de Enka.Network.",
                  "Evaluación de artefactos actuales por personaje.",
                  "Cálculo de eficiencia y potencial de mejora para min-maxing.",
                ]
              : [
                  "Data fetching through the Enka.Network API.",
                  "Current artifact evaluation per character.",
                  "Efficiency and improvement-potential calculations for min-maxing.",
                ]
          }
        />
      </ProjectSection>

      <ProjectMediaGrid
        items={[
          {
            src: "/artifact-minmaxing-preview.png",
            alt: "Artifact Minmaxing preview",
            caption: isES
              ? "Vista previa principal de la herramienta."
              : "Main tool preview.",
          },
        ]}
      />

      <ProjectSection title={isES ? "README breve" : "Short README"}>
        <ProjectReadme>
          <p>
            {isES
              ? "Este componente queda listo para agregar ejemplos de UID, explicación de fórmulas, capturas de resultados, limitaciones de la API y guía de uso."
              : "This component is ready for UID examples, formula explanations, result screenshots, API limitations, and usage guides."}
          </p>
        </ProjectReadme>
      </ProjectSection>
    </div>
  );
}
