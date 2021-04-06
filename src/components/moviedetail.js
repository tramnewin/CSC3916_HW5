import React, { Component } from 'react';
import { fetchMovie } from "../actions/movieActions";
import {connect} from 'react-redux';
import {Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs'
import { Image } from 'react-bootstrap';

class MovieDetail extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.title));
        }
    }

    render() {
        const DetailInfo = () => {
            if (!this.props.selectedMovie) {
                return <div>Loading....</div>
            }

            return (
                <Card>
                    <Card.Header>Movie Detail</Card.Header>
                    <Card.Body>
                        <Image className="image" src={this.props.selectedMovie.imageURL} thumbnail />
                    </Card.Body>
                    <ListGroup>
                        <ListGroupItem>{this.props.selectedMovie.Title}</ListGroupItem>
                        <ListGroupItem>
                            {this.props.selectedMovie.Actors.map((Actor, i) =>
                                <p key={i}>
                                    <b>{Actor.ActorName}</b> {Actor.CharacterName}
                                </p>)}
                        </ListGroupItem>
                        <ListGroupItem><h4><BsStarFill/> {this.props.selectedMovie.Rating}</h4></ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        {this.props.selectedMovie.reviews.map((Review, i) =>
                            <p key={i}>
                                <b>{Review.username}</b>&nbsp; {Review.Review}
                                &nbsp;  <BsStarFill /> {Review.Rating}
                            </p>
                        )}
                    </Card.Body>
                </Card>
            )
        }

        return (
            <DetailInfo />
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedMovie: state.movie.selectedMovie
    }
}

export default connect(mapStateToProps)(MovieDetail);