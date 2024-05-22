const ClientError = require("./clientError");

class LargeInput extends ClientError{
    constructor(message = 'Payload content length greater than maximum allowed: 1000000'){
        super(message);
        this.name = 'TooLargeFile';
        this.statusCode = 413;
    }
}

module.exports = LargeInput;