/**
 * @file Controller to handle frontend tables requests
 */
import Tables from "../models/TableModel.js";

/**
 * Module to get all tables
 * @module getTables
 */
export const getTables = async(req, res) => {
    try {
        const tables = await Tables.findAll({
            attributes:['id','seats','positionX','positionY','qrURL']
        });
        res.json(tables);
    } catch (error) {
        console.log(error);
    }
}

/**
 * Module to add a table
 * @module addTable
 */
export const addTable = async(req, res) => {
    const { id, seats, positionX, positionY, qrURL } = req.body;
    try {
        await Tables.create({
            id: id,
            seats: seats,
            positionX: positionX,
            positionY: positionY,
            qrURL: qrURL,
        });
        res.json({msg: "Table Created"});
    } catch (error) {
        console.log(error);
    }
}

/**
 * Module to delete a table
 * @module deleteTable
 */
export const deleteTable = async(req, res) => {
    const { id } = req.body;
    try {
        await Tables.destroy({
            where: { id: id },
        });
        res.json({msg: "Table Destroyed"});
    } catch (error) {
        console.log(error);
    }
}


