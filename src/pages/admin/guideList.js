import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { GuideListResults } from '../../components/adminGuide';
import { GuideListToolbar } from '../../components/adminGuide/guide_toolbar';
import { customers } from '../../__mocks__/customers';

const AdminGuideList = () => (
  <>
    <Head>
      <title>
        Admin Guide List | Localguidepal
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <GuideListToolbar />
        <Box sx={{ mt: 3 }}>
          <GuideListResults guides={customers} />
        </Box>
      </Container>
    </Box>
  </>
);
AdminGuideList.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default AdminGuideList;
