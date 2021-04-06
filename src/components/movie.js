import React, { Component }  from 'react';
import {connect} from "react-redux";
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { withRouter } from "react-router-dom";
import {fetchMovie} from "../actions/movieActions";
import {submitReview} from "../actions/movieActions";
import { Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import * as PropTypes from "prop-types";
import {BsStarFill} from "react-icons/bs";
//support routing by creating a new component


class Movie extends Component {

    constructor(){
        super();

        this.updateDetails = this.updateDetails.bind(this);
        this.review = this.review.bind(this);
        this.state = {
            details:{
                Name: '',
                Rating: '',
                Review: ''
            }
        };
    }
    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }

    review(){
        const {dispatch} = this.props;
        dispatch(submitReview(this.state.details));
    }

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null)
            dispatch(fetchMovie(this.props.movieId));
    }

    render() {
        const ActorInfo = ({actors = []}) => {
            return actors.map((actor, i) =>
                <p key={i}>
                    <b>{actor.ActorName}</b> {actor.CharacterName}
                </p>
            );
        };

        const ReviewInfo = ({reviews = []}) => {
            return reviews.map((review, i) =>
                <p key={i}>
                    <b>{review.Name}</b> {review.Review}
                    <BsStarFill glyph={'star'} /> {review.Rating}
                </p>
            );
        }
        const MovieReview = ({currentReview}) =>{
            return (
                <Form horizontal>
                    <FormGroup controlId="Name">
                        <Col componentClass={ControlLabel} sm={2}>
                            Name
                        </Col>
                        <Col sm={10}>
                            <FormControl onChange={this.updateDetails} value={this.state.details.Name} type="Name" placeholder="Name" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="Review">
                        <Col componentClass={ControlLabel} sm={2}>
                            Review
                        </Col>
                        <Col sm={10}>
                            <FormControl onChange={this.updateDetails} value={this.state.details.Review} type="Review" placeholder="Review" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="Rating">
                        <Col componentClass={ControlLabel} sm={2}>
                            Rating
                        </Col>
                        <Col sm={10}>
                            <FormControl onChange={this.updateDetails} value={this.state.details.Rating} type="Rating" placeholder="Rating" />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button onClick={this.review}>Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
            );
        }
        const DetailInfo = ({currentMovie = []}) => {
            if (!currentMovie) { // evaluates to true if currentMovie is null
                return <div>Loading...</div>;
            }
            return (
                <Panel>
                    <Panel.Heading>Movie Detail</Panel.Heading>
                    <Panel.Body><Image className="image" src={currentMovie.imageURL} thumbnail /></Panel.Body>
                    <ListGroup>
                        <ListGroupItem>{currentMovie.title}</ListGroupItem>
                        <ListGroupItem><ActorInfo actors={currentMovie.Actors} /></ListGroupItem>
                        <ListGroupItem><h4><BsStarFill glyph={'star'} /> {currentMovie.avgRating} </h4></ListGroupItem>
                    </ListGroup>
                    <Panel.Body><ReviewInfo reviews={currentMovie.reviews} /></Panel.Body>
                    <ListGroup>
                        <ListGroupItem><MovieReview currentReview={currentMovie.Title} /></ListGroupItem>
                    </ListGroup>
                </Panel>

            );
        };
        return (
            <DetailInfo currentMovie={this.props.selectedMovie} />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return {
        selectedMovie: state.movie.selectedMovie,
        movieId: ownProps.match.params.movieId
    }
}

export default withRouter(connect(mapStateToProps)(Movie));