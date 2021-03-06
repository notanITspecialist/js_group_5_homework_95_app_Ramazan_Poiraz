import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getMyPublication} from "../../actions/cocktail";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import {NavLink as ToLink} from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    root: {
        width: 300,
        height: '100%',
        margin: 5,
        textDecoration: 'none'
    },
    media: {
        height: 400
    },
    list: {
        display: 'flex',
        flexWrap: 'wrap'
    }
});

const MyPublications = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const myPublications = useSelector(state => state.cocktails.myCocktails);

    useEffect(() => {
        dispatch(getMyPublication())
    }, [dispatch]);

    const publications = myPublications.map(e => (
        <Grid item xs={3} style={{padding: '5px'}} key={e._id}>
            <Box boxShadow={3} className={classes.root} component={ToLink} to={'/cocktail/' + e._id}>
                <Card>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={e.image}
                            title={e.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {e.name}
                            </Typography>
                            {e.publish ?
                                <Chip
                                    label="Publish"
                                    icon={<DoneIcon/>}
                                /> :
                                <Chip
                                    label="Unpublished"
                                    style={{background: '#DE2900', color: '#ffffff'}}
                                    icon={<CloseIcon style={{color: '#ffffff'}}/>}
                                />
                            }
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </Grid>
    ));
    return (
        <div>
            <Typography gutterBottom variant="h4" component="h2">Your cocktails</Typography>
            <Grid container className={classes.list}>
                {publications}
            </Grid>
        </div>
    );
};

export default MyPublications;