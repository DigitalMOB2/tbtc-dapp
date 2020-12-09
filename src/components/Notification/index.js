import React from 'react';
import cn from 'classnames';
import s from './s.module.css';

/**
 * @param {Object} params
 * @param {TGeneralContext$notification} params.n
 * @param {Function} params.onClose
 */
export const Notification = ({ n, onClose }) => {
  React.useEffect(() => {
    if (n.timeout && n.timeout !== Infinity) {
      setTimeout(onClose, n.timeout, n.id);
    }
  }, [n.timeout]);

  return (
    <div className={cn(s.notification, s[n.level])}>
      {n.message}
      <button
        className={`button button--icon ${s.close}`}
        onClick={() => onClose(n.id)}
        type="button"
        aria-label="Close"
      >
        <svg viewBox="0 0 10 10" aria-hidden="true">
          <path
            d="M9.95 1.464L6.414 5 9.95 8.536 8.536 9.95 5 6.414 1.464 9.95.05 8.536 3.586 5 .05 1.464 1.464.05 5 3.586 8.536.05z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};
