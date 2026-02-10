import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({ region: "us-east-2" });

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const text = body.text;

    const command = new PutObjectCommand({
      Bucket: "amzn-txt-bucket",
      Key: `note-${Date.now()}.txt`,
      Body: text,
      ContentType: "text/plain",
    });

    await s3Client.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "File uploaded successfully!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
