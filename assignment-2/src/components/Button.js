export default function Button({
  children,
  type = 'button',
  variant,
  classes = '',
  ...other
}) {
  return (
    <button
      type={type}
      className={`btn ${variant ? `btn--${variant}` : ''} ${classes}`}
      {...other}
    >
      {children}
    </button>
  );
}
