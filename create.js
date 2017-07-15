import uuid from 'uuid';
import * as dynamoDbLib from './src/dynamodb';
import { success, failure } from './src/response';
import AWS from 'aws-sdk';

export async function main(event, context, callback) {
    const data = JSON.parse(event.body);

    const params = {
        TableName: 'notes',
        Item: {
            user_id: event.requestContext.authorizer.claims.sub,
            note_id: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            created_at: new Date().getTime(),
        },
    };

    try {
        const result = await dynamoDbLib.call('put', params);
        callback(null, success(params.Item));
    }
    catch(e) {
        callback(null, failure({status: false}));
    }
};
