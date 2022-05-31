const express = require('express');
const router = express.Router();
const upload=require('../controller/upload/upload');
const {
productsAdd,
productsUpdate,
productsDelete,
productsGet,
productsGetId,
} = require('../controller/productsController/productsController');

/* GET users listing. */
router.get('/',productsGet);
router.get('/:id',productsGetId);
router.delete('/:id/',productsDelete);
router.put('/edit/:id/',upload.upload,productsUpdate);
router.post('/add/',upload.upload,productsAdd);

module.exports = router;
