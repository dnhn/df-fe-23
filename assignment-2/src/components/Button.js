export default function Button({ children, type = 'button', variant, ...other}) {
  return (
    <button
      type={type}
      className={`btn ${variant ? `btn--${variant}` : ''} ${other.className}`}
      {...other}
    >
      {children}
    </button>
  );
}
