"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errors = void 0;
class Errors {
    static notFound = (res, context) => {
        res.json({ body: 'Not found', context: context });
        res.status(404).json({ body: 'Not found', context: context });
        console.error('Not found: ', context);
    };
    static badRequest = (res, context) => {
        res.json({ body: 'Bad request', context: context });
        res.status(400).json({ body: 'Bad request', context: context });
        console.error('Bad request.', context);
    };
    static couldNotRetrieve = (res, context, error) => {
        res.json({ body: 'Could not retrieve', context: context, error: error });
        res.status(500).json({ body: 'Could not retrieve', context: context, error: error });
        console.error('Could not retrieve album: ', error);
    };
    static couldNotCreate = (res, context, error) => {
        res.json({ body: 'Could not create', context: context, error: error });
        res.status(500).json({ body: 'Could not create', context: context, error: error });
        console.error('Could not create album: ', error);
    };
    static couldNotUpdate = (res, context, error) => {
        res.json({ body: 'Could not update', context: context, error: error });
        res.status(500).json({ body: 'Could not update', context: context, error: error });
        console.error('Could not update album: ', error);
    };
    static couldNotDelete = (res, context, error) => {
        res.json({ body: 'Could not delete', context: context, error: error });
        res.status(500).json({ body: 'Could not delete', context: context, error: error });
        console.error('Could not delete album: ', error);
    };
}
exports.Errors = Errors;
