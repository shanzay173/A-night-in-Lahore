import { Link } from 'react-router-dom'
import './Button.css'

const variants = {
  outline: 'btn btn-outline',
  solid: 'btn btn-solid',
  ghost: 'btn btn-ghost',
}

export default function Button({
  to = '/',
  onClick,
  children,
  variant = 'outline',
  className = '',
  ...rest
}) {
  const classes = `${variants[variant] || variants.outline} ${className}`

  return (
    <Link to={to} onClick={onClick} className={classes} {...rest}>
      <span className="btn__label">{children}</span>
    </Link>
  )
}