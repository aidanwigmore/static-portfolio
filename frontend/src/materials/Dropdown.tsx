import React from 'react';
import CustomButton from './Button';
import { ChevronLeft } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Box, MenuItem, Menu } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

interface CustomDropDownProps {
    links? : string[];
    onClick? : (event: React.MouseEvent<HTMLButtonElement>) => void;
    icons?: [React.ReactNode, React.ReactNode, React.ReactNode, React.ReactNode];
    texts?: string[];
    parentText?: string;
    projectsOpen?: boolean;
    projectsAnchorEl?: null | HTMLElement;
    handleProjectsClose?: () => void;
}

function CustomDropDown({ links, onClick, icons, texts, parentText, projectsOpen, projectsAnchorEl, handleProjectsClose } : CustomDropDownProps) {
    const theme = useTheme();
  return (
        <>
            <CustomButton
              component={Link}
              onClick={(e) => onClick && onClick(e)}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              {icons && icons[0]}
              {parentText}
              <ChevronLeft
                sx={{
                  height: '1.25rem',
                  transform: projectsOpen ? 'rotate(90deg)' : 'rotate(270deg)',
                  transition: 'transform 0.3s',
                }}
              />
            </CustomButton>

            <Menu
              anchorEl={projectsAnchorEl}
              open={projectsOpen || false}
              onClose={handleProjectsClose}
              slotProps={{
                list: {
                  'aria-labelledby': 'basic-button',
                }
              }}
              sx={{
                // background color being opaque adds a focus to the dropdown
                backgroundColor: alpha(theme.palette.secondary.dark, 0.8),
                // background color of the dropdown
                '& .MuiPaper-root': {
                  backgroundColor: theme.palette.primary.main,  
                },
              }}
            >
              <MenuItem onClick={handleProjectsClose}>
                <CustomButton
                  key="navbar-videos-custom-button"
                  component={Link}
                  to={links && links[0]}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '0.5rem',
                    }}
                  >
                    {icons && icons[1]}
                    {texts && texts[0]}
                  </Box>
                </CustomButton>
              </MenuItem>

              <MenuItem onClick={handleProjectsClose}>
                <CustomButton component={Link} to={links && links[1]}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
                    {icons && icons[2]}
                    {texts && texts[1]}
                  </Box>
                </CustomButton>
              </MenuItem>
              <MenuItem onClick={handleProjectsClose}>
                <CustomButton component={Link} to={links && links[2]}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
                    {icons && icons[3]}
                    {texts && texts[2]}
                  </Box>
                </CustomButton>
              </MenuItem>
            </Menu>
        </>
    );
}

export default CustomDropDown;
