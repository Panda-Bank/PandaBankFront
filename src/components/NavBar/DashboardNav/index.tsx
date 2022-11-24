import { useContext } from "react";
import { AuthContext } from "../../../libs/contexts/AuthContext";
import { handleChangePage } from "../../../libs/tools";
import { EButton } from "../../Button";
import styles from "./styles.module.scss";

type props = {
  variant?: string;
  nome?: string;
};

export function DashBoardNavbar({ variant, nome }: props) {
  const { attUser } = useContext(AuthContext);

  return variant != "settings" ? (
    <header className={styles.header}>
      <nav className={styles["header_nav"]}>
        <EButton
          onClick={() => handleChangePage("/dashboard/config")}
          color="tertiary"
        >
          configurações
        </EButton>
        <EButton onClick={() => attUser()} color="tertiary">
          Atualizar
        </EButton>
      </nav>
      <div className={styles["header_name"]}>
        <p>
          <span>Bem vindo(a)</span>, {nome}
        </p>
      </div>
    </header>
  ) : (
    <header className={styles.header}>
      <nav className={styles["header_nav"]}>
        <EButton onClick={() => handleChangePage("dashboard")} color="tertiary">
          Dashboard
        </EButton>
      </nav>
      <div className={styles["header_name"]}>
        <p>
          <span>Configurações de </span> {nome}
        </p>
      </div>
    </header>
  );
}
