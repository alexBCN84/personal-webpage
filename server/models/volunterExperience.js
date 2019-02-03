var keystone = require('keystone');
var Types = keystone.Field.Types;

var Volunteer = new keystone.List('Volunteer', {
    label: 'Volunteer Experience',
    path: 'Volunteer_experience',
    track: true,
    autokey: {
        path: 'slug',
        from: 'experience',
        unique: true
    },
    defaultSort: '-createdAt',
    schema: {
        collection: 'Volunteer_experience'
    },
    map: {
        name: 'experience'
    }
});

Volunteer.add({
    organisation: {
        type: String,
        label: 'Collaborated at'
    },
    experience: {
        type: String,
        label: 'Experience',
        index: true,
        initial: true
    },
    publishedAt: Date,
    from: {
        type: Types.Date
    },
    to: {
        type: Types.Date,
        default: Date.now
    },
    location: {
        type: String
    },
    details: {
        label: 'Details',
        type: String
    },
    experience_achievements: {
        label: 'Achievements',
        type: Types.TextArray,
        wysiwyg: true,
        height: 100
    }
});

Volunteer.defaultColumns = 'experience, organisation, from, to, publishedAt|15%';
Volunteer.register();