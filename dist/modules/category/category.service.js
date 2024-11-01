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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("mongoose");
const database_constants_1 = require("../../processors/database/database.constants");
let CategoryService = class CategoryService {
    constructor(categoryModel, req) {
        this.categoryModel = categoryModel;
        this.req = req;
    }
    async findAll(keyword, skip = 0, limit = 10) {
        if (keyword && keyword.trim() === '') {
            throw new common_1.BadRequestException('Do not enter spaces.');
        }
        const query = keyword
            ? { category: { $regex: keyword, $options: 'i' } }
            : {};
        return this.categoryModel
            .find({ ...query })
            .select('-__v')
            .skip(skip)
            .limit(limit)
            .exec();
    }
    async findById(id) {
        const isValidId = mongoose_1.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const res = this.categoryModel.findById(id);
        if (!res) {
            throw new common_1.NotFoundException('Category not found.');
        }
        return res;
    }
    async save(data) {
        if (data.category == '') {
            throw new common_1.BadRequestException("Can't ");
        }
        const existingCategory = await this.categoryModel.findOne({
            category: data.category,
        });
        if (existingCategory) {
            throw new common_1.BadRequestException('Category already exists');
        }
        const res = await this.categoryModel.create({ ...data });
        return res;
    }
    async updateById(id, data) {
        const isValidId = mongoose_1.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const existingCategory = await this.categoryModel.findOne({
            category: data.category,
        });
        if (existingCategory) {
            throw new common_1.BadRequestException('Category already exists');
        }
        const post = await this.categoryModel
            .findByIdAndUpdate(id, data)
            .setOptions({ overwrite: true, new: true });
        if (!post) {
            throw new common_1.NotFoundException();
        }
        return post;
    }
    async deleteById(id) {
        const isValidId = mongoose_1.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const value = await this.categoryModel.findById(id);
        return this.softRemove(value);
    }
    async softRemove(value) {
        if (value.deleteAt != null) {
            value.deleteAt = null;
        }
        else {
            value.deleteAt = new Date();
        }
        const post = await this.categoryModel
            .findByIdAndUpdate(value.id, value)
            .setOptions({ overwrite: true, new: true });
        return post;
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, common_1.Inject)(database_constants_1.CATEGORY_MODEL)),
    __param(1, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [mongoose_1.Model, Object])
], CategoryService);
//# sourceMappingURL=category.service.js.map