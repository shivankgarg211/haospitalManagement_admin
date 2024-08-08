const express = require ('express');
const room = express.Router()
const joi =require('joi');
const room_Validation = require('../../Controller/Room/room_validation');


const {view_room,post_room,update_room,delete_room} = require('../../Controller/Room/tbl_hsptl_room');


room.get("/api/hospital/view_room",view_room)
room.post("/api/hospital/post_room",room_Validation, post_room)
room.put("/api/hospital/update_room/:room_id",update_room)
room.delete("/api/hospital/delete_room/:room_id",delete_room);

// swagger 

/**
 * @swagger
 * components:
 *      schemas:
 *             tbl_hsptl_room:
 *             type: object
 *             property:
 *              room_id:
 *                      type: string       
 *              room_name:
 *                      type: string    
 */


/** 
 * @swagger
 * /api/hospital/view_room: 
 *          get:
 *               summary: retrieve all room records 
 *               description: node  js get api testing
 *               responses: 
 *                      200:
 *                           description: successful retrievel of room records
 *                           content:
 *                           application/json:
 *                                   schema:
 *                                        type: array
 *                                        items:
 *                                             $ref:'#components/schemas/tbl_hsptl_room'
 */

/**
 *  @swagger
 * /api/hospital/post_room:
 *      post:
 *             summary: check post method
 *             description: node js post api
 *             requestBody:
 *                   required: true
 *                   content:
 *                      application/json:
 *                            schema:
 *                                $ref: "#components/schemas/tbl_hsptl_room"
 *                   responses:
 *                          200:
 *                               description: added sucessfully
 * 
 */

/**
 * @swagger
 * /api/hospital/update_room/{room_id}:
 *             put:
 *                 summary: node js api
 *                 description: node js api
 *                 parameters: 
 *                      - in: path
 *                        name: room_id
 *                        required: true
 *                        description: string room_id required
 *                        schema: 
 *                              type: string 
 *                 requestBody:
 *                     required: true
 *                     content:
 *                       application/json:
 *                         schema:
 *                            $ref: '#components/schemas/tbl_hsptl_room'
 *                 responses:
 *                      200:     
 *                         description: added successfully
 *                         content:
 *                           application/json:
 *                                     schema:
 *                                         type: array
 *                                         items:
 *                                             $ref:'#components/schemas/tbl_hsptl_room'        
 */

/**
 * @swagger
 * /api/hospital/delete_room/{room_id}:
 *          delete:
 *                  summary: this api is used to check delete method is working or not
 *                  description: this api is used to check delete method is working or not
 *                  parameters: 
 *                     - in: path
 *                       name: room_id
 *                       required: true
 *                       description: string room_id required        
 *                       schema: 
 *                           type: string
 *                       responses: 
 *                            200:
 *                              description: delete succefully
 */

module.exports = room