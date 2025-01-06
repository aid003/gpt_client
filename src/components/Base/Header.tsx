import { ReactNode } from "react";
import styles from "./Header.module.css";
import "./globals.css";

type HeaderProps = {
  children: ReactNode;
};

export default function Header({ children }: HeaderProps) {
  return (
    <html>
      <body className={styles.body}>
        <header className={styles.header}>
          <p>Header</p>
        </header>
        <div className={styles.bodyContainer}>{children}</div>
      </body>
    </html>
  );
}
