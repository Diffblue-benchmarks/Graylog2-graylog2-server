/// <reference path="../../../declarations/jquery/jquery.d.ts" />

declare var $: any;

import UserNotification = require("../../util/UserNotification");
import URLUtils = require("../../util/URLUtils");

var UsersStore = {
    editUserFormUrl(username: string) {
        return URLUtils.appPrefixed("/system/users/edit/" + username);
    },
    loadUsers(): JQueryPromise<string[]> {
        var url = URLUtils.appPrefixed('/a/system/users');
        var promise = $.getJSON(url);
        promise.fail((jqXHR, textStatus, errorThrown) => {
            if (jqXHR.status !== 404) {
                UserNotification.error("Loading user list failed with status: " + errorThrown,
                    "Could not load user list");
            }
        });
        return promise;
    },
    deleteUser(username: string): JQueryPromise<string[]> {
        var url = URLUtils.appPrefixed('/a/system/user/' + username);
        var promise = $.ajax({
            type: "DELETE",
            url: url
        });

        promise.fail((jqXHR, textStatus, errorThrown) => {
            if (jqXHR.status !== 404) {
                UserNotification.error("Delete user failed with status: " + errorThrown,
                    "Could not delete user");
            }
        });
        return promise;
    }
};

export = UsersStore;