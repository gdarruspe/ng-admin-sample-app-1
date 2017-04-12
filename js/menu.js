export default function (nga, admin) {
    const user = admin.getEntity('users');
    const comment = admin.getEntity('comments');
    const post = admin.getEntity('posts');
    const album = admin.getEntity('albums');

    //Customizing the Sidebar Menu
    return nga.menu()
        .addChild(nga.menu(user).icon('<span class="glyphicon glyphicon-user"></span>'))
        .addChild(nga.menu().title('Items')
            .addChild(nga.menu(post).icon('<span class="glyphicon glyphicon-pencil"></span>'))
            .addChild(nga.menu(comment).icon('<span class="glyphicon glyphicon-triangle-right"></span>'))
            .addChild(nga.menu(album).icon('<span class="glyphicon glyphicon-triangle-right"></span>'))
        );
}