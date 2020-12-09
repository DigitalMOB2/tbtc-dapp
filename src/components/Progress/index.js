import cn from 'classnames';
import s from './s.module.css';

export const Progress = ({ options, activeIndex }) => {
  return (
    <div className={s.wrap}>
      <ul className={s.items}>
        {options.map(({ name, description }, idx) => {
          const complete = idx < activeIndex;
          return (
            <li
              key={idx}
              className={cn(s.item, {
                [s.active]: idx === activeIndex,
                [s.complete]: complete,
              })}
            >
              {complete && (
                <div className={s.checkMark}>
                  <svg width="16" height="16">
                    <use xlinkHref="/sprite.svg#check" />
                  </svg>
                </div>
              )}
              <div className={s.name}>{name}</div>
              <div className={s.description}>{description}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
