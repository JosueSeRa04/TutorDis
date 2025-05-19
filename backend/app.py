from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
app = Flask(__name__)
CORS(app)

@app.route('/check-error', methods=['POST'])
def check_error():
    data = request.get_json()
    text = data.get('text')
    lesson_number = data.get('lesson_number')
    
    print(f'Recibido en /check-error: text={text}, lesson_number={lesson_number}') # Depuración
    
    rasa_endpoint = 'http://localhost:5005/webhooks/rest/webhook'
    message = {
        "sender": "user",
        "message": f"Error en Lección {lesson_number}: {text}"
    }
    
    try:
        # Asegurar que el cuerpo JSON sea válido y use UTF-8
        headers = {'Content-Type': 'application/json; charset=utf-8'}
        response = requests.post(rasa_endpoint, data=json.dumps(message).encode('utf-8'), headers=headers)
        print("El valor de response",response)
        response_data = response.json()
        print(f'Respuesta de Rasa: {response_data}') # Depuración
        
        if response_data:
            bot_message = response_data[0].get('text', 'No se pudo procesar el error.')
            return jsonify({"message": bot_message, "error_detected": True})
        else:
            return jsonify({"message": "No se detectó un error.", "error_detected": False})
            
    except Exception as e:
        print(f'Error al conectar con Rasa: {str(e)}') # Depuración
        return jsonify({"message": f"Error al conectar con Rasa: {str(e)}", "error_detected": False})

if __name__ == '__main__':
    app.run(port=5001, debug=True)