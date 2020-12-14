export function Svg({ id, ...rest }) {
  return (
    <svg {...rest}>
      <use xlinkHref={`/sprite.svg#${id}`} />
    </svg>
  );
}
