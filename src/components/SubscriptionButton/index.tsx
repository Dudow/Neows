import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

export const SubscriptionButton = ({ priceId }: SubscribeButtonProps) => {
  const { data: session, status } = useSession();
  const { push } = useRouter();

  const handleSubscribe = async () => {
    if (status === "unauthenticated") {
      signIn();
      return;
    }

    if (session?.activeSubscription) {
      push("/posts");
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
