import styles from './styles.module.scss'

interface ISubscribeButton {
  priceId: string
}

export function SubscribeButton({ priceId }: ISubscribeButton) {
  return (
    <button
      type="button"
      className={styles.subscribeButton}
    >
      Subscribe now
    </button>
  )
}