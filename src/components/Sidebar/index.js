import { NavLink } from 'react-router-dom';
import s from './s.module.css';

export function Sidebar() {
  return (
    <aside className={s.sidebar}>
      <nav className={s.nav}>
        <NavLink exact to="/" className={s.link} activeClassName={s.activeLink}>
          OVERVIEW
        </NavLink>
        <NavLink to="/mint" className={s.link} activeClassName={s.activeLink}>
          MINT
        </NavLink>
        <NavLink to="/redeem" className={s.link} activeClassName={s.activeLink}>
          REDEEM
        </NavLink>
        <NavLink to="/earn" className={s.link} activeClassName={s.activeLink}>
          EARN
        </NavLink>
      </nav>
    </aside>
  );
}
