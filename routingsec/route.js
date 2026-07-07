'Access-Control-Allow-Origin'
import express, { Router } from'express';
import {home, about, service,product,contact, apilist,applistdata, logincontrol,singleusercontrol,userRegisterControl,userdeletecontrol, singledatacontrol,userupdatecontrol} from '../controlsec/controler.js';
const app = express.Router()
app.get('/',home)
app.get('/about',about)
app.get('/service',service)
app.get('/product',product)
app.get('/contact',contact)
app.get('/api',apilist)
app.get('/addlist',applistdata)
app.post('/userregistor',userRegisterControl)
app.post('/userlogin',logincontrol)
app.post('/singleuser',singleusercontrol)
app.delete('/userdelete/:id',userdeletecontrol)
app.get('/singledata/:id',singledatacontrol)
app.patch('/userupdate/:id',userupdatecontrol)
export default app;

