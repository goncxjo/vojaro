using Microsoft.EntityFrameworkCore.Migrations;

namespace vojaro.api.Migrations
{
    public partial class FixDeptoFK : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_carreras_departamentos_DepartamentosId",
                table: "carreras");

            migrationBuilder.RenameColumn(
                name: "DepartamentosId",
                table: "carreras",
                newName: "DepartamentoId");

            migrationBuilder.RenameIndex(
                name: "IX_carreras_DepartamentosId",
                table: "carreras",
                newName: "IX_carreras_DepartamentoId");

            migrationBuilder.AddForeignKey(
                name: "FK_carreras_departamentos_DepartamentoId",
                table: "carreras",
                column: "DepartamentoId",
                principalTable: "departamentos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_carreras_departamentos_DepartamentoId",
                table: "carreras");

            migrationBuilder.RenameColumn(
                name: "DepartamentoId",
                table: "carreras",
                newName: "DepartamentosId");

            migrationBuilder.RenameIndex(
                name: "IX_carreras_DepartamentoId",
                table: "carreras",
                newName: "IX_carreras_DepartamentosId");

            migrationBuilder.AddForeignKey(
                name: "FK_carreras_departamentos_DepartamentosId",
                table: "carreras",
                column: "DepartamentosId",
                principalTable: "departamentos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
