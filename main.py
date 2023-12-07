import base64

from fastapi import FastAPI, UploadFile, Form, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()


# CORSミドルウェアの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Reactアプリのオリジン
    allow_credentials=True,
    allow_methods=["*"],  # すべてのHTTPメソッドを許可
    allow_headers=["*"],  # すべてのHTTPヘッダーを許可
)

class User(BaseModel):
    name: str = Form(...)
    department: str = Form(...)



# 仮のデータストア
data_store = []


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/multi_type")
async def multi_type(user: User, file: UploadFile = File(...)):
    user_data = {"name": user.name, "department": user.department}
    file_content = await file.read()
    file_content_base64 = base64.b64encode(file_content)
    data_store.append(user_data)
    data_store.append(file_content_base64)

    return {"message": "User added successfully"}


@app.get("/data")
async def get_data():
    return data_store
