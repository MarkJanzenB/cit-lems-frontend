

import { Paper, styled } from "@mui/material";

const StyledPaper = styled(Paper)(({ theme, width, height }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: width || 'auto', // Default to 'auto' if width is not provided
    height: height || 'auto', // Default to 'auto' if height is not provided
}));

export default StyledPaper;