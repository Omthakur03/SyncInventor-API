const Department =  require("../models/department.model");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFound, UnauthenticatedError } = require("../errors");

const addDepartment = async(req,res) => {
    const {name,year} = req.body;

    const department = new Department({
        name,
        year
    });

    const data = await department.save();

    res.status(StatusCodes.CREATED).json({
        success: true,
        msg: "Department added successfully",
        data
    });
}

const fetchyearbyDept = async (req,res) =>{
    const {name} = req.body;

    const data = await Department.findOne({name : name});

    if (!data) {
        throw new NotFound('Organization Not Found')
    }

    const id = data.id;
    const dept_year = data.year;
    console.log(dept_year);
    console.log(id);

    res.status(StatusCodes.CREATED).json({
        msg : "Year Found",
        data
    });

}

const fetchDept = async (req,res) => {
    const data = await Department.find();

    const dept = data.name;
    console.log(dept);

    res.status(StatusCodes.CREATED).json({
        msg : "Dept Found",
        data
    });
}

module.exports = {
    addDepartment,
    fetchyearbyDept,
    fetchDept
}