
const config = {
    clients: [{
        id: 'alexa',
        clientId: 'alexa',
        clientSecret: 'secret',
        grants: ['password', 'refresh_token'],
        redirectUris: []
    },{
        id: 'application',
        clientId: 'application',
        clientSecret: 'secret',
        grants: ['password', 'refresh_token'],
        redirectUris: []
    }],

    tokens: []
};


const getUser = (username, password) => {
    console.log('getUser-function called');
    // TODO: check user credentials from db
    const user = {
        id: 'id3009',
        email: 'andre.weinkoetz@tum.de'
    };

    return user;
};

const getClient = (clientId, clientSecret) => {
    console.log('getClient-function called');
    // TODO: Check clientId and secret
    return config.clients[0];

};

const saveToken = (token, client, user) => {
    console.log('getClient-function called');

    // TODO: Get required user information into token
    token.client = {
        id: client.id
    };

    token.user = {
        id: user.id,
        email: user.email
    };

    config.tokens.push(token);
    return token;
};

const getAccessToken = (token) => {
    console.log("getAccessToken called")
    // TODO: recap
    const tokens = config.tokens.filter((savedToken) => savedToken.accessToken === token);

    return tokens[0];
};

const getRefreshToken = (refreshToken) => {
    console.log("getRefreshToken called")
    // TODO: recap
    const tokens = config.tokens.filter((savedToken) => savedToken.refreshToken === refreshToken);

    if (!tokens.length) {
        return;
    }

    const token = Object.assign({}, tokens[0]);
    token.user.username = token.user.id;

    return token;
};

const revokeToken = (token) => {

    config.tokens = config.tokens.filter((savedToken) => savedToken.refreshToken !== token.refreshToken);

    const revokedTokensFound = config.tokens.filter((savedToken) =>  savedToken.refreshToken === token.refreshToken);

    return !revokedTokensFound.length;
};


module.exports = {
    getUser: getUser,
    getClient: getClient,
    saveToken: saveToken,
    getAccessToken: getAccessToken,
    getRefreshToken: getRefreshToken,
    revokeToken: revokeToken
};

