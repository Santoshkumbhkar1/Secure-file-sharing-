import { s3 } from "../config/awsConfig.js";

// **Upload File**
export const uploadFile = async (req, res) => {
  const { fileName, fileType } = req.body;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    ContentType: fileType,
    ACL: "private",
  };

  try {
    const signedUrl = await s3.getSignedUrlPromise("putObject", params);
    res.json({ uploadUrl: signedUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// **Generate Download URL**
export const getDownloadUrl = async (req, res) => {
  const { fileName } = req.query;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Expires: 60,
  };

  try {
    const signedUrl = await s3.getSignedUrlPromise("getObject", params);
;
    res.json({ downloadUrl: signedUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
