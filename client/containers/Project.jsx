import React, { Component } from 'react';
import { connect } from 'react-redux';
// Remember our thunk this is where we will need to make use of it
import { projectsFetchData } from '../actions/actions.js';
// We gonna use lodash to map over our project object
import _ from 'lodash';

class Project extends Component {
    constructor(props) {
        super(props);
        // Bind our render project to function so we can use it in the render method 
        this.renderProject = this.renderProject.bind(this)
    }

    // Fetch projects when component is mounted
    componentDidMount() {
        const API_URL = 'http://localhost:3000/api/data/?list';
        // I am setting some delay to simulate a real world request
        setTimeout(() => { this.props.fetchProject(API_URL); }, 1000);
    }
    // Function to render our project
    renderProject() {
        return _.map(this.props.projects, project => {
            // Check if there is an image to be displayed
            const img = project.image ? project.image.filename : '';
            // Get the html for our project technologies
            function createMarkupForTechnologies() {
                if (project.technologiesList) {
                    return {
                        __html: project.technologiesList,
                    };
                } else {
                    return;
                }
            };
            // Get the html for our project description
            function createMarkupForProjectDescription() {
                if (project.projectDescription) {
                    return {
                        __html: project.projectDescription,
                    };
                } else {
                    return;
                }
            };
            // Make sure we show only published projects
            if (project.state = "published") {
                return (
                    <div key={project._id}>
                        <h1>{project.name}</h1>
                        <img style={{ width: '300px', height: '300px' }} src={img} />
                        <h2>Project's stack</h2>
                        {/* 
          In react we cant set HTML directly we need to use dangerouslySetInnerHTML.
          */}
                        <div dangerouslySetInnerHTML={createMarkupForTechnologies()} />
                        <h2> Project Description </h2>
                        {/* 
          Same as above
          */}
                        <div dangerouslySetInnerHTML={createMarkupForProjectDescription()} />
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
        // Show project once data is loaded
        return (
            <div>
                {this.renderProject()}
            </div>
        );
    };
};

function mapStateToProps(state, ownProps) {
    // Things return here are showing in props for Project
    return {
        projects: state.projects,
        loading: state.loadProjects,
    };
}

// anything returned from here will end up in the props
const mapDispatchToProps = dispatch => ({
    // Our thunk will be mapped to this.props.fetchProject
    fetchProject: (url) => dispatch(projectsFetchData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Project);