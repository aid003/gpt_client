import { Project } from "@/types";
import { FiCopy } from "react-icons/fi";
import styles from "./TelegramSection.module.css";

const TelegramSection = ({ project }: { project: Project | null }) => {
  const textToCopy = `${process.env.NEXT_PUBLIC_TELEGRAM_BUSINESS_CONNECTION}${project?.id}`;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch (error) {
      console.error("Ошибка при копировании текста:", error);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <p className={styles.text}>{textToCopy}</p>
        <button className={styles.button} onClick={handleCopy}>
          <FiCopy className={styles.icon} /> Копировать текст
        </button>
      </div>
    </div>
  );
};

export default TelegramSection;
