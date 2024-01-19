from datetime import datetime, timedelta
import json
from flask import request
from flask_jwt_extended import (
    get_jwt,
    get_jwt_identity,
    jwt_required
)
from flask_restful import Resource
from app.models import Tasks
from app.schemas.task import TaskSchema

task_schema = TaskSchema()

class TaskResource(Resource):
    @classmethod
    def post(cls):
        task = task_schema.load(request.get_json())
        
        task.save_to_db()

        return {"message": "Task created successfully."}, 201
    
#class TaskUpdateResource(Resource):
    #@classmethod
    #def put(cls, task_id: int):
        #task_data = task_schema.load(request.get_json)

        #task = Tasks.find_by_id(task_data.id)

        #if not task:
            #Tasks.set_task(task_data.task)
            #task.save_to_db()

        #else:
            #return{"message": "User not found"}, 404
        #return task_schema.dump(task), 200

class TaskUpdateResource(Resource):
    @classmethod
    def put(cls, task_id: int):
        task = Tasks.find_by_id(task_id)

        if not task:
            return{"message": "Task Not Found"}, 404
        
        #Load the task data from the request
        update_task_data = task_schema.load(request.get_json())

        #update the task attribute with the new data
        task.taskname = update_task_data.taskname
        task.taskdescription = update_task_data.taskdescription
        task.startdate = update_task_data.startdate
        task.enddate = update_task_data.enddate
        task.status = update_task_data.status
        task.priority = update_task_data.priority
        task.visibility = update_task_data.visibility
        task.user_id = update_task_data.user_id

        #Save the updated task to the database
        task.save_to_db()

        return{"message": "Task updated Successfully"}, 200
    
class TaskDetailsResource(Resource):
    @classmethod
    def get(cls, task_id: int):
        task = Tasks.find_by_id(task_id)
        
        if not task:
            return {"message": "Task not found"}, 404
        return task_schema.dump(task), 200
    
class TaskDeleteResource(Resource):
    @classmethod
    def delete(cls, task_id: int):
        task = Tasks.find_by_id(task_id)

        if not task:
            return {"message": "Task not found"}, 404
        task.delete_from_db()
        return {"message": "Task deleted successfully"}, 200    
    

