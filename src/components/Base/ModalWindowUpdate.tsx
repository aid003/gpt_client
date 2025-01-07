import React, { useState } from "react";
import styles from "./ModalWindowUpdate.module.css";
import { Property } from "@/types";

interface UpdateObject {
  key: string;
  updatedValue: string;
}

const Modal = ({
  isOpen,
  onClose,
  property,
  currentValue,
  projectId,
}: {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
  currentValue: string;
  projectId: number;
}) => {
  const [value, setValue] = useState<UpdateObject | null>(null);

  async function sendData(value: UpdateObject) {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}update-properties/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: projectId,
          propertyName: value.key,
          changeValue: value.updatedValue,
        }),
      });

      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        <div className={styles.mainContainer}>
          {(() => {
            switch (property.type) {
              case "string":
                return (
                  <textarea
                    className={styles.text}
                    defaultValue={currentValue}
                    onChange={(e) => {
                      setValue({
                        key: property.key,
                        updatedValue: e.target.value.trim(),
                      });
                    }}
                  />
                );

              case "number":
                return (
                  <input
                    type="number"
                    className={styles.input}
                    defaultValue={currentValue}
                    onChange={(e) => {
                      setValue({
                        key: property.key,
                        updatedValue: e.target.value.trim(),
                      });
                    }}
                  />
                );

              case "boolean":
                return (
                  <div className={styles.checkboxContainer}>
                    <label>
                      <input
                        type="checkbox"
                        checked={currentValue === "true"}
                        onChange={(e) => {
                          setValue({
                            key: property.key,
                            updatedValue: e.target.checked.toString(),
                          });
                        }}
                      />
                      {property.name}
                    </label>
                  </div>
                );

              case "select":
                return (
                  <select
                    className={styles.select}
                    defaultValue={currentValue}
                    onChange={(e) => {
                      setValue({
                        key: property.key,
                        updatedValue: e.target.value,
                      });
                    }}
                  >
                    {property.options?.map((option: string, index: number) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                );

              default:
                return <p>Тип {property.type} не поддерживается.</p>;
            }
          })()}
          <div className={styles.buttonContainer}>
            <button
              className={styles.submitButton}
              onClick={() => value && sendData(value)}
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
