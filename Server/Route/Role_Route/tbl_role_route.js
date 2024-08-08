const express = require ('express');
const role = express.Router();
const joi = require('joi');
const role_Validation = require ('../../Controller/Role/Role_validation')


const {view_role, post_role, update_role, delete_role} = require('../../Controller/Role/tbl_hsptl_role')

role.get("/api/hospital/view_role",view_role)
role.post("/api/hospital/post_role",role_Validation,post_role)
role.put("/api/hospital/update_role/:role_id",update_role)
role.delete("/api/hospital/delete_role/:role_id",delete_role)

/**
 * @swagger
 * components:
 *      schemas:
 *             tbl_hsptl_role:
 *             type: object
 *             property:
 *              role_id:
 *                      type: string       
 *              role_name:
 *                      type: string    
 */

/** 
 * @swagger
 * /api/hospital/view_role: 
 *          get:
 *               summary: retrieve all role records 
 *               description: node  js put api testing
 *               responses: 
 *                      200:
 *                           description: successful retrievel of role records
 *                           content:
 *                           application/json:
 *                                   schema:
 *                                        type: array
 *                                        items:
 *                                             $ref:'#components/schemas/tbl_hsptl_role'
 */
/**
 *  @swagger
 * /api/hospital/post_role:
 *      post:
 *             summary: check post method
 *             description: node js post api
 *             requestBody:
 *                   required: true
 *                   content:
 *                      application/json:
 *                            schema:
 *                                $ref: "#components/schemas/tbl_hsptl_role"
 *                   responses:
 *                          200:
 *                               description: added sucessfully
 * 
 */

/**
 * @swagger
 * /api/hospital/update_role/{role_id}:
 *             put:
 *                 summary: node js api
 *                 description: node js api
 *                 parameters: 
 *                      - in: path
 *                        name: role_id
 *                        required: true
 *                        description: string role_id required
 *                        schema: 
 *                              type: string 
 *                 requestBody:
 *                     required: true
 *                     content:
 *                       application/json:
 *                         schema:
 *                            $ref: '#components/schemas/tbl_hsptl_role'
 *                 responses:
 *                      200:     
 *                         description: added successfully
 *                         content:
 *                           application/json:
 *                                     schema:
 *                                         type: array
 *                                         items:
 *                                             $ref:'#components/schemas/tbl_hsptl_role'        
 */

/**
 * @swagger
 * /api/hospital/delete_role/{role_id}:
 *          delete:
 *                  summary: this api is used to check delete method is working or not
 *                  description: this api is used to check delete method is working or not
 *                  parameters: 
 *                     - in: path
 *                       name: role_id
 *                       required: true
 *                       description: string role_id required        
 *                       schema: 
 *                           type: string
 *                       responses: 
 *                            200:
 *                              description: delete succefully
 */



module.exports = role