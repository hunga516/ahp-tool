from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Kết nối MongoDB
client = MongoClient(os.getenv('MONGODB_URI'))
db = client[os.getenv('DATABASE_NAME')]
projects_collection = db.projects

@app.route('/api', methods=['GET'])
def hello():
    return jsonify({"message": "hi"})

@app.route('/api/projects', methods=['POST'])
def save_project():
    try:
        data = request.json
        project_id = data.get('id', str(datetime.now().timestamp()))
        
        # Thêm timestamp nếu chưa có
        if 'timestamp' not in data:
            data['timestamp'] = datetime.now().isoformat()
            
        # Lưu vào MongoDB
        result = projects_collection.insert_one({
            '_id': project_id,
            **data
        })
        
        return jsonify({
            'success': True,
            'message': 'Dự án đã được lưu thành công',
            'project_id': str(result.inserted_id)
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/api/projects', methods=['GET'])
def get_projects():
    try:
        # Lấy tất cả dự án từ MongoDB
        projects = list(projects_collection.find({}))
        
        # Chuyển đổi ObjectId thành string và loại bỏ _id
        for project in projects:
            project['id'] = str(project.pop('_id'))
        
        return jsonify({
            'success': True,
            'projects': projects
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/api/projects/<project_id>', methods=['GET'])
def get_project(project_id):
    try:
        # Tìm dự án theo ID
        project = projects_collection.find_one({'_id': project_id})
        
        if not project:
            return jsonify({
                'success': False,
                'message': 'Dự án không tồn tại'
            }), 404
            
        # Chuyển đổi ObjectId thành string
        project['id'] = str(project.pop('_id'))
            
        return jsonify({
            'success': True,
            'project': project
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 