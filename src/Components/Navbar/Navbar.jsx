import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { MessagesSquare } from "lucide-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function MyNavbar() {
  const { userToken , clearUserToken } = useContext(authContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!userToken;
     const menuItems = isLoggedIn ? [ "profile", "home"] : ["register", "login"];
 function handleLogout(){
clearUserToken()
localStorage.removeItem('token')
navigate('/login')
 }

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle className="cursor-pointer" />
      </NavbarContent>
      <NavbarBrand className="flex gap-2">
        <MessagesSquare className="text-purple-800" />
        <p className="font-bold text-inherit">SOCIAL</p>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {!isLoggedIn && (
            <>
              <NavbarItem>
                <Link color="foreground" to="/register">
                  Register
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color="foreground" to="/login">
                  Login
                </Link>
              </NavbarItem>
            </>
          )}
          {isLoggedIn && (
            <NavbarItem>
              <Link color="foreground" to="/home">
                Home
              </Link>
            </NavbarItem>
          )}
        </NavbarContent>
        {isLoggedIn && (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="settings">Profile</DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              to={`/${item}`}
              size="lg"
              onClick={() => {
                setIsMenuOpen(false);
              }}
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
