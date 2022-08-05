const ProgressBar = ({
  color = 'blue',
  height = 1,
  percent,
  className = ''
}) => {
  return (
    <span
      className={`w-full sm:w-[200px] h-${height} bg-gray-200 block rounded-md relative ${className}`}
    >
      <span
        className={`absolute rounded-md top-0 left-0 block h-full bg-${color}-400`}
        style={{
          width: `${percent}%`
        }}
      />
    </span>
  )
}

export default ProgressBar
