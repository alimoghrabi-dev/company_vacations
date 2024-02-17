"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var typeSchema = new mongoose_1.Schema({
    typeName: {
        type: String,
    },
    usersHasThisType: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});
var Type = mongoose_1.models.Type || (0, mongoose_1.model)("Type", typeSchema);
exports.default = Type;
