import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MediaCard from "./card";
import { Divider } from "@material-ui/core";
import api from "../../api";

const categories = [
  "Character Design",
  "Environment Design",
  "Sketches and Misc",
  "Logos/Graphic Design"
];

const styles = theme => ({
  root: {
    flexGrow: 1,
    background: "#0f2027",
    minHeight: '950px',
    paddingBottom: '5em'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

const StyledGrid = withStyles({
  root: {
    background: "inherit",
    minHeight: "600px"
  }
})(Grid);

class Work extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      work: null
    };
  }

  componentDidMount() {
    // fetch work
    api.get("/work/info").then(res => {
      const work = this.processData(res)
      this.setState({
        work
      });
    });
  }

  processData(data) {
    let work = {
      "Character Design": [],
      "Environment Design": [],
      "Sketches and Misc": [],
      "Logos/Graphic Design": [],
      "Others": []
    };

    data.forEach(art => {
      if (art.category === categories[0]) {
        work["Character Design"].push(art);
      } else if (art.category === categories[1]) {
        work["Environment Design"].push(art);
      } else if (art.category === categories[2]) {
        work["Sketches and Misc"].push(art);
      } else if (art.category === categories[3]) {
        work["Logos/Graphic Design"].push(art);
      } else {
        work.Others.push(art)
      }
    });

    return work;
  }

  render() {
    const { classes } = this.props;
    const { work } = this.state;

    return (
      <div className={classes.root}>
        <StyledGrid
          container
          justify="center"
          spacing={3}
          direction="column"
          alignItems="center"
        >
          {work ? (
            Object.keys(work).map(category => (
              <div key={category}>
                <Grid
                  justify="center"
                  container
                  style={{ paddingTop: "50px", paddingBottom: "50px" }}
                >
                  <Typography variant="h4" style={{ color: "#fa462f" }}>
                    {category}
                  </Typography>
                </Grid>
                <Divider />
                <Grid justify="center" container spacing={3}>
                  {work[category].map(item => (
                    <Grid item>
                      <MediaCard
                        imgUrl={item.imgUrl}
                        title={item.title}
                        decription={item.text}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            ))
          ) : (
            null
          )}
        </StyledGrid>
      </div>
    );
  }
}

export default withStyles(styles)(Work);
