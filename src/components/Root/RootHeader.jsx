import { Link } from "react-router-dom";
import NavBar from "../common/NavBar";
import { styled } from "styled-components";
import LogoLink from "../common/LogoLink";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuDrawer from "../common/MenuDrawer";
import Cookies from "js-cookie";
import { DropdownMenu } from "../common";
const StyledHeader = styled.header`
  background-color: #3072ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  position: fixed;
  top: 0;
  height: 64px;
  width: 100%;
  z-index: 100;

  .logo {
    margin-left: 25px;
  }

  .btn-container {
    display: flex;
  }

  .login-btn {
    margin-right: 25px;
  }
  .member-btn {
    margin-right: 25px;
  }
  .menu-container {
    margin-right: 25px;
  }
`;

const RootHeader = () => {
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const pages = ["about", "products", "cart"];
  const token = Cookies.get("token");

  return (
    <StyledHeader>
      <div className="logo">
        <LogoLink $logoWidth={"32px"} />
      </div>
      {isDownMd ? (
        // screen size below md
        <div className="menu-container">
          <MenuDrawer pages={pages} token={token} />
        </div>
      ) : (
        // screen size over md
        <>
          <div className="btn-container">
            <NavBar pages={pages} />
            {token ? (
              <div className="member-btn">
                <DropdownMenu></DropdownMenu>
              </div>
            ) : (
              <div className="login-btn">
                <Link to="/login">LOGIN</Link>
              </div>
            )}
          </div>
        </>
      )}
    </StyledHeader>
  );
};

export default RootHeader;
