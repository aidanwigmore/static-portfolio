import { Routes, Route, useLocation } from 'react-router-dom';

import Home from '@/pages/Home';

import Navbar from '@/components/Navbar';

import { PageTransition } from '@/components/PageTransition';
import { AnimatePresence } from 'framer-motion';

import InstagramGallery from '@/pages/Gallery/GalleryPage';
import FilmRoutes from '@/data/FilmRoutes';
import DigitalRoutes from '@/data/DigitalRoutes';
import Box from '@mui/material/Box';

import ProjectPage from '@/pages/Projects/ProjectPage';
import VideoPage from '@/pages/Videos/VideoPage';

import { useTheme } from '@mui/material/styles';
import ProjectData from './data/ProjectData';
import Title from './components/Title';
import VideoData from './data/VideoData';

interface RouterProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

function Router({ isDarkMode, toggleTheme }: RouterProps) {
  const location = useLocation();
  const theme = useTheme();

  const items = ProjectData;
  const videoItems = VideoData;
  
  return (
    <>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                  <Home />
              </PageTransition>
            }
          />
          <Route
            path="/fxns"
            element={
              <PageTransition>
                <Box
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    margin: '1rem',
                    borderRadius: '8px',
                    width: theme.widths?.card,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Title
                    color={theme.palette.primary.contrastText}
                    variant="h6"
                    children={"FXNS - Tool Making Application"}
                  />
                  <ProjectPage items={items[2]} />
                </Box>
              </PageTransition>
            }
          />
          <Route
            path="/teabank"
            element={
              <PageTransition>
                <Box
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    margin: '1rem',
                    borderRadius: '8px',
                    width: theme.widths?.card,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Title
                    color={theme.palette.primary.contrastText}
                    variant="h6"
                    children={"TeaBank - Tea Purchasing E-Commerce Platform"}
                  />
                  <ProjectPage items={items[1]} />
                </Box>
              </PageTransition>
            }
          />
          <Route
            path="/ideaburn"
            element={
              <PageTransition>
                <Box
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    margin: '1rem',
                    borderRadius: '8px',
                    width: theme.widths?.card,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Title
                    color={theme.palette.primary.contrastText}
                    variant="h6"
                    children={"IdeaBurn - Idea Management Platform"}
                  />
                  <ProjectPage items={items[0]} />
                </Box>
              </PageTransition>
            }
          />
          <Route
            path="/batched-videos"
            element={
              <PageTransition>
                <Box
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    margin: '1rem',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <VideoPage item={videoItems[0]}/>
                </Box>
              </PageTransition> 
            }
          />
          <Route
            path="/capstone-videos"
            element={
              <PageTransition>
                <Box
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    margin: '1rem',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <VideoPage item={videoItems[1]}/>
                </Box>
              </PageTransition> 
            }
          />
          <Route
            path="/php-videos"
            element={
              <PageTransition>
                <Box
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    margin: '1rem',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <VideoPage item={videoItems[2]}/>
                </Box>
              </PageTransition> 
            }
          />
          <Route
            path="/film-media"
            element={
              <PageTransition>
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.contrastText,
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <InstagramGallery home={false} title={'Film Media'} routes={FilmRoutes} />
                </Box>
              </PageTransition>
            }
          />
          <Route
            path="/digi-media"
            element={
              <PageTransition>
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.contrastText,
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <InstagramGallery home={false} title={'Digital Media'} routes={DigitalRoutes} />
                </Box>
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default Router;