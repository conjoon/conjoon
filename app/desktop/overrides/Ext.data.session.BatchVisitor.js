/**
 * conjoon
 * conjoon
 * Copyright (C) 2017-2021 Thorsten Suckow-Homberg https://github.com/conjoon/conjoon
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
 * USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * @see https://www.sencha.com/forum/showthread.php?302361-Ext-data-Session-ignores-proxy-batchActions-setting
 */
Ext.define("conjoon.overrides.Ext.data.session.BatchVisitor", {

    override: "Ext.data.session.BatchVisitor",


    getBatch: function (sort) {
        var map = this.map,
            batch = this.batch,
            bucket, entity, name, operation, operationType,
            proxy, batchActions, records, len, i;

        if (map) {
            if (!batch) {
                batch = new Ext.data.Batch();
            }

            for (name in map) {
                bucket = map[name];
                entity = bucket.entity; // the entity class
                proxy = entity.getProxy();
                batchActions = proxy.getBatchActions();

                delete bucket.entity; // so we don't think its an operation
                for (operationType in bucket) {
                    if (batchActions) {
                        operation = proxy.createOperation(operationType, {
                            records: bucket[operationType]
                        });
                        operation.entityType = entity;
                        batch.add(operation);
                    } else {
                        records = bucket[operationType];
                        for (i = 0, len = records.length; i < len; ++i) {
                            operation = proxy.createOperation(operationType, {
                                records: [records[i]]
                            });
                            operation.entityType = entity;
                            batch.add(operation);
                        }
                    }
                }
            }
        }

        if (batch && sort !== false) {
            batch.sort();
        }

        return batch;
    }

});