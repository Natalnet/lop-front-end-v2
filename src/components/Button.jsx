import classNames from 'classnames'

const Button = ({
  color = 'primary',
  gradient,
  className = '',
  children,
  ...rest
}) => {
  const classes = classNames(
    'flex justify-center px-4 py-2 shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2',
    {
      ['bg-primary hover:bg-primary-700 focus:ring-primary']:
        color === 'primary',
      ['bg-secondary hover:bg-secondary-700 focus:ring-secondary']:
        color === 'secondary',
      'bg-gradient-to-r from-primary to-tertiary':
        gradient && color === 'primary'
    },
    className
  )

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}

export default Button
