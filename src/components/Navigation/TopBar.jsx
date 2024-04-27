import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import {
  Avatar,
  Tooltip,
  MenuItem,
  Menu,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";
// import { RiSettings3Line } from "react-icons/ri";
import { MdDarkMode } from "react-icons/md"; //MdNotificationsActive
import { FiLogOut } from "react-icons/fi";
import { setShowSidebar } from "../../redux/slice/translationSlice";
// eslint-disable-next-line react/prop-types
const TopBar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const dispatch = useDispatch();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  
  const menus = [
    {
      id: 1,
      name: "Your Profile",
      link: "/profile",
      icon: <BiUser />,
    },
    {
      id: 3,
      name: "Dark Mode",
      link: "/dark-mode",
      icon: <MdDarkMode />,
    },
    {
      id: 4,
      name: "Sign out",
      link: "/sign-out",
      icon: <FiLogOut />,
    },
  ];

  return (
    <div className="bg-light-blue-500 text-white p-3 flex justify-between items-center z-20 w-full">
      <div className="md:hidden">
        <button onClick={() => dispatch(setShowSidebar())}>
          <BiMenu className="w-12 h-12" />
        </button>
      </div>

      <h1 className="text-2xl font-semibold hidden md:flex">Dashboards</h1>

      <nav className="mr-4 md:mr-8">
        
        <ul className="flex space-x-2 items-center">
          <li className='flex gap-4 mr-4'>
          <a href="/login" className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200">Login</a>
        <a href="/signup" className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200">Signup</a>
          </li>
          {/* <li>
            <a href="#" className="hover:text-gray-300">
              <MdNotificationsActive className="w-5 h-5" />
            </a>
          </li> */}
          <li>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {menus.map((menu) => (
                  <MenuItem key={menu.id} onClick={handleCloseUserMenu}>
                    <Link
                      to={`/${menu.link}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {menu.icon}
                      <Typography textAlign="center" className="pl-4">
                        {menu.name}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TopBar;
