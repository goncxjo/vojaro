#!flask/bin/python
import os
import base64
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash

from app import db
from app.models import Entity


class Usuario(db.Model, Entity):
    __tablename__ = 'Usuarios'

    nombre_usuario = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    token = db.Column(db.String(32), index=True, unique=True)
    token_expiration = db.Column(db.DateTime)

    def __init__(self, codigo, nombre, creado_por):
        Entity.__init__(self, creado_por)
        self.codigo = codigo
        self.nombre = nombre

    def __repr__(self):
        return '<Usuario {}>'.format(self.nombre_usuario)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def get_token(self, expires_in=3600):
        now = datetime.utcnow()
        if self.token and self.token_expiration > now + timedelta(seconds=60):
            return self.token

        # generate token if doesn't exists
        self.token = base64.b64encode(os.urandom(24)).decode('utf-8')
        self.token_expiration = now + timedelta(seconds=expires_in)
        # save
        db.session.add(self)
        # return generated token
        return self.token

    def revoke_token(self):
        self.token_expiration = datetime.utcnow() - timedelta(seconds=1)

    @staticmethod
    def check_token(token):
        user = Usuario.query.filter_by(token=token).first()
        if user is None or user.token_expiration < datetime.utcnow():
            return None
        return user