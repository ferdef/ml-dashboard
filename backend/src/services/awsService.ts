import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  ScanCommand,
  DeleteCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';

const region = process.env.AWS_REGION || 'us_east-1';
const dynamoClient = new DynamoDBClient({ region });
const docClient = DynamoDBDocumentClient.from(dynamoClient);
const s3Client = new S3Client({ region });

const MODELS_TABLE = process.env.DYNAMODB_MODELS_TABLE || 'ml-dashboard-models';
const ASSETS_BUCKET = process.env.S3_ASSETS_BUCKET || 'ml-dashboard-assets';

export const dynamoService = {
  getAll: async (tableName: string) => {
    const command = new ScanCommand({ TableName: tableName });

    const response = await docClient.send(command);
    return response.Items || [];
  },

  getById: async (tableName: string, id: string) => {
    const command = new GetCommand({ TableName: tableName, Key: { id } });
    const response = await docClient.send(command);
    return response.Item || null;
  },

  createItem: async (tableName: string, item: any) => {
    const command = new PutCommand({
      TableName: tableName,
      Item: {
        ...item,
        id: item.id || Math.random().toString(36).substring(2, 15),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });

    await docClient.send(command);
    return item;
  },

  updateItem: async (tableName: string, id: string, item: any) => {
    const existingItem = await dynamoService.getById(tableName, id);

    if (!existingItem) {
      return null;
    }

    const updateExpression = Object.keys(item).reduce((expression, key, index) => {
      return `${expression}${index === 0 ? 'set ' : ', '}#${key} = :${key}`;
    }, '');

    const expressionAttributeNames = Object.keys(item).reduce((names, key) => {
      return { ...names, [`#${key}`]: key };
    }, {});

    const expressionAttributeValues = Object.keys(item).reduce(
      (values, key) => {
        return { ...values, [`:${key}`]: item[key] };
      },
      { ':updatedAt': new Date().toISOString() },
    );

    const command = new UpdateCommand({
      TableName: tableName,
      Key: { id },
      UpdateExpression: `${updateExpression}, #updatedAt = :updatedAt`,
      ExpressionAttributeNames: { ...expressionAttributeNames, '#updatedAt': 'updatedAt' },
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    });

    const response = await docClient.send(command);
    return response.Attributes;
  },

  deleteItem: async (tableName: string, id: string) => {
    const command = new DeleteCommand({
      TableName: tableName,
      Key: { id },
    });

    await docClient.send(command);
    return true;
  },
};

export const s3Service = {
  uploadFile: async (bucket: string, key: string, body: Buffer, contentType: string) => {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    });

    return await s3Client.send(command);
  },

  downloadFile: async (bucket: string, key: string) => {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    const response = await s3Client.send(command);
    return response.Body;
  },

  deleteFile: async (bucket: string, key: string) => {
    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    return await s3Client.send(command);
  },
};
