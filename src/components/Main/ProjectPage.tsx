"use client";
import { Project, Property } from "@/types";
import styles from "./ProjectPage.module.css";
import { useEffect, useState } from "react";
import PropertyComponent from "../Base/PropertyComponent";
import { Block, blocksConfig } from "./blocksConfig";

import { FiCopy } from "react-icons/fi";

export default function ProjectPage({
  currentProjectId,
}: {
  currentProjectId: number;
}) {
  const [project, setProject] = useState<Project | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [currentBlock, setCurrentBlock] = useState<Block>({
    name: "Настройки",
    key: "settings",
  });

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

  const textToCopy = `[x2jer3ic9wpdww02]_update_business_connection_id:::${project?.id}`;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch (error) {
      console.error("Ошибка при копировании текста:", error);
    }
  };

  return (
    <>
      <div className={styles.blockContainer}>
        {blocksConfig.map((block: Block) => (
          <p
            className={styles.blockItem}
            style={
              currentBlock.key === block.key
                ? {
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "5px",
                  }
                : {}
            }
            key={block.key}
            onClick={() => {
              setCurrentBlock(block);
            }}
          >
            {block.name}
          </p>
        ))}
      </div>
      {currentBlock.key === "settings" && (
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
      )}
      {currentBlock.key === "telegram" && (
        <div className={styles.projectContainer}>
          <div>
            <div style={styl.container}>
              <p style={styl.text}>{textToCopy}</p>
              <button style={styl.button} onClick={handleCopy}>
                <FiCopy style={styl.icon} /> Копировать текст
              </button>
            </div>
          </div>
        </div>
      )}
      {currentBlock.key === "rag" && (
        <div className={styles.projectContainer}>rag</div>
      )}
      {currentBlock.key === "prompts" && (
        <div className={styles.projectContainer}>prompts</div>
      )}
      {currentBlock.key === "users" && (
        <div className={styles.projectContainer}>users</div>
      )}
    </>
  );
}

const styl = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    border: "2px solid black",
    borderRadius: "8px",
    backgroundColor: "white",
    maxWidth: "700px",
    margin: "50px auto",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  text: {
    color: "black",
    fontSize: "16px",
    marginBottom: "10px",
    textAlign: "center" as const,
  },
  button: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 20px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#333", // Тёмно-серый цвет при наведении
  },
  icon: {
    fontSize: "18px",
  },
  projectContainer: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    margin: "10px 0",
  },
};
