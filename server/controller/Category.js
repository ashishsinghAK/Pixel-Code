const Category = require('../model/Category');


//create tag handler function
exports.createCategory = async(req,res) => {
    try{
        const {name,description} = req.body;
        if(!name || !description){
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            })
        };

        //create entry in db
        const categoryDetails = await Category.create({
            name:name,
            description:description
        });
        console.log(categoryDetails);
        //return response
        return res.status(200).json({
            success:false,
            message:"Category created successfully"
        })
    }catch(error){
        console.log(error)
        return res.json({
            success:false,
            message:"Error while creating categories",
        })
    }
}

//get all tags
exports.showAllcategory = async(req,res) => {
    try{
        const showAllcategory = await Category.find({},{name:true,description:true});
        console.log(showAllcategory);
        return res.status(200).json({
            success:true,
            message:"All categories are fetched successfully"
        })
    }catch(error){
        console.log(error.message);
        return res.json({
            success:false,
            message:"Error while fetching all categories",
        })
    }
}