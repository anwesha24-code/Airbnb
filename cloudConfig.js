const cloudinary=require('cloudinary').v2;
const {CloudinaryStorage}=require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,//cloud_name,api_key,api_secret these are default names given by cloudinary
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
});

const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'wanderlust_DEV',//folder name where images will be stored in cloudinary
        allowedFormats: ['png','jpg','jpeg'],//supports promises as well
        // public_id: (req,file)=>'computed-filename-using-request',//file name to be used
    }
});

module.exports={
    cloudinary,
    storage
};