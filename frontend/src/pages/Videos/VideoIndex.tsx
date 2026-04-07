import React, { useState } from 'react';

import TabContext from '@mui/lab/TabContext';

import VideoData from '@/data/VideoData';
import YoutubeFrame from '@/pages/Videos/YoutubeFrame';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { Box, Tab, Stepper, Step, StepLabel } from '@mui/material';

import { CustomTypography } from '@/materials/Typography';

import { CustomAccordion } from '@/materials/Accordion';

import { useTheme } from '@mui/material/styles';
import CustomButton from '@/materials/Button';
import CustomTabList from '@/materials/TabList';

interface VideoIndexProps {
}

export default function VideoIndex({  }: VideoIndexProps) {
  const theme = useTheme();

  const items = VideoData;

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [value, setValue] = useState<number>(1);
  const handleChange = (__event: React.SyntheticEvent, newValue: number) => {
    setCurrentPage(newValue);
    setValue(newValue);
  };

  const [activeSteps, setActiveSteps] = useState<number[]>(items.map(() => 0));
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

  React.useEffect(() => {
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

    const tabList = document.querySelector('[aria-label="tabslist"]');
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
          id={'videos-tablist'}
          onChange={handleChange}
          aria-label="video-tabslist"
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
            const currentStep = activeSteps[itemIndex];
            const isCompleted = currentStep === item.steps.titles.length;

            return (
              <ListItem
                key={itemIndex}
                sx={{
                  marginTop: '1rem',
                  alignSelf: 'flex-start',
                  backgroundColor: theme.palette.primary.contrastText,
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: theme.shadows[3],
                }}
              >
                <Box
                  sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    backgroundColor: theme.palette.primary.contrastText,
                    flexDirection: 'column',
                    borderRadius: '8px',
                    padding: '1rem',
                  }}
                >
                  <CustomTypography
                    color={theme.palette.primary.main}
                    variant={'h6'}
                    gutterBottom
                    component="span"
                    sx={{ flexWrap: 'wrap', textAlign: 'center' }}
                  >
                    {item.title} {item.description}
                  </CustomTypography>
                  <Stepper activeStep={currentStep}>
                    {item.steps.titles.map((label: string, stepIndex: number) => {
                      const stepProps: {
                        completed?: boolean;
                      } = {};

                      if (isStepSkipped(itemIndex, stepIndex)) {
                        stepProps.completed = false;
                      }

                      return (
                        <Step
                          sx={{
                            // Override default step icon colors
                            // when stepIndex === currentStep, its the active one and should be colored accordingly
                            '&.Mui-completed': {
                              '& .MuiStepIcon-root': {
                                color: `${theme.palette.secondary.dark} !important`,
                              },
                            },
                            '& .MuiStepIcon-root': {
                              color: stepIndex === activeSteps[itemIndex] 
                              ? theme.palette.secondary.light
                              : theme.palette.secondary.main,
                            },
                          }}
                          key={`step-${itemIndex}-${stepIndex}`}
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
                                    currentStep === stepIndex ? 'underline' : 'none',
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
                  
                  <Box>
                    {isCompleted ? (
                      <React.Fragment>
                        <CustomTypography 
                          variant={'caption'}
                          gutterBottom
                          component="span"
                          color={theme.palette.primary.main} 
                        >
                          You can find more videos on the {item.channel} Youtube
                          Channel. Thank you.
                        </CustomTypography>
                          <Box sx={{ flex: '1 1 auto' }} />
                          <CustomButton onClick={() => handleReset(itemIndex)}>
                            Reset
                          </CustomButton>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <CustomTypography
                          color={theme.palette.primary.main}
                          variant={'caption'}
                          gutterBottom
                          component="span"
                          sx={{
                            textAlign: 'center',
                            maxWidth: '45vw',
                          }}
                        >
                          {item.steps.descriptions[currentStep]}
                        </CustomTypography>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          <CustomButton
                            disabled={currentStep === 0}
                            onClick={() => handleBack(itemIndex)}
                            sx={{ mr: 1 }}
                          >
                            Back
                          </CustomButton>
                          <Box
                            sx={{
                              flex: '1 1 auto',
                            }}
                          />
                          {isStepOptional(currentStep) && (
                            <CustomButton
                              color="inherit"
                              onClick={() => handleSkip(itemIndex)}
                              sx={{ mr: 1 }}
                            >
                              Skip
                            </CustomButton>
                          )}
                          <CustomButton onClick={() => handleNext(itemIndex)}>
                            {currentStep === item.steps.titles.length - 1
                              ? 'Finish'
                              : 'Next'}
                          </CustomButton>
                        </Box>
                      </React.Fragment>
                    )}
                  </Box>

                  <YoutubeFrame source={item.src} currentStep={currentStep} />

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    {/* transcriptions */}
                    {item.stepsLabels ? (
                      <CustomAccordion item={item} currentStep={currentStep} />
                    ) : (
                      ''
                    )}
                  </Box>
                </Box>
              </ListItem>
            );
          })}
      </List>
    </TabContext>
  );
}