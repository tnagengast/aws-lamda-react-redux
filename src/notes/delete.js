import { success, failure } from '../response';
import * as dynamoDbLib from '../dynamodb';

// test: sls webpack invoke --function notes-delete --path src/notes/mocks/delete-event.json
export async function main(event, context, callback) {

    const params = {
        TableName: 'notes',
        Key: {
            user_id: event.requestContext.identity.cognitoIdentityId,
            note_id: event.pathParameters.id,
        },
    };

    try {
        await dynamoDbLib.call('delete', params);
        callback(null, success({status: true}))
    }
    catch(e) {
        callback(null, failure({status: false}));
    }
}
