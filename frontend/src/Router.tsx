import { Routes, Route, useLocation } from 'react-router-dom';

import Home from '@/pages/Home';
import Videos from '@/pages/Videos/VideosIndex';
import Projects from '@/pages/Projects/ProjectsIndex';

import Navbar from '@/components/Navbar';

import { PageTransition } from '@/components/PageTransition';
import { AnimatePresence } from 'framer-motion';

import InstagramGallery from '@/pages/Gallery/InstagramGallery';
import MRKTRoutes from '@/data/MrktRoutes';
import FilmRoutes from '@/data/FilmRoutes';
import DigitalRoutes from '@/data/DigitalRoutes';
import Box from '@mui/material/Box';

import ProjectPage from '@/pages/Projects/ProjectPage';

import { useTheme } from '@mui/material/styles';
import ProjectData from './pages/Projects/ProjectData';
import Title from './components/Title';

interface RouterProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

function Router({ isDarkMode, toggleTheme }: RouterProps) {
  const location = useLocation();
  const theme = useTheme();

  const items = ProjectData;
  
  return (
    <>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.contrastText,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Home />
                </Box>
              </PageTransition>
            }
          />
          <Route
            path="/videos"
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
                  <Videos />
                </Box>
              </PageTransition>
            }
          />
          <Route
            path="/projects"
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
                  <Projects />
                </Box>
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
                  <ProjectPage items={items[0]} />
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
                  <ProjectPage items={items[2]} />
                </Box>
              </PageTransition>
            }
          />
          <Route
            path="/mrkt-media"
            element={
              <PageTransition>
                <Box
                  sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: theme.palette.secondary.main,
                  }}
                >
                  <InstagramGallery
                    color={theme.palette.primary.main}
                    title={'MRKTBox Memories'}
                    routes={MRKTRoutes}
                  />
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
                  <InstagramGallery title={'Film Media'} routes={FilmRoutes} />
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
                  <InstagramGallery title={'Digital Media'} routes={DigitalRoutes} />
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