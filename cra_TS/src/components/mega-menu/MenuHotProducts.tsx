import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Link, Typography, Box } from '@mui/material';
// @types
import { MenuHotProductsProps } from './types';

// ----------------------------------------------------------------------

export default function MenuHotProducts({ tags, ...other }: MenuHotProductsProps) {
  return (
    <Box {...other}>
      <Typography variant="caption" fontWeight="fontWeightBold">
        Hot Products:
      </Typography>
      &nbsp;
      {tags.map((tag, index) => (
        <Link
          to={tag.path}
          key={tag.name}
          component={RouterLink}
          underline="none"
          variant="caption"
          sx={{
            color: 'text.secondary',
            transition: (theme) => theme.transitions.create('all'),
            '&:hover': { color: 'primary.main' },
          }}
        >
          {index === 0 ? tag.name : `, ${tag.name} `}
        </Link>
      ))}
    </Box>
  );
}
