import classNames from 'classnames'

const Badge = ({ children, size = 'xs', color = 'gray', className = '' }) => {
  const classes = classNames(
    className,
    'inline-flex items-center px-2.5 py-0.5 rounded-full  font-medium',
    `text-${size}`,
    `bg-${color}-100`,
    `text-${color}-800`
  )

  return <span className={classes}>{children}</span>
}

export default Badge
