from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


# CORSミドルウェアの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Reactアプリのオリジン
    allow_credentials=True,
    allow_methods=["*"],  # すべてのHTTPメソッドを許可
    allow_headers=["*"],  # すべてのHTTPヘッダーを許可
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello")
async def say_hello():
    return {"message": "Hello"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}
