import cn from 'classnames';

import { Svg } from 'components/Svg';
import s from './s.module.css';

export const Steps = ({ currentStepIdx }) => {
  return (
    <div className={s.wrap}>
      <div className={s.container}>
        <div
          className={s.progressBar}
          style={{
            '--progress-width': `${
              currentStepIdx === null ? '0%' : ((currentStepIdx + 1) / 7) * 100
            }%`,
          }}
        />
        <div className={cn(s.item, s.done)}>START</div>
        {['1', '2', '3', '4', '5', '6'].map((item, idx) =>
          currentStepIdx === null || currentStepIdx < idx ? (
            <div className={cn(s.item, s.step)} key={item}>
              <span>{item}</span>
            </div>
          ) : (
            <Svg id="check" className={s.checkmark} />
          )
        )}
        <div className={cn(s.item, { [s.done]: currentStepIdx >= 5 })}>
          DONE
        </div>
      </div>
    </div>
  );
};
