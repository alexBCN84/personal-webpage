var keystone = require('keystone');
var Types = keystone.Field.Types;

var Job = new keystone.List('Job', {
    label: 'Jobs',
    path: 'Jobs',
    track: true,
    autokey: {
        path: 'slug',
        from: 'position',
        unique: true
    },
    defaultSort: '-createdAt',
    schema: {
        collection: 'Jobs'
    },
    map: {
        name: 'position'
    }
});

Job.add({
    company: {
        type: String,
        label: 'Worked at'
    },
    position: {
        type: String,
        label: 'Job title',
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
    skill_set: {
        label: 'Technology stack',
        type: String
    },
    job_achievements: {
        label: 'Job Achievements',
        type: Types.TextArray,
        wysiwyg: true,
        height: 100
    }
});

Job.defaultColumns = 'position, company, from, to, publishedAt|15%';
Job.register();