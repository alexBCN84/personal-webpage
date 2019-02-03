var keystone = require('keystone');
var Types = keystone.Field.Types;

var Training = new keystone.List('Trainings', {
    label: 'Trainings',
    path: 'trainings',
    track: true,
    autokey: {
        path: 'slug',
        from: 'training',
        unique: true
    },
    defaultSort: '-createdAt',
    schema: {
        collection: 'trainings'
    },
    map: {
        name: 'training'
    }
});

Training.add({
    organisation: {
        type: String,
        label: 'organisation'
    },
    training: {
        type: String,
        label: 'Courses, workshops, bootcamps',
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
    }
});

Training.defaultColumns = 'training, organisation, from, to, publishedAt|15%';
Training.register();