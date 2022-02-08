import { signIn, signOut, useSession } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";

export const SignInButton = () => {
  const { status, data } = useSession();

  return status === "unauthenticated" ? (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signIn()}
    >
      <FaGoogle color="#eba417" />
      Sign in with Google
    </button>
  ) : (
    <button type="button" className={styles.signInButton}>
      <FaGoogle color="#04b361" />
      {data?.user.name}
      <FiX
        color="#737380"
        className={styles.closeIcon}
        onClick={() => signOut()}
      />
    </button>
  );
};
