"use client";
import { Suspense, useState } from "react";
import ProjectsList from "./ProjectsList";
import ProjectsPage from "./ProjectPage";
import styles from "./MainContainer.module.css";
import ProjectsListSkeleton from "./ProjectsListSkeleton";
import ProjectsPageSkeleton from "./ProjectsPageSkeleton";

export default function MainContainer() {
  const [currentProjectId, setCurrentProjectId] = useState<number | null>(null);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <h1 className={styles.heading}>Проекты</h1>
        <Suspense fallback={<ProjectsListSkeleton />}>
          <ProjectsList updateCurrentProjectId={setCurrentProjectId} />
        </Suspense>
      </div>
      <div className={styles.rightContainer}>
        <Suspense fallback={<ProjectsPageSkeleton />}>
          {currentProjectId !== null && <ProjectsPage currentProjectId={currentProjectId} />}
        </Suspense>
      </div>
    </div>
  );
}
