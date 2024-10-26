import mongoose, { Model } from 'mongoose';
import { AuthenticatedRequest } from '../../interfaces/authenticated.request.interface';
import { Feedback } from '../../modules/feedback/feedback.model';
import { CreateFeedbackDTO, UpdateFeedbackDTO } from './feedback.dto';
import { Course } from '../course/course.model';
export declare class FeedbackService {
    private feedbackModel;
    private courseModel;
    private req;
    constructor(feedbackModel: Model<Feedback>, courseModel: Model<Course>, req: AuthenticatedRequest);
    findAll(keywordUser?: string, keywordCourse?: string, skip?: number, limit?: number): Promise<Feedback[]>;
    findById(id: string): Promise<Feedback>;
    save(data: CreateFeedbackDTO): Promise<Feedback>;
    updateById(id: string, data: UpdateFeedbackDTO): Promise<mongoose.Document<unknown, {}, Feedback> & Feedback & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    deleteById(id: string): Promise<mongoose.Document<unknown, {}, Feedback> & Feedback & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    softRemove(value: Feedback): Promise<mongoose.Document<unknown, {}, Feedback> & Feedback & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
}
