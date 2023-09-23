export default function Button({ children, type = 'button', variant, ...other}) {
  return (
    <button type={type} className={`btn btn--${variant}`} {...other}>{children}</button>
  );
}
