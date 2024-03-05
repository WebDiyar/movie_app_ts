import { useState, KeyboardEvent, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import ContentWrapper from '../contentWrapper/ContentWrapper';
import logo from '/assets/movix-logo.svg';
import './header.scss';

const Header = () => {
  const [show, setShow] = useState<string>("top");
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location])

  const controlNavbar = useCallback(() => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top")
    }

    setLastScrollY(window.scrollY);
  }, [lastScrollY, mobileMenu]) 

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)

    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [controlNavbar])

  const handleSearchQuery = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`);

      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  }

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  }

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  }

  return (
    <header className={`header ${mobileMenu ? 'mobileView' : ''} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/")} >
          <img src={logo} alt="logo"/>
        </div>

        <ul className="menuItems">
          <li className="menuItem">Movies</li>
          <li className="menuItem">TV Shows</li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>

      </ContentWrapper>

      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={handleSearchQuery}
              />
              <VscChromeClose
                onClick={() => setShowSearch(false)}
              />
            </div>
          </ContentWrapper>
        </div>
      )}

    </header>
  )
}

export default Header
