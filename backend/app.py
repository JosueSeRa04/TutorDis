# app.py
from fastapi import FastAPI
from pydantic import BaseModel
from gpt4all import GPT4All
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import Dict, Any

app = FastAPI()

# CORS para permitir conexión con frontend en localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.options("/chat")
async def options_chat():
    return JSONResponse(status_code=200)

# Carga del modelo GPT4All
modelo = "zephyr-7b-alpha.Q4_K_M.gguf"
ruta_modelo = "C:/Users/josus/OneDrive/Escritorio/appdis/backend/gpt4all-backend/gpt4all-models"
model = GPT4All(modelo, model_path=ruta_modelo)
print("Modelo cargado correctamente.")

# Esquema de datos de entrada
class ChatRequest(BaseModel):
    prompt: str
    lesson_context: str
    error_data: dict | None = None

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        print("📨 Solicitud recibida:", request.prompt)
        full_prompt = f"{request.lesson_context.strip()}\n\n"

        if request.error_data:
            full_prompt += "A continuación se presenta un error ortográfico detectado:\n"
            full_prompt += f"{request.error_data}\n\n"
            full_prompt += (
                "Por favor, proporciona una breve explicación sobre cuál fue el error "
                "y cómo debe corregirse. Sé directo y útil, como si hablaras con un estudiante.\n"
            )
        else:
            full_prompt += f"Pregunta del usuario: {request.prompt.strip()}"

        response = model.generate(full_prompt,max_tokens=128, temp=0.2)
        return {"response": response}
    except Exception as e:
        print("❌ Error en el backend:", e)
        return {"error": str(e)}
    

class ReporteRequest(BaseModel):
    nombre_alumno: str
    estadisticas: Dict[str, Any]  # ✔️ esto representa un objeto/diccionario

@app.post("/generar-reporte-ia")
async def generar_reporte_ia(request: ReporteRequest):
    nombre = request.nombre_alumno
    estadisticas = request.estadisticas
    print("📨 Solicitud recibida: Generar reporte")
    prompt = f"""
    Genera un breve reporte de progreso para un niño llamado {nombre}.
    
    Estadísticas:
    - Puntaje Total: {estadisticas.get('puntaje_total', 'N/A')}
    - Desempeño: {estadisticas.get('desempeno', 'N/A')}%
    - Total de Intentos: {estadisticas.get('total_intentos', 'N/A')}
    - Promedio de errores: {estadisticas.get('promedio_errores', 'N/A')}
    - Último intento: {estadisticas.get('ultima_fecha', 'N/A')}

    El reporte debe ser claro, motivador y corto. Menciónalo por su nombre.
    """

    response = model.generate(prompt, max_tokens=128, temp=0.4)
    return {"reporte": response}