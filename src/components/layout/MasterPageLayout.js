import { Stack, Typography } from '@mui/material';

export function MasterPageLayout({ title, content }) {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Stack spacing={2}>
        {content}
      </Stack>
    </>
  );
}
export default MasterPageLayout