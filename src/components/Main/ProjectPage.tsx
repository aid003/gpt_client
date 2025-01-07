"use client";
import { Project, Property } from "@/types";
import styles from "./ProjectPage.module.css";
import { useEffect, useState } from "react";
import PropertyComponent from "../Base/PropertyComponent";

export default function ProjectsPage({
  currentProjectId,
}: {
  currentProjectId: number;
}) {
  const [project, setProject] = useState<Project | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);

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

      const properties = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}get-properties/`
      );
      setProject(await data.json());
      setProperties(await properties.json());
    }

    getData(currentProjectId);
  }, [currentProjectId]);

  return (
    <>
      <p className={styles.heading}>Настройки</p>
      <div className={styles.projectContainer}>
        <div>
          {project &&
            properties &&
            properties.length > 0 &&
            properties.map((property: Property) => {
              const currentValue = project[property.key as keyof Project];

              return currentValue !== null || undefined ? (
                <PropertyComponent
                  key={property.id}
                  property={property}
                  currentValue={currentValue as string}
                  projectId={project.id ?? 0}
                />
              ) : (
                ""
              );
            })}
        </div>
      </div>
    </>
  );
}
