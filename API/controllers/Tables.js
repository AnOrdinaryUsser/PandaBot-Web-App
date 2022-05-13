import Tables from "../models/TableModel.js";
 
export const getTables = async(req, res) => {
    try {
        const tables = await Tables.findAll({
            attributes:['id','seats','positionX','positionY']
        });
        res.json(tables);
    } catch (error) {
        console.log(error);
    }
}
 
export const addTable = async(req, res) => {
    const { id, seats, positionX, positionY } = req.body;
    try {
        await Tables.create({
            id: id,
            seats: seats,
            positionX: positionX,
            positionY: positionY
        });
        res.json({msg: "Table Created"});
    } catch (error) {
        console.log(error);
    }
}


