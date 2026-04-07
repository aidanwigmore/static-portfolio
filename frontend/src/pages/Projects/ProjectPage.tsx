import Box from '@mui/material/Box';

import { useTheme } from '@mui/material/styles';

import CustomTooltip from '@/materials/Tooltip';

import CustomLink from '@/materials/Link';
import { CustomTypography } from '@/materials/Typography';

interface ProjectPageProps {
  items: (
      | {
          title: string;
          description: string[];
          ratingCode: string;
          src: string;
          images?: undefined;
      }
      | {
          title: string;
          description: string[];
          images: string[];
          ratingCode: string;
          src: string;
      }
  );
}

function ProjectPage({ items }: ProjectPageProps) {
    const theme = useTheme();
    
    const handleNavigateNewTab = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <>
            <Box
                  sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    padding: '1rem',
                    margin: '1rem',
                    backgroundColor: theme.palette.primary.contrastText,
                    flexDirection: 'column',
                    borderRadius: '8px',
                }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      p: 4,
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        <CustomTooltip
                          text={`View ${items.src} in a new tab`}
                          placement="top"
                        >
                          <CustomLink
                            onClick={() => handleNavigateNewTab(items.src)}
                            href={items.src}
                          >
                            <CustomTypography
                              color={theme.palette.primary.main}
                              variant={'h6'}
                            >
                              {items.title}
                            </CustomTypography>
                          </CustomLink>
                        </CustomTooltip>
                      </Box>
                      {items.description.map((desc: string, descIndex: number) => (
                        <CustomTypography
                          color={theme.palette.primary.main}
                          key={`${items.title}-desc-${descIndex}`}
                          variant={'body2'}
                        >
                          {`- ${desc}`}
                        </CustomTypography>
                      ))}
                    </Box>
                  </Box>

                  {items.src ? (
                    <Box
                      key={`iframe-box-${items.title}`}
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 2,
                      }}
                    >
                      <iframe
                        key={`iframe-${items.title}`}
                        src={items.src}
                        style={{
                          width: '100%',
                          maxWidth: '800px',
                          height: '600px',
                          border: 'none',
                          borderRadius: '8px',
                        }}
                        title={items.title}
                        allowFullScreen
                      />
                    </Box>
                  ) : <></>}
                </Box>
        </>
    );
}

export default ProjectPage;
