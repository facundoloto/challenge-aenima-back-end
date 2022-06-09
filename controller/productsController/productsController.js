require('../../controller/upload/upload.js')
const {
    OK,
    ACCEPTED,
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
} = require('../../constants/httpCodes');
const fs = require('fs');
const db = require('../../models');

const productsAdd = async (req, res) => {
console.log(req.file.filename)
    let imagen='/img/'+req.file.filename;
    if (imagen == null) { //si el usuario no sube imagen seteamos la url como vacia
        imagen = ""
    }
   

    const { name, description, price, userId  } = req.body;
   console.log(name, description, price, imagen)
    try {
        const newProducts = await db.Products.create({
            name,
            description,
            price,
            imagen,
            userId,
        });
        res.status(OK).json({
            ok: OK,
            msg: 'Success creating new record',
            result: newProducts,
        });
    } catch (errors) {
        console.log(errors)
        return res.status(INTERNAL_SERVER_ERROR).json({
            ok: false,
            msg: 'Error creating contact.',
            error: errors,
        });
    };
};

const productsUpdate = async (req, res) => {

    console.log(req.body)
    let imagen='/img/'+req.file.filename; //url de la carpeta donde esta alojada las imagenes y req.filename obtiene el nombre del archivos que se sube
    
    const { name, description, price, } = req.body;
    const { id } = req.params;
    try {
  
        const productsUpdate = await db.Products.update(
            {
                name,
                description,
                price,
                imagen,
            },
            {
                where: {
                    id,
                },
            }
        );
        if (!productsUpdate) {
            return res.status(BAD_REQUEST).json({
                ok: false,
                msg: 'Error updating record.',
                error: {},
            });
        }
        res.status(OK).send('products update');
    } catch (error) {
        res
            .status(BAD_REQUEST)
            .send({ msg: 'it happend an error ' });
    }


};

async function productsDelete(req, res) {
    const { id } = req.params;
   
    try {
        const deleteProducts = await db.Products.destroy({ where: { id } });
        if (!deleteProducts) {
            return res.status(BAD_REQUEST).json({
                error: 'products not deleted',
            });
        }
        return res.status(OK).json({
            ok: true,
        });
    } catch (err) {
        return res.status(HTTP_CODES.BAD_REQUEST).json({
            error: 'products not deleted',
        });
    }
}

const productsGet = async (req, res, next) => {

    try {
        const products = await db.Products.findAll(
            {
            where: {
                userId: `${req.params.id}`,
              },
            }
        );

        res.status(ACCEPTED).json({
            ok: true,
            msg: 'Succesful request',
            result: products,
        });

    }
    catch (error) {
        console.log(error);
        res
            .status(INTERNAL_SERVER_ERROR)
            .json({ ok: false, msg: 'internal server error', error });
    };
};

const productsGetId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const products = await db.Products.findOne({
            where: { id },
        });

        res.status(ACCEPTED).json({
            ok: true,
            msg: 'Succesful request',
            result: products,
        });

    }
    catch (error) {
        console.log(error);
        res
            .status(INTERNAL_SERVER_ERROR)
            .json({ ok: false, msg: 'internal server error', error });
    };
};

module.exports = { productsAdd, productsUpdate, productsDelete, productsGet, productsGetId };
