import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import MinhasFotos from '../../Assets/feed.svg';
import estatisticas from '../../Assets/estatisticas.svg';
import adicionar from '../../Assets/adicionar.svg';
import sair from '../../Assets/sair.svg';
import styles from './UserHerderNav.module.css';
import useMedia from '../../Hooks/useMedia';

const UserHerderNav = () => {
  const mobile = useMedia('(max-width: 40rem)');
  const { userLogout } = React.useContext(UserContext);
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = React.useState(false);

  function handleLogout() {
    userLogout();
    navigate('/login');
  }

  const { pathname } = useLocation();
  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      {mobile && (
        <button
          aria-label="menu"
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}

      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <NavLink to="/conta" end>
          <img src={MinhasFotos} alt="" />
          {mobile && 'Minhas Fotos'}
        </NavLink>
        <NavLink to="/conta/estatisticas">
          <img src={estatisticas} alt="" />
          {mobile && 'estatisticas'}
        </NavLink>
        <NavLink to="/conta/postar">
          <img src={adicionar} alt="" />
          {mobile && 'adicionar'}
        </NavLink>
        <button onClick={handleLogout}>
          <img src={sair} alt="" />
          {mobile && 'sair'}
        </button>
      </nav>
    </>
  );
};

export default UserHerderNav;
