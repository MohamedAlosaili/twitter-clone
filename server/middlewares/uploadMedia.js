import path from "path";
import crypto from "crypto";
import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "./asyncHandler.js";
import uploadToStorage from "../utils/uploadToStorage.js";

const uploadMedia = asyncHandler(async (req, res, next) => {
  if (req.files.length === 0) return next();
  else if (req.files.length > 4) {
    return next(new ErrorResponse("Media cannot be more than 4 files", 400));
  }

  // TODO: Max size need testing
  const maxImageSize = process.env.MAX_IMAGE_SIZE;
  const maxVideoSize = process.env.MAX_IMAGE_SIZE;

  const invalidImageSize = file => file.size > maxImageSize;
  const invalidVideoSize = file => file.size > maxVideoSize;

  let invalidType;

  const invalidSize = req.files.some(file => {
    const result = file.mimetype.startsWith("image")
      ? invalidImageSize(file)
      : invalidVideoSize(file);

    if (result) invalidType = file.mimetype.split("/")[0];

    return result;
  });

  if (invalidSize) {
    const convertBToMB = size => size / 1024 / 1024;
    return next(
      new ErrorResponse(
        `${invalidType} file must be under ${
          invalidType === "image"
            ? convertBToMB(maxImageSize)
            : convertBToMB(maxVideoSize)
        }MB`,
        400
      )
    );
  }

  const filesToUpload = req.files.map(file => {
    const name = crypto.randomBytes(10).toString("hex");
    const fileName = name + path.extname(file.originalname);

    return uploadToStorage(file, "media", fileName);
  });

  const media = await Promise.all(filesToUpload);

  req.body.media = media;

  next();
});

export default uploadMedia;

/*
media array example
[
    {
        "fieldname": "media",
        "originalname": "image-name.png",
        "encoding": "7bit",
        "mimetype": "image/png",
        "buffer": {
            "type": "Buffer",
        },
        "size": 389475
    }
]
*/
