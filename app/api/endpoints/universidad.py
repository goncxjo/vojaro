#!flask/bin/python
import json

from flask import request
from flask_restx import Resource, abort
from sqlalchemy.orm.exc import NoResultFound

from app.api import api
from app.api.auth import token_auth
from app.api.serializers import universidad_model, universidad_paginated_model
from app.api.repositories import save_changes
from app.api.services.universidad import UniversidadService

ns = api.namespace('universidades', description='Operaciones relacionadas a universidades')
service = UniversidadService()


class SecureResource(Resource):
    method_decorators = [token_auth.verify_token]


@ns.route('/')
class UniversidadCollection(SecureResource):

    @api.marshal_list_with(universidad_paginated_model)
    def get(self):
        """
        Devuelve una lista paginada de universidades
        """
        page = request.args.get('page', type=int)
        per_page = request.args.get('perPage', type=int)
        encoded_filters = request.args.get('filters')
        filters = json.loads(encoded_filters)

        return service.get_paginated(page=page, per_page=per_page,filters=filters)

    @api.expect(universidad_model)
    @api.marshal_with(universidad_model)
    @api.response(201, 'Universidad creada.')
    def post(self):
        """
        Crea una nueva universidad
        """
        data = request.json
        universidad = service.add(data)
        save_changes()
        return universidad, 201


@ns.route('/<int:id>')
class UniversidadItem(SecureResource):

    @api.marshal_with(universidad_model)
    def get(self, id):
        """
        Devuelve una universidad en base a su ID
        """
        try:
            universidades = service.get(id)
            return universidades
        except NoResultFound:
            abort(404, 'No existe una universidad con ese identificador')

    @api.expect(universidad_model)
    @api.response(204, 'Universidad actualizada.')
    def put(self, id):
        """
        Actualiza una universidad
        """
        try:
            data = request.json
            universidad = service.update(id, data)
            save_changes()
            return universidad, 204
        except NoResultFound:
            abort(404, 'No existe una universidad con ese identificador')

    @api.response(204, 'Universidad borrada.')
    def delete(self, id):
        """
        Borra una universidad
        """
        try:
            service.delete(id)
            save_changes()
            return None, 204
        except NoResultFound:
            abort(404, 'No existe una universidad con ese identificador')
