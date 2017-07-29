/**
 * @see https://www.sencha.com/forum/showthread.php?302361-Ext-data-Session-ignores-proxy-batchActions-setting
 */
Ext.define('conjoon.overrides.Ext.data.session.BatchVisitor', {

    override: 'Ext.data.session.BatchVisitor',


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