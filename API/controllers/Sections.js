import Sections from "../models/SectionModel.js";

export const addSection = async(req, res) => {
    const { name } = req.body;
    try {
        const section = await Sections.create({
           name: name
        });
        res.json({msg: "Section Added"});
    } catch (error) {
        console.log(error);
    }
}


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

export const getSection = async(req, res) => {
    const { id } = req.body;
    try {
        const section = await Sections.findOne({
            where: {
                id: id,
            }
        });
        res.json(section);
    } catch (error) {
        console.log(error);
    }
}

export const deleteSection = async(req, res) => {
    const { id } = req.body;
    try {
        await Sections.destroy({
            where: { id: id },
        });
        res.json({msg: "Section Destroyed"});
    } catch (error) {
        console.log(error);
    }
}

export const modifySection = async(req, res) => {
    const { id, name } = req.body;
    try {
        const section = await Sections.findOne({
            where: {
                id: id,
            }
        })
        console.log(section)
        await Sections.update({
            id: id, 
            name: name,
        }, {where: {id: id}});               
        res.json({msg: "Section modified"});
    } catch (error) {
        console.log(error);
    }
}
