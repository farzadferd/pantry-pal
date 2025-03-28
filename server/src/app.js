import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const port = 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
}); 