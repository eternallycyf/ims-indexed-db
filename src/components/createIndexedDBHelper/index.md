---
title: createIndexedDBHelper
description: createIndexedDBHelper
toc: content
group:
  title: 方法
  order: 0
demo:
  cols: 2
---

<code src='./demo/index.tsx'>createIndexedDBHelper</code>

## constructor

### params

| 参数      | 说明       | 类型   | 默认值 |
| --------- | ---------- | ------ | ------ |
| dbName    | 数据库名称 | string | -      |
| storeName | 表名称     | string | -      |

### variable

| 参数      | 说明           | 类型        | 默认值                                                                                        |
| --------- | -------------- | ----------- | --------------------------------------------------------------------------------------------- |
| db        | 数据库对象     | IDBDatabase | null                                                                                          |
| indexedDB | indexedDB 对象 | IDBFactort  | window.indexedDB \|\| window.webkitIndexedDB \|\| window.mozIndexedDB \|\| window.msIndexedDB |
| dbName    | 数据库名称     | string      | -                                                                                             |
| storeName | 表名称         | string      | -                                                                                             |

## function

### create

| 入参     | 说明     | 类型                                               | 默认值 | 返回值 |
| -------- | -------- | -------------------------------------------------- | ------ | ------ |
| callback | 回调函数 | (db: InstanceType<typeof IndexedDBHelper>) => void | -      | -      |

### open

| 入参 | 说明 | 类型 | 默认值 | 返回值                 |
| ---- | ---- | ---- | ------ | ---------------------- |
| -    | -    | -    | -      | `Promise<IDBDatabase>` |

### add

| 入参     | 说明     | 类型            | 默认值 | 返回值 |
| -------- | -------- | --------------- | ------ | ------ |
| record   | 记录     | IndexedDBRecord | -      | -      |
| callback | 回调函数 | `() => void`    | -      | -      |

### update

| 入参     | 说明     | 类型            | 默认值 | 返回值 |
| -------- | -------- | --------------- | ------ | ------ |
| record   | 记录     | IndexedDBRecord | -      | -      |
| callback | 回调函数 | `() => void`    | -      | -      |

### delete

| 入参     | 说明     | 类型         | 默认值 | 返回值 |
| -------- | -------- | ------------ | ------ | ------ |
| id       | 记录 id  | number       | -      | -      |
| callback | 回调函数 | `() => void` | -      | -      |
