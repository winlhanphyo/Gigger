"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerModels = exports.AssociativeModel = void 0;
var DbModelNameEnum;
(function (DbModelNameEnum) {
    DbModelNameEnum[DbModelNameEnum["UserDbModel"] = 0] = "UserDbModel";
    DbModelNameEnum[DbModelNameEnum["RoleDbModel"] = 1] = "RoleDbModel";
    DbModelNameEnum[DbModelNameEnum["EventDbModel"] = 2] = "EventDbModel";
    DbModelNameEnum[DbModelNameEnum["EventUserDbModel"] = 3] = "EventUserDbModel";
    DbModelNameEnum[DbModelNameEnum["ArtistDbModel"] = 4] = "ArtistDbModel";
    DbModelNameEnum[DbModelNameEnum["ScheduleDbModel"] = 5] = "ScheduleDbModel";
    DbModelNameEnum[DbModelNameEnum["UserVideoDbModel"] = 6] = "UserVideoDbModel";
    DbModelNameEnum[DbModelNameEnum["VideoDbModel"] = 7] = "VideoDbModel";
})(DbModelNameEnum || (DbModelNameEnum = {}));
const models = {};
const AssociativeModel = (target) => {
    if (!target) {
        throw new Error('Cannot get property target!');
    }
    models[target.name] = target;
    return target;
};
exports.AssociativeModel = AssociativeModel;
const registerModels = () => {
    const modelMapData = Object.values(models).map((m) => {
        if (typeof (m === null || m === void 0 ? void 0 : m.associate) === 'function') {
            m.associate(models);
        }
        return [m.name, m];
    });
    return new Map(modelMapData);
};
exports.registerModels = registerModels;
