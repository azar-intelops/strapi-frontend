// This Component render in index.js file
import React, { useEffect, useState } from "react";
import hen from "./../public/Polite_Chicky.gif";
import RequireButton from "./Button/RequireButton";
import UserRequireModal from "./modal/UserRequireModal";
import { RequirementModal } from "./libs/Context";
import MainNavbar from "./Navbar/MainNavbar";
import SecondContent from "./Navbar/SecondContent";
import ThirdContent from "./Navbar/ThirdContent";
import FourthNavbar from "./Navbar/FourthNavbar";
import FifthNavbar from "./Navbar/FifthNavbar";
import SixthNavbar from "./Navbar/SixthNavbar";
import Footer from "./Footer/Footer.jsx";
import Wrapper from "./Main/Wrapper";

function Nav({ handleModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserReqModal, setShowUserReqModal] = useState(false);

  return (
    <Wrapper>
        <MainNavbar />
        <SecondContent />
        <ThirdContent />
        <FourthNavbar />
        <FifthNavbar />
        <SixthNavbar />
        <Footer />
    </Wrapper>
  );
}

export default Nav;
