"use strict";

module.exports = class AuthenticationService {

    constructor (userRepository) {
        this.userRepository = userRepository;
    }

    authenticate (userId, requestUserId) {

        return new Promise((resolve, reject) => {

            if (userId != requestUserId)
                return reject("Not Authorized");

            this.userRepository.find(userId).then((user) => {

                if (!user)
                    return reject("Not Authorized");

                let timeA = new Date().getTime();
                let timeB = (user.last_login || new Date()).getTime();
                let diff = (timeB - timeA) / 60 / 1000;

                if (diff > 30)
                    return reject("Invalid session");

                return resolve(user);

            })
            .catch(reject);

        });

    }

}