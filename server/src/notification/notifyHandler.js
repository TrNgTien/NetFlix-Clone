const Notify = require('./notifySchema');

module.exports ={
    notify: async (name, description) => {
    let movie = {};

    movie.name = name;
    movie.description = description;

    let model = new Notify(movie);
    await model.save();
    },
}