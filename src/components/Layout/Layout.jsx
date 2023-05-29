import { NavLink, Outlet } from 'react-router-dom';
import css from './Layout.module.css';

export default function Layout() {
  return (
    <div className={css.page__section}>
      <header>
        <ul className={css.nav__list}>
          <li className={css.nav__item}>
            <NavLink className={css.nav__link} to="/">Home</NavLink>
          </li>
          <li className={css.nav__item}>
            <NavLink className={css.nav__link} to="/movies">Movies</NavLink>
          </li>          
        </ul>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
}
