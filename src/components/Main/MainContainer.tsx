import { Suspense } from "react";
import ProjectsList from "./ProjectsList";
import ProjectsPage from "./ProjectPage";
import styles from "./MainContainer.module.css";
import ProjectsListSkeleton from "./ProjectsListSkeleton";
import ProjectsPageSkeleton from "./ProjectsPageSkeleton";

export default async function MainContainer() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <h1 className={styles.heading}>Проекты</h1>
        <Suspense fallback={<ProjectsListSkeleton />}>
          <ProjectsList />
        </Suspense>
      </div>
      <div className={styles.rightContainer}>
        <Suspense fallback={<ProjectsPageSkeleton />}>
          <ProjectsPage />
        </Suspense>
      </div>
    </div>
  );
}
