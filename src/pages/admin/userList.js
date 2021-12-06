import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { UserListResults } from '../../components/adminUser';
import { UserListToolbar } from '../../components/adminUser/user_toolbar';
import { customers } from '../../__mocks__/customers';

const AdminUserList = () => (
  <>
    <Head>
      <title>
        Admin User List | Localguidepal
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
        <UserListToolbar />
        <Box sx={{ mt: 3 }}>
          <UserListResults users={customers} />
        </Box>
      </Container>
    </Box>
  </>
);
AdminUserList.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default AdminUserList;
