/*
* user Model
* Created by junhee on 2017.10.19..
* Copyright (c) 2017 junhee. All rights reserved.
*/

'use strict';

module.exports = {
    tableName: 'book',                   // lower case collection or table name
    connection: 'mongoConnection',      // database connection
    attributes: {
        isbn: {
            type: 'integer',
            required: true
        },
        title: {
            type: 'string',
            required: true
        },
        description:{
            type: 'string',
            required: true     
        },
        img:{
            type: 'string',
            required: true     
        },
        author:{
            type: 'string',
            required: true     
        },
        publisher:{
            type: 'string',
            required: true     
        },
        publishYear:{
            type: 'integer',
            required: true     
        }
        
    }
};
