import cn from 'classnames';
import s from './s.module.css';

export const Spinner = ({ size = 10, dark = false, style, ...rest }) => (
  <div
    className={cn(s.spinner, { [s.dark]: dark })}
    style={{ fontSize: size, ...style }}
    {...rest}
  >
    <span className="visually-hidden">Loading...</span>
  </div>
);
