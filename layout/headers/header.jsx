import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useContext } from 'react'
import React from 'react';
import Menu from './menu';
import { extra_info, logo } from '../../data/header/header';
import { search_bar } from '../../redux/features/search-slice';
import Search from '../../components/common/search';
import Cart from '../../components/common/cart';
import useSticky from '../../hooks/use-sticky';
import useCartInfo from '../../hooks/use-cart-info';
import useGlobalContext from '../../hooks/use-context';
import Sidebar from '../../components/common/sidebar';
import { UserContext } from '../../src/contexts/UserContext';
import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify';
import{handleSearch} from '../../components/common/search'

const Header = ({ header_big,white_bg }) => {
  const dispatch = useDispatch();
  const { headerSticky } = useSticky();
  const { quantity } = useCartInfo();
  const {setShowSidebar} = useGlobalContext();
  const { user } = useContext(UserContext);

  const signOut=async function signOut() {
    try {
        await Auth.signOut();
        toast.info(`See you soon`, {
          position: 'top-left'
        })
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

  return <>
    <header>
      <div id="header-sticky" className={`header__area ${header_big ? 'box-25' : !white_bg && 'grey-bg'} 
      ${headerSticky ? 'sticky' : ''}`}>
        <div className={`${header_big ? 'container-fluid' : 'container'}`}>
          <div className="row align-items-center">
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4">
              <div className="logo">
                <Link href="/">

                  <Image src={logo} alt="logo" />

                </Link>
              </div>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-8 col-sm-8">
              <div className="header__right p-relative d-flex justify-content-between align-items-center">
                <div className="main-menu d-none d-lg-block">
                  <nav>
                    <Menu />
                  </nav>
                </div>
                <div className="mobile-menu-btn d-lg-none">
                  <button onClick={()=> setShowSidebar(true)} className="mobile-menu-toggle">
                    <i className="fas fa-bars"></i>
                  </button>
                </div>
                <div className="header__action">
                  <ul>
                    {<li>
                      <button className="search-toggle" onClick={() => dispatch(search_bar(true))}>
                        <i className="ion-ios-search-strong"></i> Search</button>
                    </li> }
                    <li>
                      <button className="cart">
                        <i className="ion-bag"></i> Cart <span>({quantity})</span>
                      </button>
                      {/* cart area start */}
                      <Cart />
                      {/* cart area end */}
                    </li>
                 
                    <li> 
                 
                    {user && (
                      <div>
                      <button ><i className="fas fa-user-alt"></i></button>
                      <ul className="extra-info">
                    {extra_info.map((item, index) => (
                      <li key={index}>
                        <div className={`${item.class}`}>
                          <div className="extra-title">
                            <h5>{item.title}</h5>
                          </div>
                          <ul>
                            {item.listItems.map((list, index) => (
                              <li key={index}>
                                <Link href={`${list.link}`}>{`${list.title}`}</Link>
                              </li>
                              
                            ))}
                            <li  style={{ cursor: 'pointer' }} onClick={async () => {
                              try {
                                await Auth.signOut();
                                toast.info(`Aurvoir`, {
                                  position: 'top-left'
                                })
                            } catch (error) {
                                console.log('error signing out: ', error);
                            }
                          }
                            }>
                            Logout
                            </li>
                          </ul>
                        </div>
                      </li>
                    ))}
                  </ul>
                  </div>
                   )}
                    {!user && (
                      <div>
                      <button ><i className="far fa-user"></i></button>
                      <div className="mini-cart">
                      <div className="checkout-link">
                      <Link href={'/login'} className="os-btn">
                        Login
                      </Link>
                      <Link href={'/register'} className="os-btn os-btn-black">
                        register
                      </Link>
                    </div>
                    </div>
                    </div>
                      )}
                    
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    {/* search area start */}
    <Search/>
    {/* search area end */}

    {/* sidebar start */}
    <Sidebar/>
    {/* sidebar end */}

  </>;
};

export default Header;