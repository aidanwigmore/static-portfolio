import VideosIndex from '@/pages/Videos/VideoIndex';
import ProjectsIndex from '@/pages/Projects/ProjectIndex';
import InstagramGalleryIndex from '@/pages/Gallery/InstagramGalleryIndex';

import Title from '@/components/Title';

import MotionBox from '@/materials/MotionBox';

import { useTheme } from '@mui/material/styles';

export default function Home() {

  const theme = useTheme();

  return (
    <>
      <MotionBox>
        <Title
          color={theme.palette.secondary.contrastText}
          variant="h6"
          children={"Projects I've Worked On"}
        />
        <ProjectsIndex/>
      </MotionBox>

      <MotionBox>
        <Title
          color={theme.palette.secondary.contrastText}
          variant="h6"
          children={"Videos I've Worked On"}
        />
        <VideosIndex/>
      </MotionBox>

      <MotionBox>
        <Title
          color={theme.palette.secondary.contrastText}
          variant="h6"
          children={"Instagram Galleries"}
        />
        <InstagramGalleryIndex/>
      </MotionBox>
    </>
  );
}