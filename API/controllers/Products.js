import Products from "../models/ProductModel.js";
import multer from 'multer';

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
 
export const addProduct = async(req, res) => {
    const { name , description , price , allergens, img ,section } = req.body;
    try {
        await Products.create({
            name: name,
            description: description,
            price: price,
            allergens: allergens,
            img: img,
            section: section
        });
        res.json({msg: "Product Created"});
    } catch (error) {
        console.log(error);
    }
}

export const uploadImg = async(req, res) => {
    try {
        res.json({msg: "ImageUpload"});
    } catch (error) {
        return res.status(201).json({ url: "http://localhost:5000/image/" + imageName });
    }
}


