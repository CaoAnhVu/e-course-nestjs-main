import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import mongoose, { Model } from 'mongoose';
import {
  EXAM_HISTORY_MODEL,
  EXAM_LESSON_MODEL,
  EXAM_QUESTION_MODEL,
} from '../../processors/database/database.constants';
import { AuthenticatedRequest } from '../../interfaces/authenticated.request.interface';
import { ExamHistory } from './exam.history.model';
import { CreateExamHistoryDTO, UpdateExamHistoryDTO } from './exam.history.dto';
import { ExamQuestion } from '../exam.question/exam.question.model';
import { ExamLesson } from '../exam.lesson/exam.lesson.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ExamHistoryService {
  constructor(
    @Inject(EXAM_HISTORY_MODEL)
    private readonly historyModel: Model<ExamHistory>,
    @InjectModel(EXAM_QUESTION_MODEL)
    private readonly questionModel: Model<ExamQuestion>,
    @InjectModel(EXAM_LESSON_MODEL)
    private readonly lessonModel: Model<ExamLesson>,
    @Inject(REQUEST) private readonly req: AuthenticatedRequest,
  ) {}

  async findAll(
    keywordUser?: string,
    keywordExam?: string,
    skip: number = 0,
    limit: number = 10,
  ): Promise<ExamHistory[]> {
    if (keywordUser?.trim() === '') {
      throw new BadRequestException('Do not enter spaces.');
    }
    if (keywordExam?.trim() === '') {
      throw new BadRequestException('Do not enter spaces.');
    }

    const query: any = {};
    if (keywordUser) {
      query.userId = { $regex: keywordUser, $options: 'i' }; // Adjusting to userId
    }
    if (keywordExam) {
      query.examId = { $regex: keywordExam, $options: 'i' }; // Adjusting to examId
    }

    return this.historyModel
      .find(query)
      .select('-__v')
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async findById(id: string): Promise<ExamHistory> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Please enter a valid id.');
    }

    const res = await this.historyModel
      .findById(id)
      .populate('correct')
      .populate('questions');

    if (!res) {
      throw new NotFoundException('Exam history not found.');
    }
    return res;
  }

  async save(data: CreateExamHistoryDTO): Promise<ExamHistory> {
    const lesson = await this.lessonModel.findById(data.lesson);
    if (!lesson) {
      throw new NotFoundException('Lesson not found.');
    }

    data.correct = [];
    data.questions = [];

    for (const element of data.examSubmit) {
      const question = await this.questionModel.findById(element.id);
      if (!question) {
        throw new NotFoundException(
          `Question with ID ${element.id} not found.`,
        );
      }

      if (question.answer === element.answer) {
        data.correct.push(question.id);
      }
      data.questions.push(question.id);
    }

    data.point = data.correct.length * (lesson.point / data.examSubmit.length);
    const res = await this.historyModel.create(data);

    return this.historyModel
      .findById(res._id)
      .populate('correct')
      .populate('questions');
  }

  async updateById(
    id: string,
    data: UpdateExamHistoryDTO,
  ): Promise<ExamHistory> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Please enter a valid id.');
    }

    const update = await this.historyModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!update) {
      throw new NotFoundException('Exam history not found.');
    }
    return update;
  }

  async deleteById(id: string): Promise<ExamHistory> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Please enter a valid id.');
    }

    const value = await this.historyModel.findById(id);
    if (!value) {
      throw new NotFoundException('Exam history not found.');
    }

    return this.softRemove(value);
  }

  async softRemove(value: ExamHistory): Promise<ExamHistory> {
    value.deleteAt = value.deleteAt ? null : new Date();
    return this.historyModel.findByIdAndUpdate(value.id, value, { new: true });
  }
}
