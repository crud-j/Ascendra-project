from setuptools import setup, find_packages

setup(
    name="ascendra-shared",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "pydantic>=2.9.2",
        "sqlalchemy[asyncio]>=2.0.36",
    ],
    python_requires=">=3.11",
)
