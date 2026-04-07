import React from 'react';
import TabList from '@mui/lab/TabList';

import { useTheme } from '@mui/material/styles';

interface CustomTabListProps {
    children? : React.ReactNode;
    id?: string;
    onChange: (event: React.SyntheticEvent<Element, Event>, newValue: number) => void
    ariaLabel?: string;
    sx?: object;
}

function CustomTabList({ children, onChange, id, ariaLabel, sx } : CustomTabListProps) {
    const theme = useTheme();

    return (
        <TabList
          id={id}
          onChange={(event, newValue) => onChange(event, newValue)}
          aria-label={ariaLabel}
          sx={{
            '& .MuiTabs-flexContainer': {
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.secondary.light,
              height: 4, // thickness
              borderRadius: '2px', // rounded edges
            },
            width: '100%',
            ...sx,
          }}
        >
            { children }
        </TabList>
    );
}

export default CustomTabList;
