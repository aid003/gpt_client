"use client";
import { Project } from "@/types";
import styles from "./ProjectPage.module.css";
import { useEffect, useState } from "react";

export default function ProjectsPage({
  currentProjectId,
}: {
  currentProjectId: number;
}) {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    async function getData(id: number) {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}get-project/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        }
      );
      setProject(await data.json());
    }

    getData(currentProjectId);
  }, [currentProjectId]);

  return (
    <div className={styles.projectContainer}>
      <h2>{project?.name}</h2>
    </div>
  );
}
