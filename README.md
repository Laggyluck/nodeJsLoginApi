# nodeJsLoginApi
Api coded in node.js to log in.

Api works on server: http://51.178.50.253/

Api has routes for users and posts.
Users: get (/users/), get(/users/id), post (/users/), post (/users/login), patch (/users/id), delete(/users/id)
Every route needs header Authorization: Bearer + token (except for post(/) which sings up user and get(/) and get (/id) - but they are not really used yet).

Posts: get(/post/), post(/post/), patch(/post/id), delete(//postid)
Every route needs header Authorization: Bearer + token (no exceptions).
