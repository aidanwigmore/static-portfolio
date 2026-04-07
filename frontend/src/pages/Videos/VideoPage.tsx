import React, { useEffect, useState } from 'react';


import { Box, Stepper, Step, StepLabel } from '@mui/material';
import YoutubeFrame from '@/pages/Videos/YoutubeFrame';

import { CustomTypography } from '@/materials/Typography';

import { CustomAccordion } from '@/materials/Accordion';

import { useTheme } from '@mui/material/styles';
import CustomButton from '@/materials/Button';

interface VideoPageProps {
  children?: React.ReactNode;
  item: {
    title: string;
    description: string;
    channel: string;
    src: string[];
    steps: {
      titles: string[];
      descriptions: string[];
      ratingCodes: string[];
      uploadDates: string[];
    };
    stepsLabels: React.ReactElement[];
  };
}

function VideoPage({
  item,
}: VideoPageProps) {
  const theme = useTheme();
  const [activeSteps, setActiveSteps] = useState<number[]>(item.steps.titles.map(() => 0));
  const [skipped, setSkipped] = useState<Set<number>>(new Set());

  const isStepOptional = (step: number) => step === 1;
  const isStepSkipped = (itemIndex: number, step: number) =>
    skipped.has(itemIndex * 100 + step);

  const handleNext = (itemIndex: number) => {
    setActiveSteps((prevActiveStep) => {
      const newSteps = [...prevActiveStep];
      newSteps[itemIndex] += 1;
      return newSteps;
    });
  };

  const handleBack = (itemIndex: number) => {
    setActiveSteps((prevActiveStep) => {
      const newSteps = [...prevActiveStep];
      newSteps[itemIndex] -= 1;
      return newSteps;
    });
  };

  const handleSkip = (itemIndex: number) => {
    if (!isStepOptional(activeSteps[itemIndex])) {
      return;
    }

    setActiveSteps((prevActiveStep) => {
      const newSteps = [...prevActiveStep];
      newSteps[itemIndex] += 1;
      return newSteps;
    });
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(itemIndex * 100 + activeSteps[itemIndex]);
      return newSkipped;
    });
  };

  const handleReset = (itemIndex: number) => {
    setActiveSteps((prevActiveStep) => {
      const newSteps = [...prevActiveStep];
      newSteps[itemIndex] = 0;
      return newSteps;
    });
  };

  useEffect(() => {
    setActiveSteps([0]);
    setSkipped(new Set());
  }, [item]);

  return (
    <>
      <CustomTypography
        color={theme.palette.secondary.contrastText}
        variant={'h6'}
        gutterBottom
        component="span"
        sx={{ flexWrap: 'wrap', textAlign: 'center' }}
      >
        {item.title} {item.description}
      </CustomTypography>
      <Box
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          backgroundColor: theme.palette.secondary.main,
          flexDirection: 'column',
          borderRadius: '8px',
          padding: '1rem',
          margin: '1rem',
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.primary.contrastText,
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Stepper activeStep={activeSteps[0]} sx={{ pt: 3, pb: 5 }}>
            {item.steps.titles.map((label: string, stepIndex: number) => {
              const stepProps: {
                completed?: boolean;
              } = {};

              if (isStepSkipped(0, stepIndex)) {
                stepProps.completed = false;
              }

              return (
                <Step
                  sx={{
                    '&.Mui-completed': {
                      '& .MuiStepIcon-root': {
                        color: `${theme.palette.secondary.dark} !important`,
                      },
                    },
                    '& .MuiStepIcon-root': {
                      color: stepIndex === activeSteps[0] 
                      ? theme.palette.secondary.light
                      : theme.palette.secondary.main,
                    },
                  }}
                  key={`step-0-${stepIndex}`}
                  {...stepProps}
                >
                  <StepLabel>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <CustomTypography
                        color={theme.palette.primary.main}
                        variant={'caption'}
                        gutterBottom
                        component="span"
                        sx={{
                          flexWrap: 'wrap',
                          textAlign: 'center',
                          textDecoration:
                            activeSteps[0] === stepIndex ? 'underline' : 'none',
                        }}
                      >
                        {label}
                      </CustomTypography>
                      <CustomTypography
                        color={theme.palette.primary.main}
                        variant={'caption'}
                        gutterBottom
                        component="span"
                        sx={{
                          flexWrap: 'wrap',
                          textAlign: 'center',
                        }}
                      >
                        Uploaded: {item.steps.uploadDates[stepIndex]}
                      </CustomTypography>
                    </Box>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
      
            <CustomTypography
              color={theme.palette.primary.main}
              variant={'caption'}
              gutterBottom
              component="span"
              sx={{
                flexWrap: 'wrap',
                maxWidth: '45vw',
                textAlign: 'center',
              }}
            >
              {item.steps.descriptions[activeSteps[0]]}
            </CustomTypography>
            
          <Box>
            {activeSteps[0] === item.steps.titles.length ? (
              <>
                <CustomTypography
                  color={theme.palette.primary.main}
                  variant={'caption'}
                  gutterBottom
                  component="span"
                  sx={{
                    flexWrap: 'wrap',
                    textAlign: 'center',
                  }}
                >
                  {`You can find more videos on the ${item.channel} Youtube
                  Channel. Thank you.`}
                </CustomTypography>
                <Box sx={{ flex: '1 1 auto' }} />
                <CustomButton onClick={() => handleReset(0)}>
                  Reset
                </CustomButton>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <CustomButton
                    disabled={activeSteps[0] === 0}
                    onClick={() => handleBack(0)}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </CustomButton>
                  <Box
                    sx={{
                      flex: '1 1 auto',
                    }}
                  />
                  {isStepOptional(0) && (
                    <CustomButton
                      color="inherit"
                      onClick={() => handleSkip(0)}
                      sx={{ mr: 1 }}
                    >
                      Skip
                    </CustomButton>
                  )}
                  <CustomButton onClick={() => handleNext(0)}>
                    {activeSteps[0] === item.steps.titles.length - 1
                      ? 'Finish'
                      : 'Next'}
                  </CustomButton>
                </Box>
              </>
            )}
          </Box>

          <YoutubeFrame source={item.src} currentStep={activeSteps[0]} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            {/* transcriptions */}
            {item.stepsLabels ? (
              <CustomAccordion item={item} currentStep={activeSteps[0]} />
            ) : (
              ''
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default VideoPage;