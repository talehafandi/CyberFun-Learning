import { ValidateBy, buildMessage } from "class-validator";
import { isValidObjectId, ObjectId } from "mongoose";

export function isObjectId<T = ObjectId>(value: any): value is T {
    return isValidObjectId(value);
}

//todo add ValidationOptions later
export function IsObjectId(): PropertyDecorator {
    return ValidateBy({
        name: 'isObjectId',
        validator: {
            validate: (value, args): boolean => isObjectId(value),
            defaultMessage: buildMessage(eachPrefix => eachPrefix + '$property must be an ObjectId'),
        }
    })
}