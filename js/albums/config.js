export default function (nga, admin) {
    let album = admin.getEntity('albums');
    let user = admin.getEntity('users');

    album.listView()
        .fields([
            nga.field('id').isDetailLink(true),
            // nga.field('userId').isDetailLink(true),
            // nga.field('userId', 'reference')
            //     .isDetailLink(false)
            //     .label('User')
            //     .targetEntity(user)
            //     .targetField(nga.field('title').map(truncate)),
            // .singleApiCall(ids => ({'id': ids })),
            nga.field('userId', 'reference')
                .isDetailLink(false)
                .label('User')
                .targetEntity(user)
                .targetField(nga.field('name')),
            nga.field('title')
        ])
        .listActions(['show', 'edit', 'delete']);

    album.creationView().fields([
        nga.field('userId', 'reference')
            .label('User')
            .targetEntity(user)
            .targetField(nga.field('name'))
            .validation({ required: true }),
        nga.field('title').attributes({ placeholder: '5 chars min' })
            .validation({ required: true})
    ]);
    album.editionView().fields(album.creationView().fields());

    return album;
}