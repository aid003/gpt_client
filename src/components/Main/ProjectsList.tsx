import { Project } from "@/types";
import styles from "./ProjectsList.module.css";

export default async function ProjectsList() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}get-all-projects/`
  );
  const projects = await data.json();

  return (
    <div className={styles.mainContainer}>
      <ul className={styles.ulContainer}>
        {projects.map((project: Project) => (
          <li className={styles.liContainer} key={project.id}>
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
