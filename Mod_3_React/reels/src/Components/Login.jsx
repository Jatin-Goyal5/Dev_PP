import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Grid,
  Paper,
  CardActions,
  Typography,
  CardMedia,
  Button,
  makeStyles,
  TextField,
  Container,
} from "@material-ui/core";
import logo from "../logo.png";
import inst_img from "../insta_corousal.png";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  let { login } = useContext(AuthContext);

  // const useStyle = makeStyles();

  const handleLogin = async (e) => {
    //   email , password
    try {
      await login(email, password);
      //   console.log(user);
      props.history.push("/"); //navigate to /
    } catch (err) {
      setMessage(err.message);
      setEmail("");
      setPassword("");
    }
  };

  let useStyles = makeStyles({
    centerDivs: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      width: "100vw",
    },
    carousal: { height: "100%", backgroundColor: "lightgray" },
    fullWidth: {
      width: "100%",
    },
    centerElements: {
      display: "flex",
      flexDirection: "column",
    },
    mb: {
      marginTop: "2rem",
      marginBottom: "1rem",
    },
    padding: {
      paddingTop: "1rem",
      paddingBottom: "1rem",
    },
    alignCenter: {
      justifyContent: "center",
    },
  });
  let classes = useStyles();

  return (
    <div>
      <Container>
        <Grid container spacing={2} style={{ justifyContent: "space-around" }}>
          {/* Carousel */}
          <Grid item sm={5}>
            <img className={classes.carousal} src={inst_img}></img>
          </Grid>
          <Grid item sm={3}>
            <Card variant="outlined" className={classes.mb}>
              <CardMedia image={logo} style={{ height: "5rem", backgroundSize: "contain" }}
              ></CardMedia>
              <CardContent className={classes.centerElements}>
                <TextField label="Email" type="email" variant="outlined" value={email} size="small"
                  onChange={(e) => setEmail(e.target.value)}
                  className={classes.mb}
                ></TextField>
                <TextField label="Password" type="password" variant="outlined" value={password}
                  size="small" onChange={(e) => setPassword(e.target.value)}
                  className={classes.mb}
                ></TextField>
              </CardContent>
              <CardActions> 
                <Button variant="contained" color="primary" onClick={handleLogin}
                  className={classes.fullWidth}
                >Login
                </Button>
              </CardActions>
            </Card>
            <Card variant="outlined" className={classes.padding}>
              <Typography style={{ textAlign: "center" }}>
                Don't have an account ?
                <Button variant="contained" color="primary">
                  <Link style={{ color: "black" }} to="/signup">
                    SignUp
                  </Link>
                </Button>
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
