import { useState } from "react";
import Link from "next/link";

export default function Navbar(){
    const [isOpen, setIsOpen] = useState(false);
    return(
        <>
          <div className="navbar">
            <div className="navbar_logo">nextmap</div>
            <div className="navbar_list">
                <Link className="navbar_list--item" href="/stores">맛집  목록</Link>
                <Link className="navbar_list--item" href="/stores/new">맛집  등록</Link>
                <Link className="navbar_list--item" href="/stores/1">맛집  가게</Link>
                <Link className="navbar_list--item" href="/users/login">로그인</Link>
            </div>
          </div>
        </>
    );
}