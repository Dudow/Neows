import { signIn, useSession } from "next-auth/react";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

export const SubscriptionButton = ({ priceId }: SubscribeButtonProps) => {
  const { status } = useSession();

  const handleSubscribe = async () => {
    if (status === "unauthenticated") {
      signIn();
      return;
    }

    try {
      const response = await api.post("/subscribe");

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({
        sessionId,
      });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <button
      type="button"
      className={styles.subscriptionButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
};
