import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { UserRole } from "@/utils/schema";
import { useUserLogoutQuery } from "@/hooks/use-users-query";
import { sideBarMenu } from "@/utils/constant";
import defineAbilitiesFor from "@/utils/abilities";


interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const pathname = usePathname();
  const { user, dispatch } = useContext(AuthContext);
  const ability = defineAbilitiesFor(user);
  const router = useRouter();
  const { mutateAsync: logoutUser, isPending } = useUserLogoutQuery();

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch({ type: "LOGOUT" });
      router.push("/login");
    } catch (error) {
      // Handle error if needed
    }
  };

  return (
    <Box sx={{ p: 1, height: '100%' }}>
      <Box
        sx={{
          backgroundColor: '#171B36',
          color: 'white',
          borderRadius: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          {/* Header Section */}
          {open ?
            <Box sx={{
              px: 2,
              pt: 1,
              mb: 2,
              display: "flex", justifyContent: "center", alignItems: "center"
            }}>

              <MenuIcon onClick={() => setOpen((prev) => !prev)} sx={{
                cursor: "pointer", "&:hover": {
                  color: '#115293'
                },
              }} />
              <AutoStoriesOutlinedIcon sx={{ width: 28, height: 28, color: '#117693' }} />
            </Box> :
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                pt: 1,
                mb: 2,
              }}
            >
              <MenuIcon onClick={() => setOpen((prev) => !prev)} sx={{
                cursor: "pointer", "&:hover": {
                  color: '#115293'
                }
              }} />
              <AutoStoriesOutlinedIcon sx={{ width: 35, height: 35, color: '#117693' }} />
              <Typography sx={{ fontSize: 20, color: '#117693' }}>Book Rent</Typography>
            </Box>
          }



          {/* Menu Section */}
          <List sx={{ px: 1 }}>
            {sideBarMenu.map((item, index) => {
              if (ability.can('view', item.id)) {
                const title =
                  item.title === 'Login as'
                    ? `${item.title} ${user?.role === UserRole.ADMIN ? 'Owner' : 'Admin'}`
                    : item.title;

                // Common styles for the list item
                const commonStyles = {
                  textDecoration: 'none',
                  color: 'inherit',
                };

                // Disabled styles
                const disabledStyles = {
                  cursor: 'not-allowed',
                  pointerEvents: 'none',
                  opacity: 0.5,
                };

                // Determine the component to use based on whether the link should be disabled
                const Component = item.disable ? Box : Link;

                return (
                  <Box key={index}>
                    {index === sideBarMenu.length - 3 && (
                      <Divider
                        sx={{
                          my: 2,
                          borderColor: 'gray',
                        }}
                      />
                    )}
                    <Component
                      href={item.path}
                      sx={{
                        ...commonStyles,
                        ...(item.disable && disabledStyles),
                      }}
                    >
                      <ListItem disablePadding

                        sx={(theme) => ({
                          ...(item.path === pathname || item.path.startsWith("/dashboard/bookUpload") && pathname.includes("/update")) && {
                            backgroundColor: "#115293",
                          },

                          borderRadius: 2,
                          marginTop: 1,
                          "&:hover": {
                            backgroundColor: !item.disable ? "#115293" : undefined,
                          },
                        })}
                      >
                        <ListItemButton
                          onClick={() => {
                            if (item.title === 'Login as') {
                              handleLogout();
                            }
                          }}
                        >
                          {open ? <Tooltip title={title}>
                            <ListItemIcon
                              sx={{
                                color: 'white',
                                fontSize: 20,
                              }}
                            >
                              {item.icon}
                            </ListItemIcon>
                          </Tooltip> :
                            <ListItemIcon
                              sx={{
                                color: 'white',
                                fontSize: 20,
                              }}
                            >
                              {item.icon}
                            </ListItemIcon>
                          }


                          {!open &&
                            <ListItemText
                              primary={title}
                              sx={{
                                color: 'white',
                                fontSize: 12,

                              }}
                            />
                          }
                        </ListItemButton>
                      </ListItem>
                    </Component>
                  </Box>
                );
              }
              return null;
            })}

            <Divider
              sx={{
                my: 2,
                borderColor: 'gray',
              }}
            />
          </List>

        </Box>

        {/* Logout Button Section */}
        <Box sx={{ p: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button
            disabled={isPending}
            variant="contained"
            color="error"
            startIcon={<ExitToAppIcon />}
            onClick={handleLogout}
            fullWidth
            sx={{
              backgroundColor: '#45495E',
              '&:hover': {
                backgroundColor: '#d32f2f',
              },
            }}
          >
            {!open && "Logout"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
