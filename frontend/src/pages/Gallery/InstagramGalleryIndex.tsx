import React, { useState } from 'react';

import { Box, Tab } from '@mui/material';

import TabContext from '@mui/lab/TabContext';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import FilmRoutes from '@/data/FilmRoutes';
import DigitalRoutes from '@/data/DigitalRoutes';

import { useTheme } from '@mui/material/styles';
import CustomTabList from '@/materials/TabList';
import GalleryPage from './GalleryPage';

interface InstagramGalleriesProps {
  children?: React.ReactNode;
  home?: boolean;
}

const galleries = [
  { title: 'Film', routes: FilmRoutes },
  { title: 'Digital', routes: DigitalRoutes },
];

function InstagramGalleries({ home }: InstagramGalleriesProps) {
  const theme = useTheme();

  const [value, setValue] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleChange = (__event: React.SyntheticEvent, newValue: number) => {
    setCurrentPage(newValue);
    setValue(newValue);
  };

  React.useEffect(() => {
    const handleTabWheel = (event: Event) => {
      const wheelEvent = event as WheelEvent;
      if (wheelEvent.shiftKey) {
        event.preventDefault();
        const nextValue =
          wheelEvent.deltaY > 0
            ? Math.min(value + 1, galleries.length)
            : Math.max(value - 1, 1);

        if (nextValue !== value) {
          setValue(nextValue);
          setCurrentPage(nextValue);
        }
      }
    };

    const tabList = document.querySelector(
      '[aria-label="instagram-galleries-tabslist"]'
    );
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
  }, [value]);

  return (
    <>
      <TabContext value={value}>
        <Box
          sx={{
            display: 'flex',
            minHeight: home ? undefined : '85.2vh',
            borderRadius: home ? '8px' : undefined,
            flexDirection: 'column',
            paddingTop: '2vh',
            justifyContent: 'top',
            alignItems: 'center',
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <List dense={false}>
            <CustomTabList
              id={'projects-tabslist'}
              onChange={handleChange}
              ariaLabel="projects-tabslist"
            >
              {galleries.map((gallery, index) => (
                <Tab
                  sx={{
                    backgroundColor: theme.palette.primary.contrastText,
                    color: theme.palette.primary.main,
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: theme.palette.secondary.light,
                      color: theme.palette.primary.contrastText,
                    },
                  }}
                  key={index}
                  label={`${gallery.title}`}
                  value={index + 1}
                />
              ))}
            </CustomTabList>
            {galleries
              .filter((_, index) => index === currentPage - 1)
              .map((gallery) => {
                const itemIndex = currentPage - 1;

                return (
                  <ListItem key={itemIndex}>
                    <Box
                      sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '1rem',
                      }}
                    >
                      <GalleryPage
                        home={home}
                        variant={home ? 'h6' : 'h4'}
                        title={
                          itemIndex > 0
                            ? `${gallery.title} Media`
                            : `${gallery.title} Memories`
                        }
                        routes={gallery.routes}
                      />
                    </Box>
                  </ListItem>
                );
              })}
          </List>
        </Box>
      </TabContext>
    </>
  );
}

export default InstagramGalleries;