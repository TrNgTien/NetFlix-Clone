const notification = require('../notification/notifyHandler');
const movie = require('../notification/notifySchema');

module.exports.user = async (req, res) => {
    const{name, description} = req.body;
    notification.notify(name, description);
    res.json({
        name,
        description
    })
}