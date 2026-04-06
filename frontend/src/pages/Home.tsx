import Videos from '@/pages/Videos/VideosIndex';
import Projects from '@/pages/Projects/ProjectsIndex';
import InstagramGalleries from '@/pages/Gallery/InstagramGalleryIndex';

import Title from '@/components/Title';

import MotionBox from '@/materials/MotionBox';

import { useTheme } from '@mui/material/styles';

export default function Home() {

  const theme = useTheme();

  return (
    <>
      <MotionBox>
        <Title
          color={theme.palette.primary.contrastText}
          variant="h6"
          children={"Projects I've Worked On"}
        />
        <Projects home={true} />
      </MotionBox>

      <MotionBox>
        <Videos home={true} />
      </MotionBox>

      <MotionBox>
        <InstagramGalleries home={true} />
      </MotionBox>
    </>
  );
}