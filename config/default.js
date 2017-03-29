/**
 * Created by admin on 17/3/27.
 */
module.exports = {
    port:3002,
    session:{
        secret:'mysite',
        key:'mysite',
        maxAge:2592000000
    },
    mongodb:'mongodb://localhost:27017/mysite'
};