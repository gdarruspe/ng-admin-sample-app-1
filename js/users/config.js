export default function (nga, admin) {
    let user = admin.getEntity('users');
    user.listView()
        .fields([
            nga.field('id').isDetailLink(true),
            nga.field('name'),
            nga.field('username'),
            nga.field('email')
        ])
        .listActions(['show', 'edit', 'delete']); //action icons
    user.creationView().fields([
        nga.field('name').validation({ required: true, minlength: 3, maxlength: 100 }),
        nga.field('username') .attributes({ placeholder: 'No space allowed, 5 chars min' })
            .validation({ required: true, pattern: '[A-Za-z0-9\.\-_]{5,20}' }),
        nga.field('email', 'email'),
        nga.field('address.street').label('Street'),
        nga.field('address.city').label('City'),
        nga.field('address.zipcode').label('Zipcode'),
        nga.field('phone'),
        nga.field('website')
    ]);

    user.showView().fields([
        nga.field('id'),
        nga.field('name'),
        nga.field('username'),
        nga.field('email'),
        nga.field('albums', 'referenced_list') // display list of related albums
            .targetEntity(nga.entity('albums'))
            .targetReferenceField('userId')
            .targetFields([
                nga.field('id'),
                nga.field('title').label('Title')
            ])
            .listActions(['edit'])

    ]);

    user.editionView().fields(user.creationView().fields());

    return user;
}