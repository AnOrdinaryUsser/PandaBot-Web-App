import Products from "../models/ProductModel.js";
import multer from 'multer';
import Sections from "../models/SectionModel.js";

export const getProducts = async(req, res) => {
    try {
        const products = await Products.findAll({
            attributes:['id','name','description','price','allergens','img','section']
        });
        res.json(products);
    } catch (error) {
        console.log(error);
    }
}

export const getProduct = async(req, res) => {
    const { id } = req.body;
    try {
        const product = await Products.findOne({ where: { id: id } });
        res.json(product);
    } catch (error) {
        console.log(error);
    }
}
 
 
export const addProduct = async(req, res) => {
    const { name , description , price , allergens, img , section } = req.body;
    try {
        console.log(section)
        const section_id = await Sections.findOne({
            where: {
                name: section,
            }
        })
        await Products.create({
            name: name,
            description: description,
            price: price,
            allergens: allergens,
            section: section_id.dataValues.id,
            img: img,
        });
        res.json({msg: "Product Created"});
    } catch (error) {
        console.log(error);
    }
}

export const modifyProduct = async(req, res) => {
    const { id, name , description , price , allergens, img , section } = req.body;
    console.log("AAAAAAAAAAAAAA")
    console.log("ID: " + id)
    try {
        console.log("AAAAAAAAAAAAAA")
        const product = await Products.findOne({
            where: {
                id: id,
            }
        })
        const section_id = await Sections.findOne({
            where: {
                name: section,
            }
        })
        await Products.update({
            name: name,
            description: description,
            price: price,
            allergens: allergens,
            section: section_id.dataValues.id,
            img: img,
        }, {where: {id: id}});               
        res.json({msg: "Product modified"});
    } catch (error) {
        console.log(error);
    }
}

export const deleteProduct = async(req, res) => {
    const { id } = req.body;
    try {
        await Products.destroy({
            where: { id: id },
        });
        res.json({msg: "Product Destroyed"});
    } catch (error) {
        console.log(error);
    }
}

export const uploadImg = async(req, res) => {
    try {
        res.json({msg: "ImageUpload"});
    } catch (error) {
        return res.status(201).json({ url: "http://192.168.1.50:9000/image/" + imageName });
    }
}


