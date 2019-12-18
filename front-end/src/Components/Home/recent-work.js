import React from "react";
import { withStyles } from "@material-ui/core/styles";
import api from "../../api";
import ImageCarousell from "./ImageCarousell";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    // backgroundColor: theme.palette.background.paper,
    background: "inherit"
  },
  gridList: {
    width: "90%",
    height: "450px"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
});

class RecentWork extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      work: null
    };
  }

  componentDidMount() {
    api
      .get("/home/info")
      .then(res => {
        const work = this.processData(res)
        this.setState({
          work
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  processData(data) {
    let work = []
    data.forEach(art => {
      work.push({
        original: art.imgUrl,
        thumbnail: art.imgUrl
      })
    });
    return work
  }

  render() {
    const { classes } = this.props;
    const { work } = this.state;
    return (
      <div className={classes.root}>
        {work ? <ImageCarousell work={work} /> : null }
      </div>
    );
  }
}

export default withStyles(styles)(RecentWork);
