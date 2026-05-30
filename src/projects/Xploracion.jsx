import {
  ProjectBulletList,
  ProjectMediaGrid,
  ProjectReadme,
  ProjectSection,
} from "./ProjectDetailLayout.jsx";

export function XploracionDetail({ lang }) {
  const isES = lang === "es";

  return (
    <div className="project-detail-flow">
      <ProjectSection title={isES ? "Visión general" : "Overview"}>
        <p>
          {isES
            ? "Xploración es un juego web multijugador de cartas para grupos. El proyecto adapta el ritmo social de un juego de mesa a una experiencia digital con turnos sincronizados y decisiones tácticas."
            : "Xploración is a multiplayer web card game for groups. The project adapts the social pace of a tabletop game into a digital experience with synchronized turns and tactical decisions."}
        </p>
      </ProjectSection>

      <ProjectSection title={isES ? "Puntos fuertes" : "Highlights"}>
        <ProjectBulletList
          items={
            isES
              ? [
                  "Partidas casuales pensadas para jugar en grupo desde el navegador.",
                  "Sincronización en tiempo real con WebSockets.",
                  "Interfaz construida con Tailwind CSS para iterar rápido sobre el flujo de juego.",
                ]
              : [
                  "Casual matches designed for group play from the browser.",
                  "Real-time synchronization with WebSockets.",
                  "Interface built with Tailwind CSS for fast iteration on the game flow.",
                ]
          }
        />
      </ProjectSection>

      <ProjectMediaGrid
        items={[
          {
            src: "/xploracion-preview.png",
            alt: "Xploración preview",
            caption: isES
              ? "Vista previa principal del juego."
              : "Main game preview.",
          },
        ]}
      />

      <ProjectSection title={isES ? "Manual / instrucciones" : "Manual / instructions"}>
        <ProjectReadme>
          <p>
            {isES
              ? "Este componente queda preparado para agregar reglas, capturas por fase, GIFs de turnos, explicación de cartas y notas de instalación."
              : "This component is ready for rules, phase screenshots, turn GIFs, card explanations, and installation notes."}
          </p>
        </ProjectReadme>
      </ProjectSection>
    </div>
  );
}
