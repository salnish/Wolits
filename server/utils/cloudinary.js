const cloudinary = require("cloudinary")

cloudinary.config({ 
    cloud_name: 'dtdviesfy', 
    api_key: '645371971892352', 
    api_secret: 'cQKZH7ahcFs5q6Tx3Qyh8nVQGec' 
  });



  const  cloudinaryUploadImg= async (fileTOUpload)=>{
    try {
        const data = await cloudinary.uploader.upload(fileTOUpload, {
            resource_type:"auto",
        });

            return {
                url: data?.secure_url,
            }

    } catch (error) {
        return error;
    }
  };

  module.exports=cloudinaryUploadImg;

