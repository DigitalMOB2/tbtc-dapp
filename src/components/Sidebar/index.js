import { NavLink } from 'react-router-dom';
import s from './s.module.css';

export function Sidebar() {
  return (
    <aside className={s.sidebar}>
      <nav>
        <NavLink exact to="/" className={s.link} activeClassName={s.activeLink}>OVERVIEW</NavLink>
        <NavLink to="/mint" className={s.link} >MINT</NavLink>
        <NavLink to="/redeem" className={s.link} >REDEEM</NavLink>
        <NavLink to="/earn" className={s.link} >EARN</NavLink>
      </nav>
    </aside>
  );
}
