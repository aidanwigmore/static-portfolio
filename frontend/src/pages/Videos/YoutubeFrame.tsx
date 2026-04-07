import Box from '@mui/material/Box';

interface YoutubeFrameProps {
    source: string[];
    currentStep?: number;
}

function YoutubeFrame({ source, currentStep = 0 } : YoutubeFrameProps) {
    return (
        <>
            <Box
                sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                }}
            >
                <iframe
                src={source[currentStep % source.length]}
                title="YouTube video player"
                style={{
                    borderRadius: '8px',
                    width: '50vw',
                    height: '65vh',
                }}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"
                referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
            </Box>
        </>
    );
}

export default YoutubeFrame;
