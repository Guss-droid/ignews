import { signIn, signOut, useSession } from 'next-auth/client'

import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import styles from './styles.module.scss'

export function SignInButton() {

  const [session] = useSession()

  return session ? (
    <button
      type="button"
      className={styles.buttonContainer}
      onClick={() => signOut()}
    >
      <FaGithub color="#04D361" />
      {session.user.name}
      <FiX color="#737388" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.buttonContainer}
      onClick={() => signIn('github')}
    >
      <FaGithub color="#EBA417" />
      Sign In With GitHub
    </button>
  )
}