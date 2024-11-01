"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamQuestionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const parse_object_id_pipe_1 = require("../../shared/pipe/parse.object.id.pipe");
const roles_guard_1 = require("../../auth/guard/roles.guard");
const role_type_enum_1 = require("../../shared/enum/role.type.enum");
const has_roles_decorator_1 = require("../../auth/guard/has-roles.decorator");
const auth_guard_1 = require("../../auth/guard/auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const api_file_decorator_1 = require("../../decorators/api.file.decorator");
const exam_question_service_1 = require("../exam.question/exam.question.service");
const exam_question_dto_1 = require("../exam.question/exam.question.dto");
let ExamQuestionController = class ExamQuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    getAllExams(keyword, limit, skip) {
        return this.questionService.findAll(keyword, skip, limit);
    }
    getExamById(id) {
        return this.questionService.findById(id);
    }
    createExam(exam) {
        return this.questionService.save(exam);
    }
    updateExam(id, exam) {
        return this.questionService.updateById(id, exam);
    }
    deleteQuestionById(id) {
        return this.questionService.deleteById(id);
    }
};
exports.ExamQuestionController = ExamQuestionController;
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiQuery)({ name: 'q', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'skip', required: false }),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('skip', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], ExamQuestionController.prototype, "getAllExams", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExamQuestionController.prototype, "getExamById", null);
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, has_roles_decorator_1.HasRoles)(role_type_enum_1.RoleType.ADMIN, role_type_enum_1.RoleType.TEACHER),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file'), api_file_decorator_1.FileToBodyInterceptor),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exam_question_dto_1.CreateExamQuestionDTO]),
    __metadata("design:returntype", void 0)
], ExamQuestionController.prototype, "createExam", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, has_roles_decorator_1.HasRoles)(role_type_enum_1.RoleType.ADMIN, role_type_enum_1.RoleType.TEACHER),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file'), api_file_decorator_1.FileToBodyInterceptor),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, exam_question_dto_1.UpdateExamQuestionDTO]),
    __metadata("design:returntype", void 0)
], ExamQuestionController.prototype, "updateExam", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, has_roles_decorator_1.HasRoles)(role_type_enum_1.RoleType.ADMIN, role_type_enum_1.RoleType.TEACHER),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExamQuestionController.prototype, "deleteQuestionById", null);
exports.ExamQuestionController = ExamQuestionController = __decorate([
    (0, swagger_1.ApiTags)('Exam question'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)({ path: 'exam_questions', scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [exam_question_service_1.ExamQuestionService])
], ExamQuestionController);
//# sourceMappingURL=exam.question.controller.js.map