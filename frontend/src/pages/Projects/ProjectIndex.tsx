import React, { useState, useEffect } from 'react';

import ProjectData from '@/data/ProjectData';

import TabContext from '@mui/lab/TabContext';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Box, Tab } from '@mui/material';
import { CustomTypography } from '@/materials/Typography';

import CustomLink from '@/materials/Link';

import CustomTabList from '@/materials/TabList';
import { useTheme } from '@mui/material/styles';
import CustomTooltip from '@/materials/Tooltip';

interface ProjectIndexProps {
}

export default function ProjectIndex({  }: ProjectIndexProps) {
  const theme = useTheme();

  const [value, setValue] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const items = ProjectData;

  const handleChange = (__event: React.SyntheticEvent, newValue: number) => {
    setCurrentPage(newValue);
    setValue(newValue);
  };

  const handleNavigateNewTab = (url: string) => {
    window.open(url, '_blank');
  };

  useEffect(() => {
    const handleTabWheel = (event: Event) => {
      const wheelEvent = event as WheelEvent;
      if (wheelEvent.shiftKey) {
        event.preventDefault();
        const nextValue =
          wheelEvent.deltaY > 0
            ? Math.min(value + 1, items.length)
            : Math.max(value - 1, 1);

        if (nextValue !== value) {
          setValue(nextValue);
          setCurrentPage(nextValue);
        }
      }
    };

    const tabList = document.querySelector('[aria-label="projects-tabslist"]');
    if (tabList) {
      tabList.addEventListener('wheel', handleTabWheel as EventListener, {
        passive: false,
      });
    }

    return () => {
      if (tabList) {
        tabList.removeEventListener('wheel', handleTabWheel as EventListener);
      }
    };
  }, [value, items.length]);

  return (
    <TabContext value={value}>
      <List dense={false}>
        <CustomTabList
          id={'projects-tabslist'}
          onChange={handleChange}
          ariaLabel="projects-tabslist"
        >
          {items.map((item, index) => (
            <Tab
              sx={{
                backgroundColor: theme.palette.primary.contrastText,
                color: theme.palette.primary.main,
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: theme.palette.secondary.light,
                  color: theme.palette.primary.contrastText,
                  boxShadow: theme.shadows[3],
                },
                boxShadow: theme.shadows[3],
                marginBottom: '0.4rem',
              }}
              key={index}
              label={`${item.title}`}
              value={index + 1}
            />
          ))}
        </CustomTabList>
        {items
          .filter((item) => items.indexOf(item) === currentPage - 1)
          .map((item) => {
            const itemIndex = items.indexOf(item);
            return (
              <ListItem
                key={itemIndex}
                sx={{
                  marginTop: '1rem',
                  alignSelf: 'flex-start',
                  backgroundColor: theme.palette.primary.contrastText,
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  [theme.breakpoints.up('xl')]: {
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                  },
                  boxShadow: theme.shadows[3],
                }}
              >
                <Box
                  sx={{
                    alignSelf: 'flex-start',
                    padding: '2rem',
                    backgroundColor: theme.palette.primary.contrastText,
                    borderRadius: '8px',
                  }}
                >
                  <CustomTooltip
                    text={`View ${item.src} in a new tab`}
                    placement="top"
                  >
                    <CustomLink
                      onClick={() => handleNavigateNewTab(item.src)}
                      href={item.src}
                    >
                      <CustomTypography
                        color={theme.palette.primary.main}
                        variant={'h6'}
                      >
                        {item.title}
                      </CustomTypography>
                    </CustomLink>
                  </CustomTooltip>
                      
                  {item.description.map((desc: string, descIndex: number) => (
                    <CustomTypography
                      color={theme.palette.primary.main}
                      key={`${item.title}-desc-${descIndex}`}
                      variant={'caption'}
                      sx={{paddingTop: '0.75rem'}}
                    >
                      {`- ${desc}`}
                    </CustomTypography>
                  ))}
                </Box>

                <Box
                  key={`iframe-box-${itemIndex}`}
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: theme.palette.primary.contrastText,
                    borderRadius: '8px',
                  }}
                >
                  {item.src && (
                    <iframe
                      key={`iframe-${itemIndex}`}
                      src={item.src}
                      style={{
                        width: '100%',
                        height: '65vh',
                        border: 'none',
                        borderRadius: '8px',
                      }}
                      title={item.title}
                      allowFullScreen
                    />
                  )}
                </Box>
              </ListItem>
            );
          })}
      </List>
    </TabContext>
  );
}