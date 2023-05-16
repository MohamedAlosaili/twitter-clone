# **Server documentation** 📄

### Table of Content

- <a href="#authentication">Authentication</a>
  - <a href="#signup">Sign up</a>
  - <a href="#login">Login</a>
  - <a href="#loginwithgoogle">Login with Google</a>
  - <a href="#currentuser">Get currentUser info</a>
  - <a href="#logout">Logout</a>
  - <a href="#forgotpassword">Forgot Password</a>
  - <a href="#resetpassword">Reset Password</a>
- <a href="#updateuserprofile">Update user profile</a>
  - <a id="updateimages">Update profile images</a>
  - <a id="updateinfo">Update profile info</a>
  - <a id="addpinnedtweet">Add pinned tweet</a>
  - <a id="removepinnedtweet">Remove pinned tweet</a>
- <a href="#userprofile">User Profile</a>
  - <a href="#getuserinfo">Get user info</a>
  - <a href="#getuserfollowlist">Get user follow list</a>
  - <a href="#getusertweets">Get user tweets</a>
  - <a href="#getuserlikes">Get user tweets</a>
  - <a href="#getusermedia">Get user media</a>
- <a href="#tweets">Tweets</a>
  - <a href="#getalltweets">Get all tweets</a>
  - <a href="#getsingletweet">Get single tweet</a>
  - <a href="#addtweet">Add new tweet</a>
  - <a href="#updatetweet">Update tweet</a>
  - <a href="#deletetweet">Delete tweet</a>
- <a href="#replies">Replies</a>
  - <a href="#gettweetreplies">Get tweet replies</a>
  - <a href="#addreply">Add reply</a>
- <a href="#reactions">Reactions</a>
  - <a href="#gettweetreaction">Get tweet reaction</a>
  - <a href="#addreaction">Add reaction</a>
  - <a href="#removereaction">Remove reaction</a>
- <a href="#follow">Follow</a>
  - <a href="#addfollow">Add user to followers</a>
  - <a href="#removefollow">Remove user from followers</a>
- <a href="#search">Search</a>

<h1 id="authentication">Authentication</h1>

<h2 id="signup">Sign up</h2>

This endpoint allows users to sign up by creating a new account.

- URL: /api/auth/signup
- Method: POST
- Access: Public

#### **Request**

The request should include a JSON object in the request body with the following fields:

```
{
    "name": "Sami",
    "email": "sami@gmail.com",
    "username": "sami",
    "password": "12345678"
}
```

#### **Success Response**

- **Status Code**: `201`

```
{
    "success": true,
    "token": JWT token
}
```

#### **Failed Response**

**Status Code**: `400 | 500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br />
<br />
<br />

<h2 id="login">Login</h2>

This endpoint allows users to login to their account.

- URL: /api/auth/login
- Method: POST
- Access: Public

#### **Request**

The request should include a JSON object in the request body with the following fields:

```
{
    "username": "sami@gmail.com" || "sami", // Email or username both valid
    "password": "12345678"
}
```

#### **Success Response**

- **Status Code**: `200`

```
{
    "success": true,
    "token": JWT token
}
```

#### **Failed Response**

**Status Code**: `400 | 401 | 500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br />
<br />
<br />

<h2 id="loginwithgoogle">Login with Google</h2>

This endpoint allows users to login to their account form Google authentication.

- URL: /api/auth/google
- Method: GET
- Access: Public

#### **Success Response**

- **Status Code**: `200`

```
{
    "success": true,
    "token": JWT token
}
```

#### **Failed Response**

**Status Code**: `400 | 500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br/>
<br/>
<br/>

<h2 id="currentuser">Get currentUser info</h2>

This endpoint allows logged-in users to retreive their account info.

- URL: /api/auth/me
- Method: GET
- Access: Private - logged-in user

#### **Success Response**

- **Status Code**: `200`

```
{
    "success": true,
    "data": {
        "_id": "645887d11255870e9a9cbb70",
        "name": "Sami",
        "accountType": "regular",
        "username": "sami",
        "email": "sami@gmail.com",
        "avatar": "default-avatar.png",
        "followers": 1,
        "following": 1,
        "createdAt": "2023-05-08T05:25:37.853Z",
        "updatedAt": "2023-05-08T07:33:56.192Z",
        "__v": 0
    }
}
```

#### **Failed Response**

**Status Code**: `400 | 401 | 500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br/>
<br/>
<br/>

<h2 id="logout">Logout</h2>

This endpoint allows users to logout from their account.

- URL: /api/auth/logout
- Method: POST
- Access: Private - logged-in user

#### **Success Response**

- **Status Code**: `200`

```
{
    "success": true,
    "data": null,
    "message": "Logged out successfully"
}
```

#### **Failed Response**

**Status Code**: `500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br/>
<br/>
<br/>

<h2 id="forgotpassword">Forgot Password</h2>

This endpoint allows users to initiate the password reset process by requesting a reset email.

- URL: /api/auth/forgotpassword
- Method: POST
- Access: Public

#### **Request**

The request should include a JSON object in the request body with the following fields:

```
{
  "email": "sami@gmail.com"
}
```

#### **Success Response**

- **Status Code**: `200`

```
{
  "success": true,
  "code": "7a21727d",
  "message": "Email has been sent"
}
```

#### **Failed Response**

**Status Code**: `404 | 500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br/>
<hr/>
<br/>

<h2 id="resetpassword">Reset Password</h2>

This endpoint allows users to reset their password by providing a new password along with a reset code.

- URL: /api/auth/resetpassword
- Method: POST
- Access: Public

#### **Request**

The request should include a JSON object in the request body with the following fields:

```
{
  "password": "12345678910",
  "code": "7a21727d"
}
```

#### **Success Response**

- **Status Code**: `200`

```
{
  "success": true,
  "message": "Password changed"
}
```

#### **Failed Response**

**Status Code**: `400 | 401 | 500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br/>
<br/>
<br/>

<h1 id="updateuserprofile">Update user profile</h1>

<h2 id="updateimages">Update profile images</h2>

This endpoint allows logged-in users to update their profile images.

- URL: /api/auth/profile/images
- Method: PUT
- Access: Private - logged-in user

#### **Request**

The request should include a `formData` body with at least one of the following fields:

- avatar (file, optional): Optional file to update user avatar.
- header (file, optional): Optional file to update user header.

#### **Success Response**

- **Status Code**: `200`

```
{
    "success": true,
    "data": {
        "_id": "645887d11255870e9a9cbb70",
        "name": "sami",
        "username": "sami",
        "avatar": "new-avatar.png",
        "header": "new-header.png",
        "followers": 13,
        "following": 24,
        "createdAt": "2023-05-09T11:15:22.019Z",
        "updatedAt": "2023-05-12T11:22:34.648Z",
        "__v": 0,
        "pinnedTweet": "645dfdd174cfdc56184d136a"
    },
    "message": "Profile updated"
}
```

#### **Failed Response**

**Status Code**: `400 | 500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br/>
<br/>
<br/>

<h2 id="updateinfo">Update profile info</h2>

This endpoint allows logged-in users to update their profile info.

- URL: /api/auth/profile
- Method: PUT
- Access: Private - logged-in user

#### **Request**

The request should include a JSON object in the request body with one of the following fields:

```
{
    "name": "New name",
    "location": "New location
    "website": "New website url",
    "bio": "New bio"
}
```

#### **Success Response**

- **Status Code**: `200`

```
{
    "success": true,
    "data": {
        "_id": "645887d11255870e9a9cbb70",
        "name": "sami",
        "username": "sami",
        "avatar": "new-avatar.png",
        "header": "new-header.png",
        "followers": 13,
        "following": 24,
        "location": "New location
        "website": "New website url",
        "bio": "New bio"
        "createdAt": "2023-05-09T11:15:22.019Z",
        "updatedAt": "2023-05-12T11:22:34.648Z",
        "__v": 0,
        "pinnedTweet": "645dfdd174cfdc56184d136a"
    },
    "message": "Profile updated"
}
```

If nothing provided in the request body

```
{
    "success": true,
    "data": null,
    "message": "Nothing to update"
}
```

#### **Failed Response**

**Status Code**: `500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br/>
<br/>
<br/>

<h2 id="addpinnedtweet">Add pinned tweet</h2>

This endpoint allows logged-in users to add pinned tweet.

- URL: /api/auth/profile/pinnedtweet
- Method: PSOT
- Access: Private - logged-in user

#### **Request**

The request should include a JSON object in the request body with the following field:

```
{
    "tweetId": "645dfdd174cfdc56184d136a"
}
```

#### **Success Response**

- **Status Code**: `200`

```
{
    "success": true,
    "data": null,
    "message": "Tweet has been pinned successfully"
}
```

#### **Failed Response**

**Status Code**: `400 | 500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br/>
<br/>
<br/>

<h2 id="removepinnedtweet">Remove pinned tweet</h2>

This endpoint allows logged-in users to remove pinned tweet.

- URL: /api/auth/profile/pinnedtweet
- Method: DELETE
- Access: Private - logged-in user

#### **Success Response**

- **Status Code**: `200`

```
{
    "success": true,
    "data": null,
    "message": "Tweet has been successfully unpinned"
}
```

#### **Failed Response**

**Status Code**: `500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br/>
<br/>
<br/>

<h1 id="#userprofile">User Profile</h1>

<h2 id="getuserinfo">Get user info</h2>

This endpoint allows users to retrieve other accounts public info.

- URL: /api/users/:id
- Method: GET
- Access: Public

#### **Success Response**

- **Status Code**: `200`

```
{
    "success": true,
    "data": {
        "_id": "645887d11255870e9a9cbb70",
        "name": "sami",
        "username": "sami",
        "avatar": "default-avatar.png",
        "followers": 13,
        "following": 24,
        "createdAt": "2023-05-09T11:15:22.019Z",
        "updatedAt": "2023-05-12T11:22:34.648Z",
        "__v": 0,
        "pinnedTweet": "645dfdd174cfdc56184d136a"
    }
}
```

#### **Failed Response**

**Status Code**: `404 | 500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br/>
<br/>
<br/>

<h2 id="getuserfollowlist">Get user follow list</h2>

This endpoint allows users to retrieve a list of the following and followers of other accounts.

- URL: /api/users/:id/follows/:type
- Method: GET
- Access: Public

`type` either followers or following

#### **Success Response**

- **Status Code**: `200`

```
{
    "success": true,
    "data": [
        {
            "_id": "645ba73b33775ecb105e6f74",
            "followerId": {
                "_id": "6458ad68fef8c944f46465e9",
                "name": "Mohamed",
                "username": "mohamed",
                "avatar": "default-avatar.png"
            },
            "followingId": "645887c81255870e9a9cbb6e",
            "createdAt": "2023-05-10T14:16:28.004Z",
            "updatedAt": "2023-05-10T14:16:28.004Z",
            "__v": 0
        },
        ...other objects here
    ],
    "pagination": {
        "next": false,
        "prev": false,
        "limit": 25,
        "page": 1,
        "pageSize": 3,
        "totalPages": 1
    },
    "total": 3
}
```

#### **Failed Response**

**Status Code**: `400 | 500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br/>
<br/>
<br/>

<h2 id="getusertweets">Get user tweets</h2>

This endpoint allows users to retrieve a list of tweets of other accounts.

- URL: /api/users/:id/tweets?withReplies=false
- Method: GET
- Access: Public

`withReplies` by default will be false to add the replies set `withReplies` to true

#### **Success Response**

- **Status Code**: `200`

```
{
    "success": true,
    "data": [
        {
            "_id": "645b7ee6d90b38505cc2fbd4",
            "type": "retweet",
            "authorId": "645887c81255870e9a9cbb6e",
            "tweetId": {
                "_id": "6458a19c8500c4c3cd4d3799",
                "type": "tweet",
                "content": "Just finished reading an amazing book!",
                "authorId": {
                    "_id": "645887c81255870e9a9cbb6e",
                    "name": "Rose",
                    "username": "rose",
                    "avatar": "default-avatar.png"
                },
                "media": [],
                "likes": 1,
                "retweets": 2,
                "replies": 1,
                "updatesLeft": 3,
                "createdAt": "2023-05-09T11:15:29.956Z",
                "updatedAt": "2023-05-10T11:24:22.138Z",
                "__v": 0
            },
            "createdAt": "2023-05-10T11:24:22.137Z",
            "updatedAt": "2023-05-10T11:24:22.137Z",
            "__v": 0
        },
        ...other objects here
    ],
    "pagination": {
        "next": false,
        "prev": false,
        "limit": 25,
        "page": 1,
        "pageSize": 13,
        "totalPages": 1
    },
    "total": 13
}
```

#### **Failed Response**

**Status Code**: `500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br/>
<br/>
<br/>

<h2 id="getuserlikes">Get user tweets</h2>

This endpoint allows users to retrieve other accounts likes.

- URL: /api/users/:id/likes
- Method: GET
- Access: Public

#### **Success Response**

- **Status Code**: `200`

```
{
    "success": true,
    "data": [
        {
            "_id": "645a2b545de89a21966831ec",
            "type": "like",
            "authorId": "645887c81255870e9a9cbb6e",
            "tweetId": {
                "_id": "6458a1a48500c4c3cd4d3814",
                "type": "reply",
                "content": "I couldn't agree more. It's such an important topic.",
                "authorId": {
                    "_id": "6459faf6fe64a6ce9a737f1e",
                    "name": "Ali",
                    "username": "ali",
                    "avatar": "default-avatar.png"
                },
                "media": [],
                "tweetId": "6458a19c8500c4c3cd4d3803",
                "likes": 1,
                "retweets": 1,
                "replies": 0,
                "updatesLeft": 3,
                "createdAt": "2023-05-09T11:15:30.626Z",
                "updatedAt": "2023-05-09T11:15:32.426Z",
                "__v": 0
            },
            "createdAt": "2023-05-09T11:15:32.426Z",
            "updatedAt": "2023-05-09T11:15:32.426Z",
            "__v": 0
        }
    ],
    "pagination": {
        "next": true,
        "prev": false,
        "limit": 1,
        "page": 1,
        "pageSize": 1,
        "totalPages": 2
    },
    "total": 2
}
```

#### **Failed Response**

**Status Code**: `500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br/>
<br/>
<br/>

<h2 id="getusermedia">Get user media</h2>

This endpoint allows users to retrieve other accounts media (only tweets with media).

- URL: /api/users/:id/media
- Method: GET
- Access: Public

#### **Success Response**

- **Status Code**: `200`

```
{
    "success": true,
    "data": [
        {
            "_id": "645b69a69227dba8b357a8ab",
            "type": "reply",
            "content": "😍",
            "authorId": "645887c81255870e9a9cbb6e",
            "media": [
                {
                    "mediaType": "image/jpeg",
                    "url": "image.jpeg",
                    "_id": "645b69a69227dba8b357a8ac"
                }
            ],
            "tweetId": {
                "_id": "645a71d3736ee20e15f0d96d",
                "authorId": {
                    "_id": "645887c81255870e9a9cbb6e",
                    "name": "Rose",
                    "username": "rose",
                    "avatar": "default-avatar.png"
                }
            },
            "likes": 0,
            "retweets": 0,
            "replies": 0,
            "updatesLeft": 3,
            "createdAt": "2023-05-10T09:53:42.594Z",
            "updatedAt": "2023-05-10T09:53:42.594Z",
            "__v": 0
        }
    ],
    "pagination": {
        "next": true,
        "prev": false,
        "limit": 1,
        "page": 1,
        "pageSize": 1,
        "totalPages": 3
    },
    "total": 3
}
```

#### **Failed Response**

**Status Code**: `500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br/>
<br/>
<br/>

<h1 id="tweets">Tweets</h1>

<h2 id="getalltweets">Get all tweets</h2>

This endpoint allows users to retrieve all available tweets.

- URL: /api/tweets
- Method: GET
- Access: Public

#### **Success Response**

- **Status Code**: `200`

```
{
    "success": true,
    "data": [
        {
            "_id": "645dfdd174cfdc56184d136a",
            "type": "tweet",
            "content": "Hello world 😍",
            "authorId": {
                "_id": "645887d11255870e9a9cbb70",
                "name": "Sami",
                "username": "sami",
                "avatar": "default-avatar.png"
            },
            "media": [
                {
                    "mediaType": "image/jpeg",
                    "url": "hello-world.jpeg",
                    "_id": "645dfdd174cfdc56184d136b"
                }
            ],
            "likes": 0,
            "retweets": 0,
            "replies": 0,
            "updatesLeft": 3,
            "createdAt": "2023-05-12T08:50:25.019Z",
            "updatedAt": "2023-05-12T08:50:25.019Z",
            "__v": 0
        }
    ],
    "pagination": {
        "next": true,
        "prev": false,
        "limit": 25,
        "page": 1,
        "pageSize": 15,
        "totalPages": 1
    },
    "total": 15
}
```

#### **Failed Response**

**Status Code**: `500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br/>
<br/>
<br/>

<h2 id="getsingletweet">Get single tweet</h2>

This endpoint allows users to retrieve single tweet by the id.

- URL: /api/tweets/:id
- Method: GET
- Access: Public

#### **Success Response**

- **Status Code**: `200`

```
{
    "success": true,
    "data": {
        "_id": "6458a19c8500c4c3cd4d3797",
        "type": "tweet",
        "content": "Hello Twitter users 👋",
        "authorId": {
            "_id": "645887c81255870e9a9cbb6e",
            "name": "Rose",
            "username": "rose",
            "avatar": "default-avatar.png"
        },
        "likes": 2,
        "retweets": 2,
        "replies": 1,
        "updatesLeft": 3,
        "media": [],
        "createdAt": "2023-05-08T07:15:40.598Z",
        "updatedAt": "2023-05-08T07:42:04.561Z",
        "__v": 0
    }
}
```

#### **Failed Response**

**Status Code**: `404 | 500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br/>
<br/>
<br/>

<h2 id="addtweet">Add tweet</h2>

This endpoint allows logged-in users to add a new tweet.

- URL: /api/tweets
- Method: POST
- Access: Private - anyone logged-in user

#### **Request**

The request should include a `formData` body with the following fields:

- type ("tweet", required): The type of the tweet.
- content (string, required - optional if media provided): The text content of the tweet.
- media (files, optional): Optional media files to be attached to the tweet.

#### **Success Response**

- **Status Code**: `201`

```
{
    "success": true,
    "data": {
        "type": "tweet",
        "content": "This is my first tweet here 🥳",
        "authorId": "645887d11255870e9a9cbb70",
        "likes": 0,
        "retweets": 0,
        "replies": 0,
        "updatesLeft": 3,
        "_id": "6458bbe6fef8c944f46465fe",
        "media": [],
        "createdAt": "2023-05-08T09:07:50.986Z",
        "updatedAt": "2023-05-08T09:07:50.986Z",
        "__v": 0
    },
    "message": "Your Tweet was sent"
}
```

#### **Failed Response**

**Status Code**: `401 | 500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br/>
<br/>
<br/>

<h2 id="updatetweet">Update Tweet</h2>

This endpoint allows logged-in users to update their tweets.

- URL: /api/tweets/:id
- Method: PUT
- Access: Private - only tweet owner

#### **Request**

The request should include a JSON object in the request body with the following field:

```
{
  "content": "New tweet content"
}
```

#### **Success Response**

- **Status Code**: `200`

```
{
    "success": true,
    "data": {
        "type": "tweet",
        "content": "This is my first tweet here 👋🥳",
        "authorId": "645887d11255870e9a9cbb70",
        "likes": 0,
        "retweets": 0,
        "replies": 0,
        "updatesLeft": 2,
        "_id": "6458bbe6fef8c944f46465fe",
        "media": [],
        "createdAt": "2023-05-08T09:07:50.986Z",
        "updatedAt": "2023-05-08T09:07:50.986Z",
        "__v": 0
    },
    "message": "Tweet updated successfully. 2 updates left"
}
```

If no content in the request the response will be like this:

```
{
    "success": true,
    "data": {
        "type": "tweet",
        "content": "This is my first tweet here 🥳",
        "authorId": "645887d11255870e9a9cbb70",
        "likes": 0,
        "retweets": 0,
        "replies": 0,
        "updatesLeft": 3,
        "_id": "6458bbe6fef8c944f46465fe",
        "media": [],
        "createdAt": "2023-05-08T09:07:50.986Z",
        "updatedAt": "2023-05-08T09:07:50.986Z",
        "__v": 0
    },
    "message": "Nothing to update"
}
```

#### **Failed Response**

**Status Code**: `400 | 401 | 403 | 404 | 500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br/>
<br/>
<br/>

<h2 id="deletetweet">Delete Tweet</h2>

This endpoint allows logged-in users to delete their tweets.

- URL: /api/tweets/:id
- Method: DELETE
- Access: Private - only tweet owner

#### **Success Response**

- **Status Code**: `200`

```
{
    "success": true,
    "data": null,
    "message": "Tweet deleted successfully"
}
```

#### **Failed Response**

**Status Code**: `400 | 401 | 404 | 500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br/>
<br/>
<br/>

<h1 id="replies">Replies</h1>

<h2 id="#gettweetreplies">Get tweet replies</h2>

This endpoint allows users to get all replies for a specific tweet.

- URL: /api/tweets/:tweetId/replies
- Method: GET
- Access: Public

#### **Success Response**

- **Status Code**: `200`

```
{
    "success": true,
    "data": [
        {
            "_id": "6458a7ccfef8c944f46465de",
            "type": "reply",
            "content": "Hello world!",
            "authorId": "645887c81255870e9a9cbb6e",
            "media": [],
            "tweetId": {
                "_id": "645887c81255870e9a9cbb6e",
                "name": "Rose",
                "username": "rose",
                "avatar": "default-avatar.png"
            },
            "likes": 0,
            "retweets": 0,
            "replies": 0,
            "updatesLeft": 3,
            "createdAt": "2023-05-08T07:42:04.560Z",
            "updatedAt": "2023-05-08T07:42:04.560Z",
            "__v": 0
        },
        ...other replies
    ],
    "pagination": {
        "next": false,
        "prev": false,
        "limit": 25,
        "page": 1,
        "pageSize": 5,
        "totalPages": 1
    },
    "total": 5
}
```

#### **Failed Response**

**Status Code**: `500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br />
<br />
<br />

<h2 id="addreply">Add rply</h2>

This endpoint allows logged-in users to add a new reply.

- URL: /api/tweets/:tweetId/replies
- Method: POST
- Access: Private - anyone logged in

#### **Request**

The request should include a `formData` body with the following fields:

- type ("reply", required): The type of the tweet.
- content (string, required - optional if media provided): The text content of the tweet.
- media (files, optional): Optional media files to be attached to the tweet.

#### **Success Response**

- **Status Code**: `201`

```
{
    "success": true,
    "data": {
        "type": "reply",
        "content": "First reply",
        "authorId": "645887d11255870e9a9cbb70",
        "likes": 0,
        "retweets": 0,
        "replies": 0,
        "updatesLeft": 3,
        "_id": "6458bbe6fef8c944f46465fe",
        "media": [],
        "createdAt": "2023-05-08T09:07:50.986Z",
        "updatedAt": "2023-05-08T09:07:50.986Z",
        "__v": 0
    },
    "message": "Your Tweet was sent"
}
```

#### **Failed Response**

**Status Code**: `401 | 404 | 500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br/>
<br/>
<br/>

<h1 id="reactions">Reactions</h1>

<h2 id="gettweetreaction">Get tweet's reaction</h2>

This endpoint allows users to get tweet's reaction.

- URL: /api/tweets/:tweetId/reactions?type=(like or retweet)
- Method: GET
- Access: Public

#### **Success Response**

- **Status Code**: `200`

```
{
    "success": true,
    "data": [
        {
            "_id": "645a2b545de89a21966831dd",
            "type": "retweet",
            "authorId": {
                "_id": "6459faf6fe64a6ce9a737f1d",
                "name": "Rose",
                "username": "rose",
                "avatar": "default-avatar.png"
            },
            "tweetId": "6458a19c8500c4c3cd4d3797",
            "createdAt": "2023-05-09T11:15:32.320Z",
            "updatedAt": "2023-05-09T11:15:32.320Z",
            "__v": 0
        }
    ],
    "pagination": {
        "next": false,
        "prev": false,
        "limit": 25,
        "page": 1,
        "pageSize": 1,
        "totalPages": 1
    },
    "total": 1
}
```

#### **Failed Response**

**Status Code**: `500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br/>
<br/>
<br/>

<h2 id="addreaction">Add reaction</h2>

This endpoint allows logged-in users to add reaction on tweets.

- URL: /api/tweets/:tweetId/reactions
- Method: POST
- Access: Private - anyone logged in

#### **Request**

The request should include a JSON object in the request body with the following field:

```
{
    "type": "like" | "retweet"
}
```

#### **Success Response**

- **Status Code**: `201`

```
{
    success: true,
    data: null,
    message: `Reaction added`,
}
```

#### **Failed Response**

**Status Code**: `401 | 404 | 500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br/>
<br/>
<br/>

<h2 id="removereaction">Remove reaction</h2>

This endpoint allows logged-in users to remove their reactions.

- URL: /api/tweets/:tweetId/reactions?type=(like or retweet)
- Method: DELETE
- Access: Private

#### **Success Response**

- **Status Code**: `200`

```
{
    success: true,
    data: null,
    message: `Reaction removed`
}
```

#### **Failed Response**

**Status Code**: `401 | 404 | 500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br/>
<br/>
<br/>

<h1 id="follow">Follow</h1>

<h2 id="addfollow">Add user to followers</h2>

This endpoint allows logged-in users to add another user into their following list.

- URL: /api/follows
- Method: POST
- Access: Private - anyone logged-in

#### **Request**

The request should include a JSON object in the request body with the following field:

```
{
    "followingId": "645887d11255870e9a9cbb70"
}
```

#### **Success Response**

- **Status Code**: `201`

```
{
    success: true,
    data: null,
    message: "User followed"
}
```

#### **Failed Response**

**Status Code**: `401 | 500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br />
<br />
<br />

<h2 id="removefollow">Remove user from followers</h2>

This endpoint allows logged-in users to remove user from following list.

- URL: /api/follows/:followingId
- Method: DELETE
- Access: Private - anyone logged-in

#### **Success Response**

- **Status Code**: `200`

```
{
    success: true,
    data: null,
    message: `User unfollowed`,
}
```

#### **Failed Response**

**Status Code**: `401 | 404 | 500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```

<br/>
<br/>
<br/>

<h1 id="search">Search</h1>

This endpoint allows users to search for tweets, users, tweets with media.

- URL: /api/search?type=(tweets | users | media)&q=query value
- Method: GET
- Access: Public

#### **Success Response**

- **Status Code**: `200`

```
{
    "success": true,
    "data": [ search results ],
    "pagination": {
        "next": false,
        "prev": false,
        "limit": 25,
        "page": 1,
        "pageSize": 25,
        "totalPages": 3
    },
    "total": 60
}
```

#### **Failed Response**

**Status Code**: `400 | 500`

```
{
    "success": false,
    "data": null,
    "error": "error message"
}
```
