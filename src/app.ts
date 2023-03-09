import Server from './server';

const PORT = parseInt(process.env.PORT || '3000');
const starter = new Server().start(port)
  .then(port => console.log('Running on port ${PORT}'))
  .catch(error => {
    console.log(error)
  });

export default starter;