import mongoose from "mongoose";
import logger from "morgan";

class Connection {

    constructor() {
        const url = process.env.MONGODB_URI || `mongodb://localhost:27017/node-starter`;

        mongoose.Promise = global.Promise;
        mongoose.set("useNewUrlParser", true);
        mongoose.set("useFindAndModify", false);
        mongoose.set("useCreateIndex", true);
        mongoose.set("useUnifiedTopology", true);

        mongoose.connect(url);

        mongoose.connection.on('connected', () => {
            console.log(logger(`Mongoose connection has been opened successfully to ${url}`));
        });

        mongoose.connection.on('error', (error) => {
            console.log(logger(`Mongoose connection. Error code: 500`), error);
        });
    }

}

export default new Connection();