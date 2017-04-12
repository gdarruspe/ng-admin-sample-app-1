export default function (nga, admin) {
    let comment = admin.getEntity('comments');
    let post = admin.getEntity('posts');

    comment.listView().fields([
        nga.field('id').isDetailLink(true),
        nga.field('name'),
        nga.field('email'),
        nga.field('body'),
        nga.field('postId', 'reference')
            .targetEntity(post)
            .targetField(nga.field('id'))
            .label('Post')
    ]);

    return comment;
}