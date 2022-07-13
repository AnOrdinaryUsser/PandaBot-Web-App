/**
 * @file Controller to handle frontend sections request
 */
import Sections from "../models/SectionModel.js";

/**
 * Module to add a section
 * @module addSection
 */
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

/**
 * Module to get all sections
 * @module getSections
 */
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

/**
 * Module to get a section
 * @module getSection
 */
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

/**
 * Module to delete a section
 * @module deleteSection
 */
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

/**
 * Module to modify a section
 * @module modifySection
 */
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
