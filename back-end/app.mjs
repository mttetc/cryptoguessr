/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { nanoid } from 'nanoid';

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = 'scores';

const getCurrentPrice = async (currency, crypto) => {
  const response = await fetch(
    `https://api.binance.com/api/v3/ticker/price?symbol=${crypto}${currency}`,
  );
  const data = await response.json();
  return parseFloat(data.price);
};

export const lambdaHandler = async event => {
  let body;
  let statusCode = 200;
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  };

  try {
    // Determine the operation based on HTTP method and resource path
    const operation = `${event.httpMethod} ${event.resource}`;

    switch (operation) {
      case 'OPTIONS /scores/{id}':
      case 'OPTIONS /scores':
        // Handle CORS preflight request
        statusCode = 200;
        body = ''; // No need to return any body for OPTIONS
        break;
      case 'GET /scores/{id}':
        body = await dynamo.send(
          new GetCommand({
            TableName: tableName,
            Key: {
              id: event.pathParameters.id,
            },
          }),
        );
        body = body.Item;
        break;
      case 'POST /scores': {
        const { currency, crypto, price, direction } = JSON.parse(event.body);
        const currentPrice = await getCurrentPrice(currency, crypto);

        // Fetch the current score from the database
        const id = nanoid();
        let newScore = 0; // Default score if no previous score exists

        const getResult = await dynamo.send(
          new GetCommand({
            TableName: tableName,
            Key: { id },
          }),
        );

        if (getResult.Item) {
          newScore = getResult.Item.score;
        }

        if (
          (direction === 'up' && currentPrice > price) ||
          (direction === 'down' && currentPrice < price)
        ) {
          newScore++;
        } else {
          newScore--;
        }

        // Ensure the score does not go below 0
        newScore = Math.max(newScore, 0);

        await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: {
              id,
              score: newScore,
            },
          }),
        );
        body = { id, score: newScore };
        break;
      }
      case 'PATCH /scores/{id}': {
        const {
          currency: patchCurrency,
          crypto: patchCrypto,
          price: patchPrice,
          direction: patchDirection,
        } = JSON.parse(event.body);
        const patchCurrentPrice = await getCurrentPrice(
          patchCurrency,
          patchCrypto,
        );

        const getResult = await dynamo.send(
          new GetCommand({
            TableName: tableName,
            Key: {
              id: event.pathParameters.id,
            },
          }),
        );

        let updatedScore = getResult.Item.score;
        if (
          (patchDirection === 'up' && patchCurrentPrice > patchPrice) ||
          (patchDirection === 'down' && patchCurrentPrice < patchPrice)
        ) {
          updatedScore++;
        } else {
          updatedScore--;
        }

        // Ensure the score does not go below 0
        updatedScore = Math.max(updatedScore, 0);

        await dynamo.send(
          new UpdateCommand({
            TableName: tableName,
            Key: {
              id: event.pathParameters.id,
            },
            UpdateExpression: 'set score = :s',
            ExpressionAttributeValues: {
              ':s': updatedScore,
            },
          }),
        );
        body = { score: updatedScore };
        break;
      }
      default:
        throw new Error(`Unsupported operation: "${operation}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};