var keystone = require('keystone');
var Types = keystone.Field.Types;

var Education = new keystone.List('Education', {
    label: 'Education',
    path: 'education',
    track: true,
    autokey: {
        path: 'slug',
        from: 'title',
        unique: true
    },
    defaultSort: '-createdAt',
    schema: {
        collection: 'education'
    },
    map: {
        name: 'title'
    }
});

Education.add({
    institution: {
        type: String
    },
    title: {
        label: "title",
        type: String
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

Education.defaultColumns = 'title, organisation, from, to, publishedAt|15%';
Education.register();