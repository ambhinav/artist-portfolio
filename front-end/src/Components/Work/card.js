import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        maxWidth: 600,
    },
    media: {
        height: 400,
        minWidth: 400
    },
    content: {
        background: ''
    }
});

const StyledCardContent = withStyles({
    root: {
        background: '#333333',
        color: '#E0E0E0'
    }
})(CardContent)

const MediaCard = (props) => {
    const classes = useStyles();
    const { imgUrl, title, description } = props

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={imgUrl}
                    title={title}
                />
                <StyledCardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                </StyledCardContent>
            </CardActionArea>
            {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
        </Card>
    );
}

export default MediaCard;