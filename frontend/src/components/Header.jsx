import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FaBell } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { Context } from "../context/contextApi";
import Carousel from "./Carousel";
// import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Reducers/authReducer';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

import Loader from "./Loader";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");
    // const {loading,mobile,setMobile}=useContext(Context);
    const { loading, mobileMenu, setMobileMenu } = useContext(Context);

    const navigate = useNavigate();
    const searchQueryHandler = (event) => {
        if (
            (event?.key === "Enter" || event === "searchButton") &&
            searchQuery?.length > 0
        ) {
            navigate(`/searchResult/${searchQuery}`);
        }
    };

    const mobileMenuToggle = () => {
        setMobileMenu(!mobileMenu);
    };
    const { pathname } = useLocation();
    const pageName = pathname?.split("/")?.filter(Boolean)?.[0];
    // const navigate=useNavigate()
  const user=useSelector((state)=>state.auth.user);
  const dispatch=useDispatch();
  const handleLogout=()=>{
    dispatch(loginUser());
    signOut(auth);
    navigate('/')
  
  }
    return (
        <div className="sticky p-4 gap-4 top-0 z-10 flex flex-row flex-wrap glass-effect items-center justify-between min-h-20 md:px-5 glass-effect  ">
               {loading && <Loader />}
            <Link to="/" className="flex min-h-5 items-center">
            <h1 className="text-white font-bold logo text-4xl cursor-pointer tracking-wide hidden dark:md:block">ORCHID</h1>
            <h1 className="text-white font-bold logo text-2xl  cursor-pointer tracking-wide md:hidden">ORCHID</h1>
            </Link>
            <div className="group flex items-center">
                <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
                    <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
                        <IoIosSearch className="text-white text-xl" />
                    </div>
                    <input
                        type="text"
                        className="bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyUp={searchQueryHandler}
                        placeholder="Search"
                        value={searchQuery}
                    />
                </div>
                <button
                    className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]"
                    onClick={() => searchQueryHandler("searchButton")}
                >
                    <IoIosSearch className="text-white text-xl" />
                </button>
            </div>
            
            <div className="flex items-center gap-4 font-medium text-white">
                <FaBell className="mt-1 cursor-pointer"/>
                <h2 className="text-sm">WELCOME,{user==null?"":user.username}</h2>
                <button onClick={handleLogout}>logout</button>
            </div>
        
        </div>
    );
}

export default Header;
