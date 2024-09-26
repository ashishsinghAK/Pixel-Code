const cloudinary = require('cloudinary').v2;

exports.uploadImage = async (file, folder, height, quality) => {
    const options = { folder };
    if (height) {
        options.height = height;
    }
    if (quality) {
        options.quality = quality;
    }

    options.resource_type = 'auto'

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.uploadVideo = async (file, folder, height, quality) => {
    const options = { folder };
    if (height) {
        options.height = height;
    }
    if (quality) {
        options.quality = quality;
    }

    options.resource_type = "video"

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}