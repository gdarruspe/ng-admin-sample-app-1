export default function (nga, admin) {
    let post = admin.getEntity('posts');
    let user = admin.getEntity('users');

    post.listView()
        .fields([
            nga.field('id').isDetailLink(true),
            nga.field('title'),
            nga.field('body', 'text')
                .map(function truncate(value) {
                    if (!value){ return '';}
                    return value.length > 50 ? value.substr(0, 50) + '...' : value;
                }),
            nga.field('userId', 'reference')
                .targetEntity(user)
                .targetField(nga.field('username'))
                .label('User')
        ])
        .listActions(['show']) //action icon
        .batchActions([]) //remove multiple select
        .filters([
            nga.field('q')
                .label('')
                .pinned(true)
                .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"/><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
            nga.field('userId', 'reference')
                .targetEntity(user)
                .targetField(nga.field('username'))
                .label('User')
        ]);
    post.showView()
        .fields([
            nga.field('title'),
            nga.field('body', 'text'),
            nga.field('userId', 'reference')
                .targetEntity(user)
                .targetField(nga.field('username'))
                .label('User'),
            nga.field('comments', 'referenced_list')
                .targetEntity(nga.entity('comments'))
                .targetReferenceField('postId')
                .targetFields([
                    nga.field('email'),
                    nga.field('name')
                ])
                .sortField('id')
                .sortDir('DESC')
        ]);
    post.readOnly(); //read only entity (remove delete. create or edit options)

    return post;
}