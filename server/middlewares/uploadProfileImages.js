import asyncHandler from "./asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import uploadToStorage from "../utils/uploadToStorage.js";

const uploadProfileImages = asyncHandler(async (req, res, next) => {
  if (!req.files) {
    return next(new ErrorResponse("No file included", 400));
  }

  let avatar = req.files.avatar?.[0];
  let header = req.files.header?.[0];

  const files = Object.values(req.files);
  const invalidType = files.some(file => !file[0].mimetype.startsWith("image"));
  const invalidSize = files.some(
    file => file[0].size > process.env.MAX_PROFILE_IMAGE_SIZE
  );

  if (invalidType) {
    return next(
      new ErrorResponse("Invalid file type. only images are valid", 400)
    );
  }
  if (invalidSize) {
    return next(new ErrorResponse(`Profile image must be under 1MB`, 400));
  }

  const userId = req.user.id;

  const images = [];
  if (avatar) images.push(getImageUrl(avatar, userId));
  if (header) images.push(getImageUrl(header, userId));

  const uploaded = await Promise.all(images);

  let uploadedImages = {};
  uploaded.forEach(img => (uploadedImages = { ...uploadedImages, ...img }));

  req.body.images = uploadedImages;

  next();
});

const getImageUrl = async (file, userId) => {
  return {
    [file.fieldname]: (
      await uploadToStorage(file, file.fieldname, `${userId}-${file.fieldname}`)
    ).url,
  };
};

export default uploadProfileImages;

/*
{
  avatar: [
    {
      fieldname: 'avatar',
      originalname: 'avatar.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      buffer: ,
      size: 110179
    }
  ],
  header: [
    {
      fieldname: 'header',
      originalname: 'header.png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: ,
      size: 389475
    }
  ]
}
*/
