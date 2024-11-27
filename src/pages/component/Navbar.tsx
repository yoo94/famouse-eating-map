import { useState } from "react";
import Link from "next/link";

import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

export default function Navbar(){
    const [isOpen, setIsOpen] = useState(false);
    return(
        <>
          <div className="navbar">
            <Link className="navbar__logo" href="/">nextmap</Link>
            <div className="navbar__list">
                <Link className="navbar__list--item" href="/stores">맛집  목록</Link>
                <Link className="navbar__list--item" href="/stores/new">맛집  등록</Link>
                <Link className="navbar__list--item" href="/stores/1">맛집  가게</Link>
                <Link className="navbar__list--item" href="/users/login">로그인</Link>
            </div>
            <div role="presentation" className="navbar__button" onClick={()=> setIsOpen((val) => !val)}>
              {isOpen ? <AiOutlineClose/> : <BiMenu/>}
            </div>
          </div>
          {/* mobile */}
          {isOpen &&
            <div className="navbar--mobile">
              <div className="navbar__list--mobile">
                  <Link className="navbar__list--item--mobile" href="/stores">맛집  목록</Link>
                  <Link className="navbar__list--item--mobile" href="/stores/new">맛집  등록</Link>
                  <Link className="navbar__list--item--mobile" href="/stores/1">맛집  가게</Link>
                  <Link className="navbar__list--item--mobile" href="/users/login">로그인</Link>
              </div>
            </div>
          }
          
        </>
    );
}