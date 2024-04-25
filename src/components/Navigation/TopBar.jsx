import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { RiSettings5Fill } from "react-icons/ri";
import { MdLightMode, MdNotificationsActive } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
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
import { setShowSidebar } from '../../redux/slice/translationSlice';
// eslint-disable-next-line react/prop-types
const TopBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const dispatch = useDispatch();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const settings = ["Your Profile", "Settings", "Dark Mode", "Sign out"];
  return (
    <div className="bg-light-blue-500 text-white p-4 flex justify-between items-center z-20 w-full">
      <div className="md:hidden">
        <button
          onClick={() =>
            dispatch(setShowSidebar())
          }
        >
          <BiMenu className="w-12 h-12" />
        </button>
      </div>

      <h1 className="text-2xl font-semibold">Dashboards</h1>

      <nav className="mr-4 md:mr-8">
        <ul className="flex space-x-2 items-center">
          <li>
            <a href="#" className="hover:text-gray-300">
              <MdNotificationsActive className="w-5 h-5" />
            </a>
          </li>

          {/* User Profile Section with Dropdown */}
          <li>
            {/* Profile dropdown */}
            <div className="relative ml-3">
              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <a
                    href="/profile"
                    className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-0"
                  >
                    <span>
                      <CgProfile className="w-5 h-5" />
                    </span>
                    <span>Your Profile</span>
                  </a>
                  <a
                    href="/darkmode"
                    className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-1"
                  >
                    <span>
                      <MdLightMode className="w-5 h-5" />
                    </span>
                    Dark Mode
                  </a>
                  <a
                    href="/logout"
                    className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-2"
                  >
                    <span>
                      <LuLogOut className="w-5 h-5" />
                    </span>
                    <span>Log out</span>
                  </a>
                </div>
              )}
            </div>
          </li>
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Link
                      to={`/${setting}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
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
