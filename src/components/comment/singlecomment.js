import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';

export default function TopicCard(props) {

    var currentTime = new Date();
    var newdate = new Date(props.topics.posted);
    currentTime.setHours(currentTime.getHours());
    var timediff = currentTime - newdate;
    var seconds = Math.floor((timediff) / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    var months = Math.floor(days / 30);

    var time;
    if (months > 0) {
        time = months === 1 ? months + " month ago" : months + " months ago";
    } else if (days > 0) {
        time = days === 1 ? days + " day ago" : days + " days ago";
    } else if (hours > 0) {
        time = hours === 1 ? hours + " hour ago" : hours + " hours ago";
    } else if (minutes > 0) {
        time = minutes === 1 ? minutes + " minute ago" : minutes + " minutes ago";
    } else {
        time = seconds === 1 ? seconds + " second ago" : seconds + " seconds ago";
    }




    return (
        <Container maxWidth="lg">
            <br></br>
        <Card>
            <CardActionArea >
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.topics.commentdetails}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Typography variant="body2" color="textSecondary" component="p">
                  {props.topics.points} Upvotes | Posted {time} by {props.topics.username} | {props.topics.comments} comments
                </Typography>
                {/* <Button size="small" color="primary">
                    Share
        </Button>
                <Button size="small" color="primary">
                    Learn More
        </Button> */}
            </CardActions>
        </Card>
        </Container>
    );
}