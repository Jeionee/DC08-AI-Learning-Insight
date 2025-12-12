import joblib
import pandas as pd
import os

from repositories.student_repository import StudentRepository
from ml.predictor import predict_learning_style
from utils.calculate import calculate_features

class PredictionService:
    @staticmethod
    def predict(student_id):
        student, trackings, submissions, registrations = StudentRepository.get_student_data(student_id)
    
        if not student:
            return "Student not found"
    
        features = calculate_features(trackings, submissions, registrations)
    
        predicted_style = predict_learning_style(features)
    
        if predicted_style == "Model_Not_Loaded":
            return predicted_style
    
        StudentRepository.update_learning_style(student_id, predicted_style)
    
        return predicted_style