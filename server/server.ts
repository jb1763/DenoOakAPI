import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import { createUser, deleteUser, getUsers, getUser, updateUser } from '../controllers/UserController.ts'
const env = Deno.env.toObject();
const PORT = env.PORT || 4000;
const HOST = env.HOST || '127.0.0.1'


const router = new Router();
router
    .get('/api/users', getUsers)
    .get('/api/users/:uid', getUser)
    .post('/api/users', createUser)
    .put('/api/users/:uid', updateUser)
    .delete('/api/users/:uid',deleteUser);


const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port ${PORT}`);
await app.listen(`${HOST}:${PORT}`)