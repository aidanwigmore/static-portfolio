import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Box, MenuItem, Menu } from '@mui/material';

import {
  ChevronLeft,
  CameraRoll as CameraRollIcon,
  SdCard as SdCardIcon,
  Home as HomeIcon,
  AccountTreeTwoTone as AccountTreeTwoToneIcon,
  PermMediaTwoTone as PermMediaTwoToneIcon,
  LightModeTwoTone as LightModeTwoToneIcon,
  DarkModeTwoTone as DarkModeTwoToneIcon,
} from '@mui/icons-material';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import CustomDropdown from '@/materials/Dropdown';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CustomButton from '@/materials/Button';
import CustomTooltip from '@/materials/Tooltip';
import { CustomTypography } from '@/materials/Typography';

import { useTheme } from '@mui/material/styles';

interface NavBarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const pageNames: Record<string, string> = {
  '/': 'Home Page',
  '/projects': 'My Project Page',
  '/videos': 'My Videos Page',
  '/film-media': 'My Film Media',
  '/digi-media': 'My Digital Media',
  '/gallery': 'My Protected Galleries',
};

export default function NavBar({ isDarkMode, toggleTheme }: NavBarProps) {
  const theme = useTheme();
  const location = useLocation();

  //media
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  //projects
  const [projectsAnchorEl, setProjectsAnchorEl] = useState<null | HTMLElement>(null);
  const projectsOpen = Boolean(projectsAnchorEl);

  //videos
  const [videosAnchorEl, setVideosAnchorEl] = useState<null | HTMLElement>(null);
  const videosOpen = Boolean(videosAnchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProjectsClose = () => {
    setProjectsAnchorEl(null);
  };

  const handleVideosClose = () => {
    setVideosAnchorEl(null);
  };

  const currentPageName = pageNames[location.pathname] || 'Portfolio';

  return (
    <>
      <Box
        sx={{
          top: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: '0.5rem',
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        <CustomTooltip
          text={'Navigate to Home Page?'}
          placement="bottom"
        >
          <CustomButton to="/" component={Link}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '0.5rem',
              }}
            >
              {
                <HomeIcon
                  sx={{
                    height: '1.25rem',
                  }}
                /> 
              }
            </Box>
          </CustomButton>
        </CustomTooltip>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginLeft: '0.5rem',
            justifyContent: 'flex-start',
          }}
        >
          <CustomTypography
            variant="button"
            children={'Current Page:'}
            sx={{
              color: theme.palette.primary.main,
              fontSize: '0.5rem',
              marginBottom: '-0.5rem',
            }}
          />
          <CustomTypography
            variant="h6"
            children={currentPageName}
            sx={{
              color: theme.palette.primary.main,
            }}
          />
        </Box>
        <Box
          sx={{
            position: 'relative',
            top: 0,
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: theme.palette.secondary.main,
            padding: '0.5rem',
            flexGrow: 2,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap',
              maxWidth: '90%',
            }}
          >
            <CustomDropdown 
              links={[
                "/fxns",
                "/ideaburn",
                "/teabank",
              ]}
              onClick={(e) => setProjectsAnchorEl(e.currentTarget)}
              icons={[
                <AccountTreeTwoToneIcon sx={{ height: '1.25rem' }} />,
                <HomeRepairServiceIcon sx={{ height: '1.25rem' }} />,
                <LightbulbIcon sx={{ height: '1.25rem' }} />,
                <EmojiFoodBeverageIcon sx={{ height: '1.25rem' }} />,
              ]}
              texts={[
                "FXNS",
                "IdeaBurn",
                "TeaBank",
              ]}
              parentText="Projects"
              projectsOpen={projectsOpen}
              projectsAnchorEl={projectsAnchorEl}
              handleProjectsClose={handleProjectsClose}
            />

            <CustomDropdown 
              links={[
                "/videos",
                "/film-media",
                "/digi-media",
              ]}
              onClick={(e) => setVideosAnchorEl(e.currentTarget)}
              icons={[
                <AccountTreeTwoToneIcon sx={{ height: '1.25rem' }} />,
                <HomeRepairServiceIcon sx={{ height: '1.25rem' }} />,
                <LightbulbIcon sx={{ height: '1.25rem' }} />,
                <EmojiFoodBeverageIcon sx={{ height: '1.25rem' }} />,
              ]}
              texts={[
                "Batched",
                "Capstone",
                "PHP",
              ]}
              parentText="Videos"
              projectsOpen={videosOpen}
              projectsAnchorEl={videosAnchorEl}
              handleProjectsClose={handleVideosClose}
            />

            <CustomButton
              component={Link}
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <PermMediaTwoToneIcon
                sx={{
                  height: '1.25rem',
                }}
              />
              Media
              <ChevronLeft
                sx={{
                  height: '1.25rem',
                  transform: open ? 'rotate(90deg)' : 'rotate(270deg)',
                  transition: 'transform 0.3s',
                }}
              />
            </CustomButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                list: {
                  'aria-labelledby': 'basic-button',
                },
              }}
            >
              <MenuItem onClick={handleClose}>
                <CustomButton component={Link} to="/film-media">
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
                    <CameraRollIcon sx={{ height: '1.25rem' }} />
                    Film
                  </Box>
                </CustomButton>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <CustomButton component={Link} to="/digi-media">
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
                    <SdCardIcon sx={{ height: '1.25rem' }} />
                    Digital
                  </Box>
                </CustomButton>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginRight: '1rem',
            whiteSpace: 'nowrap',
          }}
        >
          <CustomTooltip
            text={isDarkMode ? 'Switch to Dark Mode?' : 'Switch to Light Mode?'}
            placement="bottom"
          >
            <CustomButton onClick={toggleTheme}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '0.5rem',
                }}
              >
                {isDarkMode ? (
                  <LightModeTwoToneIcon
                    sx={{
                      height: '1.25rem',
                    }}
                  />
                ) : (
                  <DarkModeTwoToneIcon
                    sx={{
                      height: '1.25rem',
                    }}
                  />
                )}
              </Box>
            </CustomButton>
          </CustomTooltip>
        </Box>
      </Box>
    </>
  );
}