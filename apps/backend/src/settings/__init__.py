__all__ = [
    "settings",
    "AppSettings",
    "ApiSettings",
    "PostgresSettings",
    "SecuritySettings",
    "CORSSettings",
    "SecuritySettings",
    "SwaggerSettings",
]

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic_settings_logging import LoggingSettings

from src.settings.api import ApiSettings
from src.settings.app import AppSettings
from src.settings.cors import CORSSettings
from src.settings.postgres import PostgresSettings
from src.settings.security import SecuritySettings
from src.settings.swagger import SwaggerSettings


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        str_strip_whitespace=True,
        ignored_types=(LoggingSettings,),
        env_nested_delimiter="_",
        env_nested_max_split=1,
        env_prefix="BACKEND_",
        extra="ignore",
    )

    app: AppSettings = Field(init=False)
    api: ApiSettings = Field(init=False)
    cors: CORSSettings = Field(init=False)
    postgres: PostgresSettings = Field(init=False)
    postgres_test: PostgresSettings = Field(init=False)
    security: SecuritySettings = Field(init=False)
    swagger: SwaggerSettings = Field(init=False)

    logging = LoggingSettings()


settings = Settings()
