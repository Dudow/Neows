import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

export const SubscriptionButton = ({ priceId }: SubscribeButtonProps) => {
  return (
    <button type="button" className={styles.subscriptionButton}>
      Subscribe now
    </button>
  );
};
