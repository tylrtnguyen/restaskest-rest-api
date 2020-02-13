import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

// Add useNewUrlParser and UnifiedTopolgy to prevent warning
export const connect = (url = process.env.DB_CONNECTION, opts = {}) => {
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology:true});

    const connection = mongoose.connection;

    mongoose.set('useFindAndModify', false);

    connection.once('open', () => {
        console.log('MongoDB database connection established successfully');
});
}
