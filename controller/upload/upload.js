//crear esto en otro archivo
const multer = require('multer');//instalamos multer
const storage = multer.diskStorage({ //esta es un objeto con dos propiedades ambas tiene dos funciones
    destination: function (req, file, cb) {
        cb(null,"./public/img/"); //cb es una funcion donde en destination ponemos la ruta donde se guardaran las imagenes
    },
    filename: function (req, file, cb) {
        let ext = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + Date.now() + '.' + 'jpg');
        console.log(req.body);
    }
})
const upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } }).single('image');

exports.upload= upload