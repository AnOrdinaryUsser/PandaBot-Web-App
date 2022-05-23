import Products from "../models/ProductModel.js";
 
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
    //const image = req.body.selectedFile;
    console.log(req.body)
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



