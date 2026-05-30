export function ProjectSection({ title, children }) {
  return (
    <section className="project-detail-section">
      <h4>{title}</h4>
      {children}
    </section>
  );
}

export function ProjectBulletList({ items }) {
  return (
    <ul className="project-detail-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function ProjectMediaGrid({ items }) {
  return (
    <div className="project-media-grid">
      {items.map((item) => (
        <figure key={item.src} className="project-media-item">
          <img src={item.src} alt={item.alt} />
          {item.caption && <figcaption>{item.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

export function ProjectReadme({ children }) {
  return <div className="project-readme">{children}</div>;
}
