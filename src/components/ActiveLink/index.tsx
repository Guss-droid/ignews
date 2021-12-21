import { cloneElement, ReactElement } from 'react'
import { useRouter } from 'next/router'
import Link, { LinkProps } from 'next/link'

interface IActiveLink extends LinkProps {
  children: ReactElement;
  activeClassName: string;
}

export function ActiveLink({ children, activeClassName, ...props }: IActiveLink) {

  const { asPath } = useRouter()

  const className = asPath === props.href ? activeClassName : ''

  return (
    <Link {...props}>
      {cloneElement(children, {
        className,
      })}
    </Link>
  )
}