import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import styles from './styles.module.scss'

export function SignInButton() {

  const isUserLogged = true

  return isUserLogged ? (
    <button
      type="button"
      className={styles.buttonContainer}
    >
      <FaGithub color="#04D361" />
      Gustavo Ré
      <FiX color="#737388" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.buttonContainer}
    >
      <FaGithub color="#EBA417" />
      Sign In With GitHub
    </button>
  )
}