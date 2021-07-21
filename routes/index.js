module.exports = ({express, app}) => {
    
    app.use('/auth', require('./auth.route')(express))

}