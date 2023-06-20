import {Container, Grid,} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton'
import { useEffect } from "react";
import axios from "axios"
export const Chat = () => {
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/auth/');
  //       setUsers(response.data.filter(item => item._id !== JSON.parse(localStorage.getItem("userId"))))
  //       setfindUser(users)
  //     } catch (error) {
  //       console.error('error !:', error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);



  return (
    <Container maxWidth="lg">
      <h1>Chat</h1>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "20px" }}>Message</div>
            <div>
              <input type="text" />
            </div>
          </div>
          <div style={{ marginTop: "15px" }}>
            <button>Send Message</button>
          </div>
          <Grid item xs={12}>
            <hr/>
          </Grid>
          <Grid item xs={4}>
        <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {[1, 2, 3].map((value) => (
              <ListItem
                key={value}
                disableGutters
              >
                <ListItemText primary={`Line item ${value}`} />
              </ListItem>
            ))}
        </List>
        </Grid>
        </Grid>
        <Grid item xs={4} style={{border:"1px solid silver"}}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {[1, 2, 3].map((value) => (
              <ListItem
                key={value}
                disableGutters
                secondaryAction={
                  <IconButton aria-label="comment">
                    <CommentIcon />
                  </IconButton>
                }
              >
                <span className="bg-online" style={{width:"20px",height:"20px",borderRadius:"50%",display:'inline-block', marginRight:"5px"}}></span>
                <ListItemText primary={`Line item ${value}`} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};
