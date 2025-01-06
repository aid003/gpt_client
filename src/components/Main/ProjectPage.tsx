import { Project } from "@/types";
import styles from "./ProjectPage.module.css";


export default async function ProjectsPage() {

  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}get-project/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: 2 }),
  });
  const project: Project = await data.json();

  return (
    <div className={styles.projectContainer}>
      <h2>{project.name}</h2>
    </div>
  );
}
