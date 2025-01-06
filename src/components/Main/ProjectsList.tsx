"use client";
import { Project } from "@/types";
import styles from "./ProjectsList.module.css";
import { SetStateAction, Dispatch, useEffect, useState } from "react";

export default function ProjectsList({
  updateCurrentProjectId,
}: {
  updateCurrentProjectId: Dispatch<SetStateAction<number>>;
}) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function getData() {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}get-all-projects/`
      );
      setProjects(await data.json());
    }

    getData();
  });

  return (
    <div className={styles.mainContainer}>
      <ul className={styles.ulContainer}>
        {projects.map((project: Project) => (
          <li
            className={styles.liContainer}
            onClick={() => updateCurrentProjectId(project.id)}
            key={project.id}
          >
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
