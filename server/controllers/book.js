/*
* book Controller
* Created by junhee on 2017.10.28..
* Copyright (c) 2017 junhee. All rights reserved.
*/

'use strict';

const Boom = require('boom'),
    Joi = require('joi'),
    Co = require('co');


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
            publishYear: Joi.number().required(),
            category: Joi.number().required()
        }
    }
    ,
    handler: (request, reply) => {
        // 책 생성
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
 *                              - isbn으로 상세 책 조회 (R)
*************************************************************************/
exports.findByIsbn = {
    description: 'isbn으로 상세 책 조회 (R)',
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
 *                              - category로 책 목록 조회 (R)
*************************************************************************/
exports.findByCategory = {
    description: 'category로 책 목록 조회 (R)',
    notes: ' ',
    tags: ['api'],
    validate: {
        params: {
            category: Joi.number().required()
        }
    },
    auth: false,
    handler: (request, reply) => {
        // 조회
        Book.find(request.params)
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
            publishYear: Joi.number().required(),
            category: Joi.number().required()
        }
    },
    auth: false,
    handler: (request, reply) => {
        // 수정
        Book.update({ isbn: request.params.isbn }, request.payload)
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
        Book.destroy({ id: request.params.isbn })
            .exec((err) => {
                // 결과
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                reply({ result: true });
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
                reply({ result: true });
            });
    }
};

/*********************************************************************** 
 *                              - 모든 검색
*************************************************************************/
//search data
exports.search = {
    description: '책 검색',
    tags: ['api'],
    auth: false,
    handler: function (request, reply) {
        Co(function* () {
            try {
                if (!request.query.keyword) {
                    console.log("here");
                    return yield Book.find({});
                }

                var book01 = yield Book.find({ isbn: '%' + request.query.keyword + '%' });
                var book02 = yield Book.find({ title: '%' + request.query.keyword + '%' });
                var book03 = yield Book.find({ author: '%' + request.query.keyword + '%' });
                var book04 = yield Book.find({ publisher: '%' + request.query.keyword + '%' });
                var book05 = yield Book.find({ publishYear: '%' + request.query.keyword + '%' });

                //array merge
                Array.prototype.unique = function () {
                    var a = this.concat();
                    for (var i = 0; i < a.length; ++i) {
                        for (var j = i + 1; j < a.length; ++j) {
                            if (a[i] === a[j])
                                a.splice(j--, 1);
                        }
                    }

                    return a;
                };

                //결과
                var resultArr = book01.concat(book02, book03, book04, book05).unique();

                return resultArr;
            }
            catch (err) {
                console.log('1');
                console.log(err);
                throw err;

            }
        }).then(function (resultArr) {
            reply(resultArr);
        }).catch(function (err) {
            console.log('2');
            return reply(Boom.badImplementation(err));
        });

    }
};