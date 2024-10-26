import { FeedbackService } from './feedback.service';
import { Feedback } from '../../modules/feedback/feedback.model';
import { CreateFeedbackDTO, UpdateFeedbackDTO } from './feedback.dto';
export declare class FeedbackController {
    private feedbackService;
    constructor(feedbackService: FeedbackService);
    getAllFeedbacks(keywordUser?: string, keywordCourse?: string, limit?: number, skip?: number): Promise<Feedback[]>;
    getFeedbackById(id: string): Promise<Feedback>;
    createFeedback(value: CreateFeedbackDTO): Promise<Feedback>;
    updateFeedback(id: string, value: UpdateFeedbackDTO): Promise<import("mongoose").Document<unknown, {}, Feedback> & Feedback & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    deleteFeedbackById(id: string): Promise<import("mongoose").Document<unknown, {}, Feedback> & Feedback & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
}
