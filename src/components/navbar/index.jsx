import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Link from "../link";

const Navbar = ({ navLinks }) => {
  return (
    <Toolbar
      component="nav"
      sx={{
        display: { xs: `none`, md: `flex` },
      }}
    >
      <Stack direction="row" spacing={4}>
        {navLinks.map(({ title, path }, i) => (
          <Link
            key={`${title}${i}`}
            href={path}
            variant="button"
            underline="none"
            sx={{ color: `black`, opacity: 0.7 }}
          >
            {title}
          </Link>
        ))}
      </Stack>
    </Toolbar>
  );
};

export default Navbar;
