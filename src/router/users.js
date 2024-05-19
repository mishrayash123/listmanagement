import express from 'express';
import multer from 'multer'

import { getAllUsers, deleteUser, updateUser ,addAllUsersusingcsv} from '../controllers/users.js';

const upload = multer({ dest: 'uploads/' });

export default (router) => {
  router.post('/users',getAllUsers);
  router.post('/addusers',upload.single('file'),addAllUsersusingcsv);
  router.delete('/deleteuser/:id', deleteUser);
  router.patch('/updateusers/:id', updateUser);
};
