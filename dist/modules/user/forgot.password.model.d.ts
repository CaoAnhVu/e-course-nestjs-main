import { Connection, Document, Model } from 'mongoose';
interface ForgotPassword extends Document {
    readonly email: string;
    readonly newPasswordToken: string;
    readonly timestamp: Date;
}
type ForgotPasswordModel = Model<ForgotPassword>;
declare const createForgotPasswordModel: (conn: Connection) => ForgotPasswordModel;
export { ForgotPassword, ForgotPasswordModel, createForgotPasswordModel };
