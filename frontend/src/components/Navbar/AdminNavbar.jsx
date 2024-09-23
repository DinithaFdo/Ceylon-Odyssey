// SideAdminDashboard.jsx
import React, { useState } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Drawer, AppBar, Toolbar, Typography, Collapse } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TimelineIcon from '@mui/icons-material/Timeline';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const drawerWidth = 240;

const AdminNavbar = () => {
  const [openAnalytics, setOpenAnalytics] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  const handleAnalyticsClick = () => {
    setOpenAnalytics(!openAnalytics);
  };

  const handleSettingsClick = () => {
    setOpenSettings(!openSettings);
  };

  const navItems = [
    { title: 'Dashboard', icon: <DashboardIcon />, segment: '/dashboard' },
    { 
      title: 'Analytics', 
      icon: <TimelineIcon />, 
      segment: '/analytics',
      subItems: [
        { title: 'Overview', segment: '/analytics/overview' },
        { title: 'Reports', segment: '/analytics/reports' },
      ],
      open: openAnalytics,
      onClick: handleAnalyticsClick,
    },
    { 
      title: 'Settings', 
      icon: <SettingsIcon />, 
      segment: '/settings',
      subItems: [
        { title: 'Profile', segment: '/settings/profile' },
        { title: 'Security', segment: '/settings/security' },
      ],
      open: openSettings,
      onClick: handleSettingsClick,
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <List>
          {navItems.map((item, index) => (
            <div key={index}>
              <ListItem button onClick={item.subItems ? item.onClick : null}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
                {item.subItems ? (item.open ? <ExpandLess /> : <ExpandMore />) : null}
              </ListItem>
              {item.subItems && (
                <Collapse in={item.open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem, subIndex) => (
                      <ListItem button key={subIndex} sx={{ pl: 4 }}>
                        <ListItemText primary={subItem.title} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </div>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginLeft: `${drawerWidth}px` }}
      >
        <Toolbar />
        <Typography paragraph>
          Welcome to the admin dashboard!
        </Typography>
        {/* Add your main content here */}
      </Box>
    </Box>
  );
};

export default AdminNavbar;


