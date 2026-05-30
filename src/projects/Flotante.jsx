import {
  ProjectBulletList,
  ProjectMediaGrid,
  ProjectReadme,
  ProjectSection,
} from "./ProjectDetailLayout.jsx";

export function FlotanteDetail({ lang }) {
  const isES = lang === "es";

  return (
    <div className="project-detail-flow">
      <ProjectSection title={isES ? "Visión general" : "Overview"}>
        <p>
          {isES
            ? "Flotante es una aplicación de escritorio enfocada en acceso rápido a snippets e imágenes de referencia. La idea central es que el usuario pueda consultar información recurrente sin abandonar su contexto de trabajo."
            : "Flotante is a desktop app focused on quick access to snippets and reference images. Its core idea is helping users consult recurring information without leaving their work context."}
        </p>
      </ProjectSection>

      <ProjectSection title={isES ? "Comportamiento" : "Behavior"}>
        <ProjectBulletList
          items={
            isES
              ? [
                  "Se contrae como un acceso discreto en el borde del monitor.",
                  "Se expande al interactuar con el mouse.",
                  "Usa SQLite para persistir contenido localmente.",
                ]
              : [
                  "Collapses into a discreet access point at the screen edge.",
                  "Expands when the user interacts with the mouse.",
                  "Uses SQLite to persist content locally.",
                ]
          }
        />
      </ProjectSection>

      <ProjectMediaGrid
        items={[
          {
            src: "/flotante-preview.png",
            alt: "Flotante preview",
            caption: isES
              ? "Vista previa de la aplicación de escritorio."
              : "Desktop app preview.",
          },
        ]}
      />

      <ProjectSection title={isES ? "Descarga y uso" : "Download and usage"}>
        <ProjectReadme>
          <p>
            {isES
              ? "El modal conserva el acceso de descarga directa. Este archivo puede sumar instrucciones de instalación, notas de versión, capturas animadas y problemas conocidos."
              : "The modal keeps the direct download action. This file can include installation instructions, release notes, animated screenshots, and known issues."}
          </p>
        </ProjectReadme>
      </ProjectSection>
    </div>
  );
}
