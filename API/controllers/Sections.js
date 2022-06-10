import Sections from "../models/SectionModel.js";

export const getSections = async(req, res) => {
    try {
        const sections = await Sections.findAll({
            attributes:['id','name']
        });
        res.json(sections);
    } catch (error) {
        console.log(error);
    }
}