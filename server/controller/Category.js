const Category = require('../model/Category');


//create category handler function
exports.createCategory = async (req, res) => {
    try {

        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            })
        };

        //create entry in db
        const categoryDetails = await Category.create({
            name: name,
            description: description
        });
        console.log(categoryDetails);
        //return response
        return res.status(200).json({
            success: true,
            message: "Category created successfully"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Error while creating categories",
        })
    }
}

//get all categories
exports.showAllcategory = async (req, res) => {
    try {
        const showAllcategory = await Category.find({}, { name: true, description: true });
        console.log(showAllcategory);
        return res.status(200).json({
            success: true,
            message: "All categories are fetched successfully",
            showAllcategory
        })
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: "Error while fetching all categories",
        })
    }
}

// category page detail

exports.getCategoryDetail = async (req, res) => {
    try {
        //get category id 
        const { categoryId } = req.body;
        // console.log(categoryId);
        //get courses from specified categoryId
        const result = await Category.findById(categoryId)
            .populate("course").exec();
        //validation
        // console.log(result);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Data not found for this category"
            })
        }

        //get courses from different category
        const differentCategory = await Category.find({
            _id: { $ne: categoryId }, // ne means not equal
        }).populate("course").exec();

        // i don't want to show top selling course

        return res.status(200).json({
            success: true,
            data: {
                result,
                differentCategory,
            }
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Error encounter while fetching category details",
        })
    }
} 