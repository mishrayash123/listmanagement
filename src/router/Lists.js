
import {getAllLists,getList,AddList,deleteList,updateList} from '../controllers/Lists.js';

export default (router) => {
  router.post('/addtolists', AddList);
  router.get('/getlists',getAllLists);
  router.get('/getlist/:id',getList);
  router.delete('/deletelist/:id', deleteList);
  router.patch('/updatelist/:id', updateList);
};