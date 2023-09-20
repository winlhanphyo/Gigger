"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processAssociations = exports.associative = void 0;
const models = {};
const associateDecorator = (target) => {
    if (!target) {
        throw new Error('Cannot get property target!');
    }
    models[target.name] = target;
    return target;
};
exports.associative = associateDecorator;
const processAssociations = () => {
    Object.values(models).forEach((model) => {
        if (model.associate && typeof model.associate === 'function') {
            model.associate(models);
        }
    });
};
exports.processAssociations = processAssociations;
