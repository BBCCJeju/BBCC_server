/*
* book Controller
* Created by junhee on 2017.10.28..
* Copyright (c) 2017 junhee. All rights reserved.
*/

'use strict';

const Boom = require('boom'),
    Joi = require('joi');


/*********************************************************************** 
 *                              - 책 등록 (C)
*************************************************************************/
exports.create = {
    description: '책 등록 (C)',
    notes: ' ',
    tags: ['api'],
    auth: false,
    validate: {
        payload: {
            isbn: Joi.number().required(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            img: Joi.string().required(),
            author: Joi.string().required(),
            publisher: Joi.string().required(),
            publishYear: Joi.string().required()
        }
    }
    ,
    handler: (request, reply) => {
        // 전체 조회
        Book.create(request.payload)
            .exec((err, book) => {
                // 결과
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                reply(book);
            });
    }
};

/*********************************************************************** 
 *                              - 상세 책 조회 (R)
*************************************************************************/
exports.find = {
    description: '상세 책 조회 (R)',
    notes: ' ',
    tags: ['api'],
    validate: {
        params: {
            isbn: Joi.number().required()
        }
    },
    auth: false,
    handler: (request, reply) => {
        // 조회
        Book.findOne(request.params)
            .exec((err, book) => {
                // 결과
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                reply(book);
        });
    }
};



/*********************************************************************** 
 *                              - 전체 책 조회 (R)
*************************************************************************/
exports.findAll = {
    description: '전체 책 조회 (R)',
    notes: ' ',
    tags: ['api'],
    auth: false,
    handler: (request, reply) => {
        // 조회
        Book.find({})
            .exec((err, book) => {
                // 결과
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                reply(book);
        });
    }
};
// // create new data
// exports.create = {
//     description: '생성',
//     notes: ' ',
//     tags: ['api'],
//     validate: {
//         payload: {
//             attr1: Joi.string().required(),
//             attr2: Joi.string().required()
//         }
//     },
//     auth: false,
//     handler: (request, reply) => {
//         // 생성
//         Book.create(request.payload)
//             .exec((err, book) => {
//                 // 결과
//                 if (err) {
//                     return reply(Boom.badImplementation(err));
//                 }
//                 reply(book);
//         });
//     }
// };


/*********************************************************************** 
 *                              - 책 수정 (U)
*************************************************************************/
exports.update = {
    description: '수정',
    notes: ' ',
    tags: ['api'],
    validate: {
        params: {
            isbn: Joi.string().required()
        },
        payload: {
            title: Joi.string().required(),
            description: Joi.string().required(),
            img: Joi.string().required(),
            author: Joi.string().required(),
            publisher: Joi.string().required(),
            publishYear: Joi.string().required()
        }
    },
    auth: false,
    handler: (request, reply) => {
        // 수정
        Book.update({isbn: request.params.isbn}, request.payload)
            .exec((err, book) => {
                // 결과
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                reply(book);
            });
    }
};

/*********************************************************************** 
 *                              - 특정 책 삭제 (D)
*************************************************************************/
exports.destroy = {
    description: '특정 책 삭제 (D)',
    notes: ' ',
    tags: ['api'],
    validate: {
        params: {
            isbn: Joi.string().required()
        }
    },
    auth: false,
    handler: (request, reply) => {
        // 삭제
        Book.destroy({id: request.params.isbn})
            .exec((err) => {
                // 결과
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                reply({result: true});
            });
    }
};

/*********************************************************************** 
 *                              - 모든 책 삭제 (D)
*************************************************************************/
exports.destroyAll = {
    description: '모든 책 삭제 (D)',
    notes: ' ',
    tags: ['api'],
    auth: false,
    handler: (request, reply) => {
        // 삭제
        Book.destroy({})
            .exec((err) => {
                // 결과
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                reply({result: true});
            });
    }
};