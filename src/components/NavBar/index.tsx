import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

export function NavBar() {
  return (
    <header className={styles.navbarContainer}>
      <div className={styles.navbarContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <a className={styles.active}>Home</a>
          <a>Posts</a>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}