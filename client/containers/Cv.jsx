import React, { Component } from 'react';
import { connect } from 'react-redux';
// Remember our thunk this is where we will need to make use of it
import { cvsFetchData } from '../actions/actions.js';
// We gonna use lodash to map over our cv object
import _ from 'lodash';
import { formatMonthAndYear } from '../helpers';
import { Container, Header, Divider } from 'semantic-ui-react';

class Cv extends Component {
    constructor(props) {
        super(props);
        // Bind our render cv to function so we can use it in the render method 
        this.renderCv = this.renderCv.bind(this)
    }

    // Fetch cvs when component is mounted
    componentDidMount() {
        const API_URL = 'http://localhost:3000/api/data/?list';
        // I am setting some delay to simulate a real world request
        setTimeout(() => { this.props.fetchCv(API_URL); }, 1000);
    }
    // Function to render our cv
    renderCv() {
        return _.map(this.props.cvs, cv => {
            // Get the html for our cv summary
            function createMarkupForSummary() {
                if (cv.summary) {
                    return {
                        __html: cv.summary,
                    };
                } else {
                    return;
                }
            };
            // Get the html for our cv objective
            function createMarkupForObjective() {
                if (cv.objective) {
                    return {
                        __html: cv.objective,
                    };
                } else {
                    return;
                }
            };

            // Make sure we show only published cvs
            if (cv.state = "published") {
                return (
                    <div key={cv._id}>
                        <Header style={{ fontFamily: "'ZCOOL KuaiLe', cursive" }} size="huge">{cv.name}</Header>
                        <p>{cv.title}</p>
                        <Divider />
                        <h2>{cv.email}</h2>
                        <h2>{cv.phone}</h2>
                        <h2>{cv.linkedin}</h2>
                        <h2>{cv.github}</h2>
                        <p>{cv.address}</p>
                        <p>{cv.city}</p>
                        <h2>Summary</h2>
                        <div dangerouslySetInnerHTML={createMarkupForSummary()} />
                        <h2> Objective </h2>
                        <div dangerouslySetInnerHTML={createMarkupForObjective()} />
                        <h2>Key Skills</h2>
                        <ul>
                            {cv.key_skills.map((skill, i) => <li key={i}>{skill}</li>)}
                        </ul>
                        <h2>Technical Skills</h2>
                        <ul>
                            {cv.techncal_skills.map((skill, i) => <li key={i}>
                                <strong>{skill.split(":")[0]}: </strong>
                                {skill.split(":")[1]}
                            </li>)}
                        </ul>
                        <h2>PROFESSIONAL EXPERIENCE IN TECH</h2>
                        {cv.job_experience.map(job => (
                            <div key={job._id}>
                                <p>{job.company}</p>
                                <p>{job.position}</p>
                                <p>{job.location}</p>
                                <p>{formatMonthAndYear(job.from)}</p>
                                <p>{formatMonthAndYear(job.to)}</p>
                                {job.job_achievements.map((achievement, index) => (
                                    achievement.split('|').map((el, index) => (
                                        index === 0
                                            ? <strong key={`${job._id}-${index}`}>{el}</strong>
                                            : <p key={`${job._id}-${index}`}>{el}</p>
                                    ))
                                ))}
                            </div>
                        ))}
                        <h2>VOLUNTEER EXPERIENCE</h2>
                        {cv.volunteer_experience.map(volunteer => (
                            <div key={volunteer._id}>
                                <p>{volunteer.organisation}</p>
                                <p>{volunteer.experience}</p>
                                <p>{volunteer.location}</p>
                                <p>{formatMonthAndYear(volunteer.from)}</p>
                                <p>{formatMonthAndYear(volunteer.to)}</p>
                                {volunteer.experience_achievements.map((achievement, index) => (
                                    achievement.split('|').map((el, index) => (
                                        index === 0
                                            ? <strong key={`${volunteer._id}-${index}`}>{el}</strong>
                                            : <p key={`${volunteer._id}-${index}`}>{el}</p>
                                    ))
                                ))}
                            </div>
                        ))}
                        <h2>BOOTCAMPS, WORKSHOPS AND TRAINING EVENTS</h2>
                        {cv.trainings.map(training => (
                            <div key={training._id}>
                                <p>{training.organisation}</p>
                                <p>{training.training}</p>
                                <p>{training.location}</p>
                                <p>{formatMonthAndYear(training.from)}</p>
                                <p>{formatMonthAndYear(training.to)}</p>
                            </div>
                        ))}
                        <h2>EDUCATION</h2>
                        {cv.education.map(course => (
                            <div key={course._id}>
                                <p>{course.title}</p>
                                <p>{course.institution}</p>
                                <p>{course.location}</p>
                                <p>{formatMonthAndYear(course.to)}</p>
                            </div>
                        ))}
                        <h2>LANGUAGES</h2>
                        {cv.languages}
                    </div>
                );
            }
        });
    }

    render() {

        // If data is still loading 
        if (this.props.loading) {
            return (
                <div>
                    <h1>LOADING...</h1>
                </div>
            );
        }
        // Show cv once data is loaded
        return (
            <Container>
                {this.renderCv()}
            </Container>
        );
    };
};

function mapStateToProps(state, ownProps) {
    // Things return here are showing in props for Cvs
    return {
        cvs: state.cvs,
        loading: state.loadCvs,
    };
}

// anything returned from here will end up in the props
const mapDispatchToProps = dispatch => ({
    // Our thunk will be mapped to this.props.fetchCv
    fetchCv: (url) => dispatch(cvsFetchData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cv);