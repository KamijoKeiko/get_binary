import base64

from fastapi import FastAPI, UploadFile, Form, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# CORSミドルウェアの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
async def multi_type(name: str = Form(...), department: str = Form(...), file: UploadFile = File(...)):
    user_data = {"name": name, "department": department}
    file_content = await file.read()
    file_content_base64 = base64.b64encode(file_content)
    data_store.clear()
    data_store.append({"user_data": user_data, "file": file_content_base64})

    return {"message": "User added successfully"}


@app.post("/base64")
async def encode_base64(file_name: str = Form(...),
                        mime_type: str = Form(...),
                        file: str = Form(...)):
    # file_data = {"file_name": file_name, "file_type": mime_type}
    data_store.clear()
    data_store.append(file)

    return {"message": "base64 added successfully"}


@app.get("/data")
async def get_data():
    return data_store
