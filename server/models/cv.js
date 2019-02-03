var keystone = require('keystone');
var Types = keystone.Field.Types;
var path = require('path');

// Create a new Keystone list called Cv
var Cv = new keystone.List('Cv', {
    label: 'Cvs',
    path: 'Cvs',
    singular: 'Cv',
    autokey: {
        path: 'slug',
        from: 'name',
        unique: true
    },
    defaultSort: '-createdAt',
    schema: {
        collection: 'Cvs'
    }
});


// Finally we are gonna add the fields for our Cv
Cv.add({
    name: {
        type: String,
        initial: true,
        index: true,
        required: true
    },
    title: {
        type: String,
    },
    state: {
        type: Types.Select,
        options: 'draft, published, archived',
        default: 'draft'
    },
    author: {
        type: Types.Relationship,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    publishedAt: Date,
    email: {
        type: Types.Email
    },
    phone: {
        type: String
    },
    linkedin: {
        type: Types.Url
    },
    github: {
        type: Types.Url
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    summary: {
        type: Types.Textarea,
        wysiwyg: true,
        height: 150
    },
    objective: {
        type: Types.Textarea,
        wysiwyg: true,
        height: 100
    },
    key_skills: {
        label: "Key skills",
        type: Types.TextArray
    },
    techncal_skills: {
        label: "Technical skills",
        type: Types.TextArray
    },
    job_experience: {
        label: "Job Experience",
        type: Types.Relationship,
        ref: 'Job',
        many: true
    },
    volunteer_experience: {
        label: "Volunteer Experience",
        type: Types.Relationship,
        ref: 'Volunteer',
        many: true
    },
    trainings: {
        label: "bootcamps, workshops and training events",
        type: Types.Relationship,
        ref: 'Trainings',
        many: true
    },
    education: {
        label: "Education",
        type: Types.Relationship,
        ref: 'Education',
        many: true
    },
    languages: {
        type: String,
        label: 'languages'
    },
});


Cv.defaultColumns = 'name, state|20%, author, publishedAt|15%';
Cv.register();