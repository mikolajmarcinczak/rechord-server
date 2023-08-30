"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertIsError = void 0;
function assertIsError(error) {
    if (!(error instanceof Error)) {
        throw error;
    }
}
exports.assertIsError = assertIsError;
