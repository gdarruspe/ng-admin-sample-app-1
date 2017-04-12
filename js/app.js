const angular = require('angular');

// declare a new module called 'myApp', and make it require the `ng-admin` module as a dependency
const myApp = angular.module('myApp', [
    require('ng-admin')
]);

const apiFlavor = require('./api_flavor');
myApp.config(['RestangularProvider', apiFlavor.setDefaultHeaders]);
myApp.config(['RestangularProvider', apiFlavor.requestInterceptor]);

// declare a function to run when the module bootstraps (during the 'config' phase)
myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create an admin application
    const admin = nga.application('ng-admin Sample App with webpack')
        .baseApiUrl('http://jsonplaceholder.typicode.com/'); // main API endpoint

    // create and add entities
    // the API endpoint for this entities will be 'http://jsonplaceholder.typicode.com/entity/:id
    admin.addEntity(nga.entity('users'));
    admin.addEntity(nga.entity('comments'));
    admin.addEntity(nga.entity('posts'));
    admin.addEntity(nga.entity('albums'));

    require('./users/config')(nga, admin);
    require('./comments/config')(nga, admin);
    require('./posts/config')(nga, admin);
    require('./albums/config')(nga, admin);

    admin.menu(require('./menu')(nga, admin));

    // attach the admin application to the DOM and execute it
    nga.configure(admin);
}]);