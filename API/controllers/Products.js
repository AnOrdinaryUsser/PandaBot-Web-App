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
 
export const addProduct = async(req, res) => {
    const { name , description , price , allergens, img , section } = req.body;
    try {
        console.log(section)
        const section_id = await Sections.findOne({
            where: {
                name: section,
            }
        })
        console.log("HOLAAAAAA",section_id.dataValues.id)
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

export const uploadImg = async(req, res) => {
    try {
        res.json({msg: "ImageUpload"});
    } catch (error) {
        return res.status(201).json({ url: "http://localhost:9000/image/" + imageName });
    }
}


