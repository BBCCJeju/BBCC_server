/*
* book Route
* Created by junhee on 2017.10.28..
* Copyright (c) 2017 junhee. All rights reserved.
*/

'use strict';

const book = require('../controllers/book');

module.exports = [
    { method: 'GET', path: '/book', config: book.findAll },
    { method: 'GET', path: '/book/{isbn}', config: book.find },
    { method: 'POST', path: '/book', config: book.create },
    { method: 'PUT', path: '/book/{isbn}', config: book.update },
    { method: 'DELETE', path: '/book/{isbn}', config: book.destroy },
    { method: 'DELETE', path: '/book', config: book.destroyAll },
    { method: 'GET', path: '/book/search', config: book.search },
];