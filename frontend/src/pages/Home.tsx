import Videos from '@/pages/Videos/VideosIndex';
import Projects from '@/pages/Projects/ProjectsIndex';
import InstagramGalleries from '@/pages/Gallery/InstagramGalleryIndex';

import MotionBox from '@/materials/MotionBox';

export default function Home() {

  return (
    <>
      <MotionBox>
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