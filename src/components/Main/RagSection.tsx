import { Project, Property, VectorCollection } from "@/types";
import styles from "./RagSection.module.css";
import { FaFileAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

const RagSection = ({
  properties,
  project,
}: {
  properties: Property;
  project: Project | null;
}) => {
  const [collectionData, setCollectionData] = useState<{
    name: string;
    type: string;
  } | null>(null);

  const [currentCollections, setCurrentCollections] = useState<
    VectorCollection[] | null
  >(null);

  const [collectionForDelete, setCollectionForDelete] = useState<number | null>(
    null
  );

  const [collectionForUpload, setCollectionForUpload] = useState<number | null>(
    null
  );

  useEffect(() => {
    async function getVectorCollections() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}get-project/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: project?.id,
          }),
        }
      );

      const data: Project = await res.json();

      setCurrentCollections(data.vectorCollections);
    }

    getVectorCollections();
  }, [collectionData?.type, project?.id, collectionForDelete]);

  async function updateRagStatus() {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}update-properties/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId: project?.id,
        propertyName: "isUsingRag",
        changeValue: !Boolean(project?.isUsingRag),
      }),
    });
  }

  async function createVectorCollections() {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}create-vector-collection/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: collectionData?.name ? collectionData.name : null,
        description: null,
        type: collectionData?.type ? collectionData.type : null,
        projectId: project?.id,
      }),
    });

    setCollectionData(null);
  }

  async function deleteVectorCollections() {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}delete-vector-collection/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId: project?.id,
        collectionId: collectionForDelete,
      }),
    });

    setCollectionForDelete(null);
  }

  function uploadDataToVectorCollection() {}

  return (
    <div className={styles.ragContainer}>
      <div className={styles.controlContainer}>
        <button
          className={styles.buttonUpdateStatus}
          onClick={updateRagStatus}
          style={
            project?.isUsingRag
              ? { backgroundColor: "rgb(39, 16, 16)" }
              : { backgroundColor: "rgb(12, 37, 22)" }
          }
        >
          {project?.isUsingRag ? "Отключить" : "Включить"}
        </button>
      </div>

      <div className={styles.createCollectionContainer}>
        <h3 className={styles.headingCreateCollection}>
          Создать векторную коллекцию
        </h3>
        <div className={styles.controlBlockContainer}>
          <input
            placeholder="Название"
            value={collectionData?.name || ""}
            onChange={(e) => {
              setCollectionData({
                ...collectionData,
                name: e.target.value.trim(),
                type: collectionData?.type || "",
              });
            }}
            className={styles.createInput}
          />
          {collectionData?.name && (
            <select
              style={{ marginLeft: "3%" }}
              onChange={(e) => {
                setCollectionData({
                  ...collectionData,
                  type: e.target.value,
                });
              }}
              className={styles.createInput}
            >
              <option value={"default"}>Укажите тип</option>
              <option value={"default"}>По умолчанию</option>
              <option value={"avito"}>Авито</option>
              <option value={"telegram"}>Telegram</option>
            </select>
          )}

          {collectionData?.name && (
            <button
              onClick={createVectorCollections}
              className={styles.createButton}
            >
              Сохранить
            </button>
          )}
        </div>
      </div>
      {currentCollections && currentCollections.length > 0 && (
        <div className={styles.createCollectionContainer}>
          <p className={styles.headingCreateCollection}>
            Удалить векторную коллекцию
          </p>
          <div className={styles.controlBlockContainer}>
            <select
              onChange={(e) => {
                setCollectionForDelete(Number(e.target.value));
              }}
              className={styles.createInput}
            >
              <option value={0}>Выбрать коллекцию</option>
              {currentCollections?.map((collection: VectorCollection) => (
                <option key={collection.id} value={collection.id}>
                  {collection.name}
                </option>
              ))}
            </select>
            {collectionForDelete && collectionForDelete !== 0 ? (
              <button
                onClick={deleteVectorCollections}
                className={styles.createButton}
              >
                Удалить
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
      {currentCollections && currentCollections.length > 0 && (
        <div className={styles.createCollectionContainer}>
          <p className={styles.headingCreateCollection}>
            Загрузить данные для дополненой генерации
          </p>
          <div className={styles.controlBlockContainer}>
            <select
              onChange={(e) => {
                setCollectionForUpload(Number(e.target.value));
              }}
              className={styles.createInput}
            >
              <option value={0}>Выбрать коллекцию</option>
              {currentCollections?.map((collection: VectorCollection) => (
                <option key={collection.id} value={collection.id}>
                  {collection.name}
                </option>
              ))}
            </select>
            {collectionForUpload ? (
              <div className={styles.uploadContainer}>
                <FaFileAlt className={styles.fileIcon} />
                <p className={styles.fileText}>Загрузить файл</p>
              </div>
            ) : ""}
          </div>
        </div>
      )}
    </div>
  );
};

export default RagSection;
