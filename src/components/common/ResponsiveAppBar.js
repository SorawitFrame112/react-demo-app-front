import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';

// Define your top-level pages
const pages = ['Master', 'Home', 'ImportRate', 'Report']; // Removed SetupCurrency from here as it's now under Master

// Define your submenu items
const reportMenuItems = ['RateReport'];
const masterItems = ['Setup Currency'];


function ResponsiveAppBar() {
  const logoutAuth = useAuthStore((state) => state.logout)
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElReportMenu, setAnchorElReportMenu] = React.useState(null);
  const [anchorElMasterMenu, setAnchorElMasterMenu] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenReportMenu = (event) => {
    setAnchorElReportMenu(event.currentTarget);
    setAnchorElNav(null);
    setAnchorElMasterMenu(null);
  };

  const handleCloseReportMenu = () => {
    setAnchorElReportMenu(null);
  };


  const handleOpenMasterMenu = (event) => {
    setAnchorElMasterMenu(event.currentTarget);
    setAnchorElNav(null);
    setAnchorElReportMenu(null);
  };

  const handleCloseMasterMenu = () => {
    setAnchorElMasterMenu(null);
  };
  const handleLogOut = () => {
    logoutAuth();
  }
  const handleRouting = (path) => {
    navigate('/' + path.toLowerCase().replace(/\s/g, ''));
    handleCloseNavMenu(); 
    handleCloseReportMenu(); 
    handleCloseMasterMenu(); 
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <div key={page}>
                  {/* Mobile Report Submenu */}
                  {page === 'Report' ? (
                    <>
                      <MenuItem onClick={handleOpenReportMenu}>
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                      <Menu
                        id="report-menu-mobile"
                        sx={{ display: { xs: 'block', md: 'none' } }}
                        anchorEl={anchorElReportMenu}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        open={Boolean(anchorElReportMenu)}
                        onClose={handleCloseReportMenu}
                      >
                        {reportMenuItems.map((item) => (
                          <MenuItem key={item} onClick={() => handleRouting(item)}>
                            <Typography textAlign="center">{item}</Typography>
                          </MenuItem>
                        ))}
                      </Menu>
                    </>
                  ) : page === 'Master' ? (
                    /* Mobile Master Submenu - NEW SECTION */
                    <>
                      <MenuItem onClick={handleOpenMasterMenu}> {/* Use handleOpenMasterMenu */}
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                      <Menu
                        id="master-menu-mobile"
                        sx={{ display: { xs: 'block', md: 'none' } }}
                        anchorEl={anchorElMasterMenu}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        open={Boolean(anchorElMasterMenu)}
                        onClose={handleCloseMasterMenu}
                      >
                        {masterItems.map((item) => (
                          <MenuItem key={item} onClick={() => handleRouting(item)}>
                            <Typography textAlign="center">{item}</Typography>
                          </MenuItem>
                        ))}
                      </Menu>
                    </>
                  ) : (
                    /* Regular Mobile Menu Item */
                    <MenuItem onClick={() => handleRouting(page)}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  )}
                </div>
              ))}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Test Submitted Rate
          </Typography>

          {/* Desktop Navigation Buttons */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <React.Fragment key={page}>
                {/* Desktop Report Submenu */}
                {page === 'Report' ? (
                  <>
                    <Button
                      onClick={handleOpenReportMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {page}
                    </Button>
                    <Menu
                      id="report-menu-desktop"
                      sx={{ display: { xs: 'none', md: 'flex' } }}
                      anchorEl={anchorElReportMenu}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      open={Boolean(anchorElReportMenu)}
                      onClose={handleCloseReportMenu}
                    >
                      {reportMenuItems.map((item) => (
                        <MenuItem key={item} onClick={() => handleRouting(item)}>
                          <Typography textAlign="center">{item}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : page === 'Master' ? (
                  /* Desktop Master Submenu - NEW SECTION */
                  <>
                    <Button
                      onClick={handleOpenMasterMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {page}
                    </Button>
                    <Menu
                      id="master-menu-desktop"
                      sx={{ display: { xs: 'none', md: 'flex' } }}
                      anchorEl={anchorElMasterMenu}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      open={Boolean(anchorElMasterMenu)}
                      onClose={handleCloseMasterMenu}
                    >
                      {masterItems.map((item) => (
                        <MenuItem key={item} onClick={() => handleRouting(item)}>
                          <Typography textAlign="center">{item}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : (
                  /* Regular Desktop Button - FIX: Added missing <Button> tag */
                  <Button
                    onClick={() => handleRouting(page)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                )}
              </React.Fragment>
            ))}
          </Box>
          <Button variant='contained' onClick={handleLogOut}>LogOut</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;